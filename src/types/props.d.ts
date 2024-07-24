interface VideoPlaybackProps {
  params: VideoPlayerProps;
}

interface VideoPlayerProps {
  filename: string;
}

interface VideoOptionsProps {
  videoUrl: string;
  filename: string;
  handleDelete: () => Promise<
    | {
        id: string;
        dismiss: () => void;
        update: (props: ToasterToast) => void;
      }
    | undefined
  >;
  isDeleting: boolean;
}
