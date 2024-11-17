"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { signUp } from "@/lib/auth/api";
import { SignUpParams } from "@/lib/auth/types";

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpParams>();
  const router = useRouter();

  const handleSignUp = async (data: SignUpParams) => {
    try {
      await signUp(data);
      router.push("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>SignUp Page</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(handleSignUp)}>
        <label>
          Name:
          <input className="text-black" type="text" {...register("name")} />
        </label>
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
        <label>
          Password Confirmation:
          <input
            className="text-black"
            type="password"
            {...register("passwordConfirmation")}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
