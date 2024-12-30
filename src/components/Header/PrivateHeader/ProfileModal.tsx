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
        className="cursor-pointer rounded-full bg-black px-5 py-1.5 text-white md:max-w-32 lg:max-w-48"
      >
        <span className="inline-block truncate">{props.name}</span>
      </button>
      {isModalOpen ? (
        <>
          <div className="absolute -bottom-28 right-24 z-20 rounded-3xl border-[1px] border-background-gray-dark bg-off-white px-3 py-3 shadow-lg shadow-shadow [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:rounded-2xl [&>*]:px-12 [&>*]:py-3 [&>*]:transition-colors">
            <Profile handleModalClose={handleModalClose} />
          </div>
          <div
            onClick={handleModalClose}
            className="fixed left-0 top-0 z-10 h-screen w-full bg-transparent"
          ></div>
        </>
      ) : null}
    </>
  );
};
