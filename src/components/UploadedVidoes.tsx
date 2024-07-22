"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingUI from "./LoadingUI";
import { getUploadedVideos } from "../lib/actions/gcp.actions";
import { useToast } from "./ui/use-toast";
import UploadedVideo from "./UploadedVideo";

const UploadedVideos = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  const { toast } = useToast();

  const [videos, setVideos] = useState<
    {
      filename: string;
      signedUrl: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUploadedVideos = async () => {
      if (status === "loading") {
        return;
      }

      setLoading(true);

      try {
        const { uploadedVideos } = await getUploadedVideos(
          session.user!.email!
        );
        setVideos(uploadedVideos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Error loading videos",
          description:
            "Something went wrong while loading the uploaded videos.",
        });
      }
    };

    fetchUploadedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <LoadingUI />;
  }

  if (loading) return <LoadingUI />;

  return (
    <div className="mt-6">
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <UploadedVideo video={video} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedVideos;
