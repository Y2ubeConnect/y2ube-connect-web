"use client";

import { Button } from "./ui/button";
import { Download, Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LoadingUI from "./LoadingUI";
import { useState } from "react";
import { generateSignedUrlForDelete } from "../lib/actions/gcp.actions";

const UploadedVideo = ({
  video,
  onDelete,
}: {
  video: { filename: string; signedUrl: string };
  onDelete: (filename: string) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  if (status === "loading") {
    return <LoadingUI />;
  }

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { url } = await generateSignedUrlForDelete(
        session.user!.email!,
        video.filename
      );

      const deleteResponse = await fetch(url, {
        method: "DELETE",
      });
      if (!deleteResponse.ok) {
        setIsDeleting(false);
        return toast({
          variant: "destructive",
          title: "Error deleting the video",
          description:
            "Something went wrong while deleting the video. Please try again later.",
        });
      }

      setIsDeleting(false);
      onDelete(video.filename);
    } catch (err) {
      setIsDeleting(false);
      return toast({
        variant: "destructive",
        title: "Error deleting the video",
        description:
          "Something went wrong while deleting the video. Please try again later.",
      });
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-3 mb-3 shadow-md">
      <div>
        <div className="font-semibold">{video.filename}</div>
      </div>
      <div className="flex mt-2">
        <a href={video.signedUrl} download={video.filename} target="_blank">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </a>
        <Button
          variant="outline"
          className="ml-4"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UploadedVideo;
