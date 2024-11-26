import Link from "next/link";

import { PersonType } from "@/features/person/types";

export const PeopleUpcomingBrithdays = (props: { people: PersonType[] }) => {
  const today = new Date();
  console.log(today.getMonth() + 1, today.getDate());

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg rounded-lg bg-background-gray-normal px-8 py-5 shadow-sm">
        <h2 className="mb-2 w-fit rounded-lg bg-primary-variant px-3 py-0.5 text-sm font-bold text-white">
          近日誕生日のヒトビト
        </h2>
        {props.people.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {props.people.map((person) => (
              <li
                key={person.id}
                className="text-sm font-medium text-text-gray-dark"
              >
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
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-gray-dark">
            近日誕生日のヒトはいません
          </p>
        )}
      </div>
    </div>
  );
};
