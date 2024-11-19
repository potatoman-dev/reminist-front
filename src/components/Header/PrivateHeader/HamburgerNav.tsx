"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { Links } from "./Links";
import { Profile } from "./Profile";

export const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`${isOpen ? "opacity-10" : "pointer-events-none opacity-0"} fixed left-0 top-0 z-10 h-lvh w-full bg-background-tertiary transition-opacity duration-200 ease-out`}
      ></div>

      <button onClick={handleOpen} className="ml-auto h-6 w-6 md:hidden">
        <FiMenu className="h-full w-full text-text-secondary" />
      </button>

      <div
        className={`${isOpen ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-20 h-full max-h-dvh w-2/3 max-w-80 bg-surface px-4 pb-6 pt-3 transition-transform duration-200 ease-out md:hidden`}
      >
        <div className="flex h-full flex-col">
          <button onClick={handleClose} className="ml-auto h-6 w-6">
            <FiX className="h-full w-full text-text-secondary" />
          </button>

          <ul className="mt-10 flex flex-col gap-5 pl-5">
            <Links />
          </ul>
          <div className="mt-5 flex flex-col gap-5 border-t-[1px] border-border pl-5 pt-5 [&>*]:flex [&>*]:items-center [&>*]:gap-1 [&>*]:rounded-md [&>*]:transition-colors">
            <Profile />
          </div>
          <div className="mt-auto flex flex-col items-end gap-2 [&_a]:w-fit [&_a]:text-sm [&_a]:text-secondary">
            <Link href="/terms-of-use">利用規約</Link>
            <Link href="/privacy-policy">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </>
  );
};
