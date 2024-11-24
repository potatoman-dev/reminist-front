"use client";

import { useRouter } from "next/navigation";

import { signOut } from "@/features/user/api/signOut";

export const SignOut = () => {
  const route = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      route.push("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
