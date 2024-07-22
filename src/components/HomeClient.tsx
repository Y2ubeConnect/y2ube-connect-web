"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import LoadingUI from "./LoadingUI";
import Image from "next/image";
import { Button } from "./ui/button";

const HomeClient = () => {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  if (status === "loading") {
    return <LoadingUI />;
  }

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
