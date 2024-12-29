"use client";

import { useState } from "react";

import { updateUserName } from "@/features/user/api/updateUserName";
import refetchForServer from "@/libs/api/refetchForServer";

export const NameInput = (props: { name: string; closePopup: () => void }) => {
  const [name, setName] = useState(props.name);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateUserName({ name });
      refetchForServer("/mypage");
      props.closePopup();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      <form>
        <dt className="mb-1 block">名前</dt>
        <dd className="block">
          <input
            className="rounded-md border border-background-gray-dark bg-background-gray-normal px-3 py-2"
            onChange={updateName}
            value={name}
          />
        </dd>
        <div className="mt-3 flex justify-center">
          <button
            type="submit"
            onClick={submit}
            className="rounded bg-primary px-10 py-2 text-white"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
};
