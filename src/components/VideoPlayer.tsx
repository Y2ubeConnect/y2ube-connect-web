"use client";

import { useEffect, useState } from "react";
import {
  generateSignedUrlForDelete,
  generateSignedUrlForRead,
} from "../lib/actions/gcp.actions";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import ReactPlayer from "react-player";
import VideoOptions from "./VideoOptions";
import { useRouter } from "next/navigation";

const VideoPlayer = ({ filename }: VideoPlayerProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session } = useSession();

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const { url } = await generateSignedUrlForRead(
          session!.user!.email!,
          decodeURIComponent(filename)
        );
        setVideoUrl(url);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error fetching the URL",
          description:
            "Something went wrong while fetching the video URL. Please try again.",
        });
      }
    };

    fetchVideoUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename]);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { url } = await generateSignedUrlForDelete(
        session!.user!.email!,
        decodeURIComponent(filename)
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
      router.push("/uploads");
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
      return toast({
        variant: "destructive",
        title: "Error deleting the video",
        description:
          "Something went wrong while deleting the video. Please try again later.",
      });
    }
  };

  const handleError = () => {
    toast({
      variant: "destructive",
      title: "Error playing the video",
      description:
        "Either the video has been deleted from the server or the video codec is not supported by your browser.",
    });
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[640px] rounded-lg shadow-lg overflow-hidden bg-gray-900 border">
        <ReactPlayer
          url={videoUrl}
          playing
          controls
          light={true}
          width="100%"
          onError={handleError}
        />
      </div>
      <div className="mt-3">
        <div className="text-lg">
          <span className="font-semibold">Filename:</span>{" "}
          <span className="italic">{decodeURIComponent(filename)}</span>
        </div>
        <div className="flex justify-center mt-3">
          <VideoOptions
            filename={filename}
            videoUrl={videoUrl}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
