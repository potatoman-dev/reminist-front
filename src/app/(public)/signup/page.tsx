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
import { signUp } from "@/features/user/api/signUp";
import { SignUpParams } from "@/features/user/types";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpParams>();
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
      <form
        className="mx-auto mt-6 flex w-96 max-w-full flex-col items-center px-3 md:mt-10 md:px-0"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div className="flex w-full flex-col gap-3">
          <FormInput label="ニックネーム" errors={errors.name}>
            <input
              type="text"
              placeholder="レミニスト"
              {...register("name", {
                required: "ニックネームを入力してください。",
              })}
            />
          </FormInput>

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
              placeholder="********（8文字以上）"
              {...register("password", {
                required: "パスワードを入力してください。",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください。",
                },
              })}
            />
          </FormInput>

          <FormInput
            label="パスワード（確認）"
            errors={errors.passwordConfirmation}
          >
            <input
              type="password"
              placeholder="********（8文字以上）"
              {...register("passwordConfirmation", {
                required: "パスワード（確認）を入力してください。",
                minLength: {
                  value: 8,
                  message: "パスワード（確認）は8文字以上で入力してください。",
                },
                validate: (value) =>
                  value === getValues("password") ||
                  "パスワードが一致しません。",
              })}
            />
          </FormInput>

          <div className="flex flex-col items-center">
            <label className="w-fit cursor-pointer text-sm">
              <input
                className="mr-2"
                type="checkbox"
                {...register("agreement", { required: "必須項目です。" })}
              />
              <Link
                className="text-primary underline"
                href="/terms-of-use"
                target="_blank"
              >
                利用規約
              </Link>
              <span>に同意する</span>
            </label>
            {errors.agreement && (
              <p className="my-1 text-xs text-text-error opacity-80">
                {errors.agreement.message}
              </p>
            )}
          </div>
        </div>
        {errorMessage && (
          <div className="mt-5 [&>*]:whitespace-pre-wrap">
            <FormError errorMessage={errorMessage} />
          </div>
        )}
        <div className="mt-7">
          {loading && <FormLoading text="新規登録中" />}
          {!loading && <FormSubmitButton text="新規登録" />}
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
