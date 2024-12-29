"use client";

import { NameInput } from "@/features/user/components/NameInput";
import { UserInfo } from "@/features/user/types";

export const Popup = (props: { data: UserInfo; closePopup: () => void }) => {
  return (
    <>
      <div
        onClick={() => props.closePopup()}
        className="fixed left-0 top-0 h-full w-full bg-background-black opacity-30"
      ></div>
      <div className="fixed left-1/2 top-1/3 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-10">
        <NameInput name={props.data.name} closePopup={props.closePopup} />
      </div>
    </>
  );
};
