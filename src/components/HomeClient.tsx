"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import useChannelList from "../hooks/useChannelList";

const HomeClient = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const channels = useChannelList(session!.accessToken);
  console.log(channels);

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div>
        <Image
          className="rounded-full"
          src={session!.user!.image!}
          alt="display picture"
          width={125}
          height={125}
        />
      </div>
      <div className="mt-6 mb-6 text-2xl text-gray-900 font-semibold">
        Welcome, {session!.user!.name!}!
      </div>
      <div className="mb-6 text-gray-600">
        We are excited to have you here at Y2ubeConnect.
      </div>
      <div>
        <Button onClick={() => router.push("/uploads")}>My Uploads</Button>
      </div>
    </div>
  );
};

export default HomeClient;
