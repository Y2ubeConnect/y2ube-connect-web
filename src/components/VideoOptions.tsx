"use client";

import { Download, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const VideoOptions = ({
  filename,
  videoUrl,
  handleDelete,
  isDeleting,
}: VideoOptionsProps) => {
  return (
    <>
      <a href={videoUrl} download={filename} target="_blank">
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
    </>
  );
};

export default VideoOptions;
