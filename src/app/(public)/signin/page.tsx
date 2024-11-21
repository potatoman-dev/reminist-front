"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormError } from "@/components/Form/FormError";
import { FormInput } from "@/components/Form/FormInput";
import { FormLoading } from "@/components/Form/FormLoading";
import { FormSubmitButton } from "@/components/Form/FormSubmitButton";
import { signIn } from "@/lib/auth/api";
import { SignInParams } from "@/lib/auth/types";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (data: SignInParams) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pt-10 md:px-8 md:pt-16">
      <h1 className="mb-6 text-center text-xl md:text-2xl">ログイン</h1>

      <form
        className="mx-auto mt-6 flex w-96 max-w-full flex-col items-center px-3 md:mt-10 md:px-0"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="flex w-full flex-col gap-3">
          <FormInput label="メールアドレス" errors={errors.email}>
            <input
              type="email"
              placeholder="reminist@example.com"
              {...register("email", {
                required: "メールアドレスを入力してください。",
              })}
            />
          </FormInput>
          <FormInput label="パスワード" errors={errors.password}>
            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: "パスワードを入力してください。",
              })}
            />
          </FormInput>
        </div>
        {errorMessage && (
          <div className="mt-5">
            <FormError errorMessage={errorMessage} />
          </div>
        )}
        <div className="mt-5">
          {loading ? (
            <FormLoading text="ログイン中" />
          ) : (
            <FormSubmitButton text="ログイン" />
          )}
        </div>
      </form>
      <div className="mt-4 text-center">
        <Link
          className="text-sm text-secondary underline underline-offset-2 md:text-base"
          href="/signup"
        >
          新規登録はこちら
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
