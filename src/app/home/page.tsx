"use client";

import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { userAtom } from "@/atoms/userAtom";
import { useAuth } from "@/hooks/useAuth";


const HomePage = () => {
  const { handleGetCurrentUser } = useAuth();
  const user = useAtomValue(userAtom);

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  if (!user) {
    return <p>loading...</p>;
  }

  return <div>{user && <h1>Home Page</h1>}</div>;
};

export default HomePage;
