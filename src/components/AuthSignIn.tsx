"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import LoadingUI from "./LoadingUI";
import Image from "next/image";
import { Button } from "./ui/button";
import { Router } from "lucide-react";

const AuthSignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingUI />;
  }

  if (session?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div>
        <Image
          className="rounded-full"
          src="/logos/svg/logo-black.svg"
          alt="display picture"
          width={200}
          height={200}
        />
      </div>
      <div className="mt-6 mb-6 text-2xl text-gray-900 font-semibold">
        Welcome, to Y2ubeConnect!
      </div>
      <div className="mb-6 text-gray-600">
        You need to authenticate using your Google account to avail our
        services.
      </div>
      <div>
        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AuthSignIn;
