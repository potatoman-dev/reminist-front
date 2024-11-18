"use client";

import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { userAtom } from "@/atoms/userAtom";
import { signIn } from "@/lib/auth/api";
import { SignInParams } from "@/lib/auth/types";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInParams>();
  const router = useRouter();

  const setUser = useSetAtom(userAtom);

  const handleSignIn = async (data: SignInParams) => {
    try {
      const res = await signIn(data);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setUser(res.data.data);
        router.push("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Signin Page</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(handleSignIn)}>
        <label>
          Email:
          <input className="text-black" type="email" {...register("email")} />
        </label>
        <label>
          Password:
          <input
            className="text-black"
            type="password"
            {...register("password")}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
