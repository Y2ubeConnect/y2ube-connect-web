"use client";

import { PropsWithChildren, useContext } from "react";
import LoadingUI from "./LoadingUI";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RequireAuthWrapper = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/sign-in");
      return;
    },
  });

  if (status === "loading") {
    return <LoadingUI />;
  }

  return <>{children}</>;
};

export default RequireAuthWrapper;
