"use client";

import { useState } from "react";

import { Profile } from "./Profile";

export const ProfileModal = (props: { name: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleModalOpen}
        className="min-w-20 cursor-pointer rounded-md border p-2 text-center text-sm text-text-gray-dark transition-colors hover:bg-background-gray-light"
      >
        <span className="inline-block truncate md:max-w-32 lg:max-w-48">
          {props.name}
        </span>
      </button>
      {isModalOpen ? (
        <>
          <div className="-bottom-22 absolute right-24 z-20 rounded-md border-[1px] border-background-gray-dark bg-white px-2 py-2 shadow-sm [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:rounded-md [&>*]:px-8 [&>*]:py-1.5 [&>*]:transition-colors">
            <Profile handleModalClose={handleModalClose} />
          </div>
          <div
            onClick={handleModalClose}
            className="bg-transparent fixed left-0 top-0 z-10 h-screen w-full"
          ></div>
        </>
      ) : null}
    </>
  );
};
