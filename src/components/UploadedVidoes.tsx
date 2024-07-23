"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingUI from "./LoadingUI";
import { getUploadedVideos } from "../lib/actions/gcp.actions";
import { useToast } from "./ui/use-toast";
import UploadedVideo from "./UploadedVideo";

const UploadedVideos = () => {
  const { data: session } = useSession();

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
      setLoading(true);

      try {
        const { uploadedVideos } = await getUploadedVideos(
          session!.user!.email!
        );
        setVideos(uploadedVideos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading videos",
          description:
            "Something went wrong while loading the uploaded videos.",
        });
      }
    };

    fetchUploadedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingUI />;

  const handleOnDelete = (filename: string) => {
    setVideos((prev) => prev.filter((v) => v.filename !== filename));
  };

  return (
    <div className="mt-6">
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <UploadedVideo video={video} onDelete={handleOnDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedVideos;
