import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Download, Trash2 } from "lucide-react";

const UploadedVideo = ({
  video,
}: {
  video: { filename: string; signedUrl: string };
}) => {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>{video.filename}</CardTitle>
      </CardHeader>
      <CardFooter className="p-4 flex">
        <Button variant="outline" size="icon">
          <Download className="h-5 w-5" />
        </Button>
        <Button variant="destructive" className="ml-4" size="icon">
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadedVideo;
