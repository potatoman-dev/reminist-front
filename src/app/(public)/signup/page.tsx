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
import { signUp } from "@/lib/auth/api";
import { SignUpParams } from "@/lib/auth/types";

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpParams>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (data: SignUpParams) => {
    try {
      setLoading(true);
      await signUp(data);
      router.push("/signin");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setErrorMessage(
          e.response?.data.errors[0] ||
            "新規登録に失敗しました。\n入力内容を確認し、再度お試しください。"
        );
      } else if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(
          "新規登録に失敗しました。\n入力内容を確認し、再度お試しください。"
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pt-10 md:px-8 md:pt-16">
      <h1 className="mb-6 text-center text-xl md:text-2xl">新規登録</h1>
      <p className="text-center text-sm text-secondary">
        登録完了後、ログイン画面へ遷移します。
      </p>
      {errorMessage && (
        <div className="mt-4 [&>*]:whitespace-pre-wrap">
          <FormError errorMessage={errorMessage} />
        </div>
      )}
      <form
        className="mx-auto mt-6 flex w-96 max-w-full flex-col items-center px-3 md:mt-10 md:px-0"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="flex w-full flex-col gap-3">
          <FormInput label="ニックネーム">
            <input
              type="text"
              placeholder="レミニスト"
              {...register("name", { required: true })}
            />
          </FormInput>
          <FormInput label="メールアドレス">
            <input
              type="email"
              placeholder="reminist@example.com"
              {...register("email", { required: true })}
            />
          </FormInput>
          <FormInput label="パスワード">
            <input
              type="password"
              placeholder="********"
              {...register("password", { required: true })}
            />
          </FormInput>
          <FormInput label="パスワード（確認）">
            <input
              type="password"
              placeholder="********"
              {...register("passwordConfirmation", { required: true })}
            />
          </FormInput>
        </div>
        <div className="mt-10">
          {loading ? (
            <FormLoading text="新規登録中" />
          ) : (
            <FormSubmitButton text="新規登録" />
          )}
        </div>
      </form>
      <div className="mt-4 text-center">
        <Link
          className="text-sm text-secondary underline underline-offset-2 md:text-base"
          href="/signin"
        >
          すでに登録済みの方はこちら
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
