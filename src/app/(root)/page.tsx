"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getCurrentUser, signOut } from "@/lib/auth/api";
import { User } from "@/types/user";

import { HomeSample } from "./_components/homeSample";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsSignedIn(false);
      setCurrentUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      <HomeSample />
      {!loading && isSignedIn && currentUser ? (
        <div>
          <h1>Hello, {currentUser.name} san.</h1>
          <p>your email is: {currentUser.email}</p>
        </div>
      ) : (
        <div>
          <h1>Login please</h1>
        </div>
      )}
      <Link className="bg-blue-600" href="/signin">
        SignIn
      </Link>
      <Link className="bg-blue-600" href="/signup">
        SignUp
      </Link>
      <button onClick={handleSignOut}>SignOut</button>
    </div>
  );
}
