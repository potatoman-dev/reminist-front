"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getUpcomingBirthdays } from "@/features/person/api/getUpcomingBirthdays";
import { PersonType } from "@/features/person/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";

export const PeopleUpcomingBrithdays = (props: {
  initialPeople: PersonType[];
}) => {
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<PersonType[]>(props.initialPeople);

  const today = new Date();

  useEffect(() => {
    const fetchUpcomingBirthdays = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();

      try {
        const data = await getUpcomingBirthdays(accessToken, clientToken, uid);
        setPeople(data.people);
      } catch (error) {
        console.error("Error fetching upcoming birthdays:", error);
        setError("近日誕生日の取得中にエラーが発生しました");
      }
    };

    fetchUpcomingBirthdays();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg rounded-lg bg-background-gray-normal px-8 py-5 shadow-sm">
        <h2 className="mb-2 w-fit rounded-lg bg-primary-variant px-3 py-0.5 text-sm font-bold text-white">
          近日誕生日のヒトビト
        </h2>
        {error ? (
          <p className="text-sm text-text-gray-dark">{error}</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {people.length > 0 ? (
              people.map((person) => (
                <li key={person.id} className="text-sm text-text-gray-dark">
                  <Link
                    href={`/people/${person.id}`}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <p className="w-20 flex-shrink-0">
                      {person.birthMonth}月{person.birthDay}日
                    </p>
                    <p className="truncate">{person.name}</p>
                    {person.birthMonth === today.getMonth() + 1 &&
                      person.birthDay === today.getDate() && (
                        <p className="ml-1 flex-shrink-0">🎉</p>
                      )}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-sm text-text-gray-dark">
                近日誕生日のヒトはいません
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
