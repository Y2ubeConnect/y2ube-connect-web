"use client";

import { useEffect, useState } from "react";
import { fetchYoutubeChannels } from "../lib/actions/youtube.actions";

const useChannelList = (accessToken: string) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const updateChannels = async () => {
      await fetchYoutubeChannels(accessToken);
    };
    updateChannels();
  }, [accessToken]);

  return channels;
};

export default useChannelList;
