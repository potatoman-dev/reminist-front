import { useEffect, useState } from "react";

import { getCurrentUser, signOut } from "@/lib/auth/api";
import { User } from "@/types/user";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log("Current User Response:", res);

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsSignedIn(false);
      setCurrentUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return { loading, isSignedIn, currentUser, handleSignOut, handleGetCurrentUser };
};
