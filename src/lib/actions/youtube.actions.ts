"use server";

import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

export const fetchYoutubeChannels = async (accessToken: string) => {
  const auth = new OAuth2Client();
  auth.setCredentials({ access_token: accessToken });

  const people = google.people({
    version: "v1",
    auth: auth,
  });

  try {
    const response = await people.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses",
    });
    const emailAddresses = response.data.emailAddresses || [];
    const primaryEmailObj = emailAddresses.find(
      (email) => email.metadata.primary
    );
    const accountType = primaryEmailObj
      ? primaryEmailObj.metadata.source.type
      : null;
    // console.log(emailAddresses);
  } catch (error) {
    console.log(error);
  }

  // const youtube = google.youtube({
  //   version: "v3",
  //   auth: auth,
  //   key: process.env.YOUTUBE_DATA_API_KEY!,
  // });

  // try {
  //   const response = await youtube.channels.list({
  //     part: ["snippet", "brandingSettings"],
  //     mine: true,
  //   });

  //   const channels = response.data.items;
  //   console.log(channels[0].brandingSettings);
  // } catch (error) {
  //   console.log(error);
  // }
};
