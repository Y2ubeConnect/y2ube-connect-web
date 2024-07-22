import Link from "next/link";
import UploadedVideos from "../../../components/UploadedVidoes";

export default function Uploads() {
  return (
    <div className="w-full flex-grow flex justify-center py-10 px-6">
      <div className="w-full max-w-[500px] flex flex-col">
        <div className="w-full">
          <div className="font-semibold text-lg">My Uploads</div>
          <div>
            <Link
              href="/uploads/upload"
              className="text-sm hover:underline hover:text-blue-600"
            >
              Upload a new video
            </Link>
          </div>
        </div>
        <div className="w-full flex-grow flex flex-col">
          <UploadedVideos />
        </div>
      </div>
    </div>
  );
}
