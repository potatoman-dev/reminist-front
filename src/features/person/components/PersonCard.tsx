"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import { PersonType } from "@/features/person/types";


export const PersonCard = (props: { person: PersonType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="relative">
      <button
        onClick={handleOpen}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-text-gray-light hover:text-text-gray-dark"
      >
        <FiMoreHorizontal />
      </button>
      {isOpen && (
        <div className="absolute right-4 top-10 flex flex-col gap-1 rounded-md bg-white px-2 py-2">
          <Link
            className="rounded-md px-6 py-0.5 hover:bg-background-gray-light"
            href={`/people/${props.person.id}/edit`}
          >
            編集
          </Link>
          {/* TODO 削除機能 */}
          <button className="rounded-md px-6 py-1 hover:bg-background-gray-light">
            削除
          </button>
        </div>
      )}
      <Link
        href={`/people/${props.person.id}`}
        className="block rounded-lg bg-background-gray-normal px-6 py-4 md:py-6"
      >
        <div className="flex justify-center">
          <Image
            src={`/image/people/${props.person.imageUrl}.png`}
            alt={props.person.name}
            width={80}
            height={80}
          />
        </div>
        <p className="mt-4 text-center font-medium text-text-gray-dark">
          {props.person.name}
        </p>
      </Link>
    </li>
  );
};
