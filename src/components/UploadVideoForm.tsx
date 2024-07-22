"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File as FileIcon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { generateSignedUrl } from "../lib/actions/gcp.actions";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import LoadingUI from "./LoadingUI";
import { useToast } from "./ui/use-toast";

const UploadVideoForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const router = useRouter();
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

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const showErrorToast = (title: string, description: string) => {
    return toast({
      variant: "destructive",
      title: title,
      description: description,
    });
  };

  const uploadVideo = async () => {
    if (!file) {
      showErrorToast("No file selected", "Please select a file to upload it.");
      return;
    }

    try {
      setFileUploading(true);

      const { url } = await generateSignedUrl(
        session.user!.email!,
        file.name,
        file.type
      );

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (response.ok) {
        setFileUploading(false);
        router.push("/uploads");
      } else {
        setFileUploading(false);
        showErrorToast(
          "Error uploading video",
          "Something went wrong while uploading video. Please try again."
        );
      }
    } catch (error) {
      setFileUploading(false);
      showErrorToast(
        "Error uploading video",
        "Something went wrong while uploading video. Please try again."
      );
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            Drag and drop a file or click to browse
          </span>
          <span className="text-xs text-gray-500">Video</span>
        </div>
        <div className="space-y-2 text-sm">
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="px-8" onClick={uploadVideo} disabled={fileUploading}>
          {fileUploading ? "Uploading" : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadVideoForm;
