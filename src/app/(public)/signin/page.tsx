"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signIn } from "@/lib/auth/api";
import { SignInParams } from "@/lib/auth/types";

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInParams>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (data: SignInParams) => {
    try {
      await signIn(data);

      router.push("/home");
      router.refresh();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setErrorMessage(
          e.response?.data.errors[0] ||
            "エラーが発生しました、再度お試しください。"
        );
      } else if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage("エラーが発生しました、再度お試しください。");
      }
    }
  };

  return (
    <div>
      <h1>Signin Page</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form className="flex flex-col" onSubmit={handleSubmit(handleSignIn)}>
        <label>
          Email:
          <input
            className="text-black"
            type="email"
            {...register("email", { required: true })}
          />
        </label>
        <label>
          Password:
          <input
            className="text-black"
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
