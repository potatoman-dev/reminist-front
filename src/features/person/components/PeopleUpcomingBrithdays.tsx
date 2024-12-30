"use client";

import Link from "next/link";

import { PersonType } from "@/features/person/types";

export const PeopleUpcomingBrithdays = (props: { people: PersonType[] }) => {
  const today = new Date();

  return (
    <div className="flex flex-col rounded-3xl bg-primary px-9 py-7 text-white shadow">
      <h2 className="mb-4 text-lg font-bold">近日誕生日のヒトビト</h2>
      <div className="w-full">
        <ul className="flex flex-col gap-2">
          {props.people.length > 0 ? (
            props.people.map((person) => (
              <li key={person.id} className="flex">
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
            <p className="text-sm text-text-gray-dark">
              近日誕生日のヒトはいません
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};
