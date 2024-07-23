"use client";

import { PropsWithChildren } from "react";
import LoadingUI from "./LoadingUI";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const RequireAuthWrapper = ({ children }: PropsWithChildren<{}>) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  if (status === "loading") {
    return <LoadingUI />;
  }

  return <>{children}</>;
};

export default RequireAuthWrapper;
