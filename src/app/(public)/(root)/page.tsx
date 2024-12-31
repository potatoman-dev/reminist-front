"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mt-20 text-center text-4xl font-bold">
        案内画面を作成予定
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/signin"
          className="rounded-full border border-border-white bg-white px-8 py-4 text-xl shadow shadow-shadow"
        >
          ログインはこちら
        </Link>
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/signup"
          className="rounded-full border border-border-white bg-black px-8 py-4 text-xl text-white shadow shadow-shadow"
        >
          新規登録はこちら
        </Link>
      </div>
    </>
  );
}
