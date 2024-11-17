"use client";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

import { HomeSample } from "./_components/homeSample";

export default function Home() {
  const { loading, isSignedIn, currentUser, handleSignOut } = useAuth();

  return (
    <div className="">
      <HomeSample />
      {loading ? (
        <p>loading...</p>
      ) : isSignedIn && currentUser ? (
        <div>
          <h1>Hello, {currentUser?.name} san.</h1>
          <p>your email is: {currentUser?.email}</p>
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
