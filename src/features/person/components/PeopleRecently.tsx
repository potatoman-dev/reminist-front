import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import { PersonType } from "@/features/person/types";

export const PeopleRecently = (props: { people: PersonType[] }) => {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-3 pl-4 text-lg font-bold md:pl-5">
          最近追加したヒトビト
        </h2>
        <Link className="flex items-center gap-1 text-primary" href="/people">
          ヒトの一覧
          <span>
            <FiChevronRight />
          </span>
        </Link>
      </div>
      {props.people.length > 0 ? (
        <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {props.people.map((person) => {
            return (
              <li key={person.id}>
                <Link
                  href={`/people/${person.id}`}
                  className="block rounded-2xl border border-border-white bg-white px-6 py-4 shadow shadow-shadow transition-shadow hover:shadow-md md:rounded-3xl md:py-6"
                >
                  <div className="flex justify-center">
                    <Image
                      className="h-auto w-2/3 max-w-24"
                      src={`/image/people/${person.imageUrl}.png`}
                      alt={person.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <p className="mt-4 text-center">{person.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>最近追加したヒトビトはいません</p>
      )}
    </div>
  );
};
