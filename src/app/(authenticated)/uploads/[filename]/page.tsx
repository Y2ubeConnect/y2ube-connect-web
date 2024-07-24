import VideoPlayer from "../../../../components/VideoPlayer";

export default async function VideoPlayback({ params }: VideoPlaybackProps) {
  const { filename } = params;

  return <VideoPlayer filename={filename} />;
}
