"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const { loading, isSignedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isSignedIn) {
        router.push("/signin");
      }
    }
  }, [loading, isSignedIn]);

  if (loading) {
    return <p>loading...</p>;
  }

  return <div>{isSignedIn && <h1>Home Page</h1>}</div>;
};

export default HomePage;
