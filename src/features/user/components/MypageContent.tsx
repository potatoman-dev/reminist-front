"use client";

import { useState } from "react";

import { updateUserName } from "@/features/user/api/updateUserName";
import { UserInfo } from "@/features/user/types";
import refetchForServer from "@/libs/api/refetchForServer";

export const MypageContent = (props: { data: UserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.data.name);

  const toggleEditName = () => {
    setIsEditing(!isEditing);
  };

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateUserName({ name });
      refetchForServer("/mypage");
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-border-white bg-white px-16 py-11 shadow shadow-shadow">
        <dl className="">
          <div>
            <div className="flex justify-between">
              <dt className="font-bold text-primary">名前</dt>
              <button
                type="button"
                className="rounded-full bg-primary px-3 py-1 text-sm text-white"
                onClick={toggleEditName}
              >
                編集
              </button>
            </div>
            {isEditing ? (
              <form className="flex items-center gap-4">
                <input
                  className="rounded-xl border border-border-input p-2"
                  onChange={updateName}
                  value={name}
                />
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-6 py-2 text-white"
                  onClick={submit}
                >
                  更新
                </button>
              </form>
            ) : (
              <dd>{props.data.name}</dd>
            )}
          </div>
          <div>
            <dt className="mt-6 font-bold text-primary">メールアドレス</dt>
            <dd>{props.data.email}</dd>
          </div>
          <div>
            <dt className="mt-6 font-bold text-primary">パスワード</dt>
            <dd>********</dd>
          </div>
        </dl>
      </div>
    </>
  );
};
