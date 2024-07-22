"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const { status } = useSession();

  if (status === "unauthenticated" || status === "loading") {
    return null;
  }

  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
