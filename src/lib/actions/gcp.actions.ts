"use server";

import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
});

const bucketName = process.env.GCP_STORAGE_BUCKET_NAME!;

const fileExists = async (fileName: string) => {
  try {
    const [exists] = await storage.bucket(bucketName).file(fileName).exists();
    return exists;
  } catch (err) {
    console.error("Error checking file existence:", err);
    throw new Error("Error checking file existence");
  }
};

const getUniqueFileName = async (fileName: string) => {
  let baseName = fileName;
  let fileExtension = "";
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex !== -1) {
    baseName = fileName.substring(0, dotIndex);
    fileExtension = fileName.substring(dotIndex);
  }

  let uniqueFileName = fileName;
  let counter = 1;

  while (await fileExists(uniqueFileName)) {
    uniqueFileName = `${baseName}(${counter})${fileExtension}`;
    counter++;
  }

  return uniqueFileName;
};

export const generateSignedUrl = async (
  userEmail: string,
  fileName: string,
  contentType: string
) => {
  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000,
    contentType: contentType,
  };

  const filePath = `${userEmail}/${fileName}`;

  try {
    const uniqueFileName = await getUniqueFileName(filePath);

    const [url] = await storage
      .bucket(bucketName)
      .file(uniqueFileName)
      .getSignedUrl(options);

    return { url };
  } catch (err) {
    console.error(err);
    throw new Error("Error generating signed URL");
  }
};

export const generateSignedUrlForRead = async (
  userEmail: string,
  fileName: string
) => {
  const filePath = `${userEmail}/${fileName}`;

  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "read",
    expires: Date.now() + 60 * 60 * 1000,
  };

  try {
    const [url] = await storage
      .bucket(bucketName)
      .file(filePath)
      .getSignedUrl(options);

    return { url };
  } catch (err) {
    console.error(err);
    throw new Error("Error generating signed URL");
  }
};

export const getUploadedVideos = async (userEmail: string) => {
  try {
    const prefix = `${userEmail}/`;

    const [files] = await storage.bucket(bucketName).getFiles({
      prefix: prefix,
    });

    const filenames = files.map((file) => file.name.substring(prefix.length));

    const uploadedVideos: {
      filename: string;
      signedUrl: string;
    }[] = [];

    filenames.forEach(async (filename) => {
      const { url } = await generateSignedUrlForRead(userEmail, filename);
      uploadedVideos.push({
        filename,
        signedUrl: url,
      });
    });

    return { uploadedVideos };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching uploaded videos.");
  }
};
