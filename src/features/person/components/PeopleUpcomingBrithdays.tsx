"use client";

import Link from "next/link";

import { PersonType } from "@/features/person/types";

export const PeopleUpcomingBrithdays = (props: { people: PersonType[] }) => {
  const today = new Date();

  return (
    <div className="flex flex-col rounded-2xl bg-primary px-6 py-4 text-white shadow md:rounded-3xl md:px-9 md:py-7">
      <h2 className="mb-2 text-base font-bold md:mb-4 md:text-lg">
        近日誕生日のヒトビト
      </h2>
      <div className="w-full">
        <ul className="flex flex-col gap-1 md:gap-2">
          {props.people.length > 0 ? (
            props.people.map((person) => (
              <li key={person.id} className="flex text-sm md:text-base">
                <p className="mr-6 w-20">
                  {person.birthMonth}月{person.birthDay}日
                </p>
                <Link href={`/people/${person.id}`} className="underline">
                  <p className="truncate">{person.name}</p>
                </Link>
                {person.birthMonth === today.getMonth() + 1 &&
                  person.birthDay === today.getDate() && (
                    <p className="ml-2 flex-shrink-0">🎉</p>
                  )}
              </li>
            ))
          ) : (
            <p className="text-sm text-white">近日誕生日のヒトはいません</p>
          )}
        </ul>
      </div>
    </div>
  );
};
