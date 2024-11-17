"use client";

import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { signIn } from "@/lib/auth/api";
import { SignInParams } from "@/lib/auth/types";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInParams>();

  const handleSignIn = async (data: SignInParams) => {
    try {
      const res = await signIn(data);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
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
