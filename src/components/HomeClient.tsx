"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const HomeClient = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full">
      Signed in as {session!.user!.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default HomeClient;
