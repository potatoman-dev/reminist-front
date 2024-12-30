"use client";

import Image from "next/image";
import Link from "next/link";

import { PersonType } from "@/features/person/types";

export const PersonCard = (props: { person: PersonType }) => {
  return (
    <li className="relative">
      <Link
        href={`/people/${props.person.id}`}
        className="block rounded-2xl border border-border-white bg-white px-6 py-4 shadow shadow-shadow transition-shadow hover:shadow-md md:rounded-3xl md:py-6"
      >
        <div className="flex justify-center">
          <Image
            className="h-auto w-2/3 max-w-24"
            src={`/image/people/${props.person.imageUrl}.png`}
            alt={props.person.name}
            width={80}
            height={80}
          />
        </div>
        <p className="mt-4 text-center">{props.person.name}</p>
      </Link>
    </li>
  );
};
