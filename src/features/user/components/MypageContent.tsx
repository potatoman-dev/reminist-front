"use client";

import { useState } from "react";

import { Popup } from "@/features/user/components/Popup";
import { UserInfo } from "@/features/user/types";

export const MypageContent = (props: { data: UserInfo }) => {
  const [showPopup, setShowPopup] = useState(false);

  const toggleEditName = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <Popup data={props.data} closePopup={closePopup} />}
      <div className="mt-6 max-w-6xl px-6 md:mx-auto md:mt-16 lg:w-1/2">
        <h1 className="mb-10 text-center text-xl">マイページ</h1>
        <dl className="flex flex-col gap-6 rounded-lg bg-background-gray-normal p-6 [&>div]:border-b [&>div]:pb-4 [&_dt]:mb-1 [&_dt]:text-sm [&_dt]:font-medium [&_dt]:text-text-gray-dark">
          <div>
            <div className="flex justify-between">
              <dt>名前</dt>
              <button
                type="button"
                className="bg-background-gray-dark px-2 py-1 text-xs text-text-gray-dark"
                onClick={toggleEditName}
              >
                編集
              </button>
            </div>
            <dd>{props.data.name}</dd>
          </div>
          <div>
            <dt>メールアドレス</dt>
            <dd>{props.data.email}</dd>
          </div>
          <div>
            <dt>パスワード</dt>
            <dd>********</dd>
          </div>
        </dl>
      </div>
    </>
  );
};
