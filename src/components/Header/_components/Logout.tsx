'use client'

import { signOut } from "@/lib/auth/api";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const route = useRouter();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      route.push('/signin');
      console.log('sign out');
  
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  )
  }