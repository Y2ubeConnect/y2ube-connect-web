"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthSignIn = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign in
      </button>
    </>
  );
};

export default AuthSignIn;
