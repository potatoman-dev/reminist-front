"use client";

import { useEffect, useState } from "react";

import { getPeople } from "@/features/person/api/getPeople";
import { getPeopleWithPageNumber } from "@/features/person/api/getPeopleWithPageNumber";
import { PersonCard } from "@/features/person/components/PersonCard";
import { PersonType } from "@/features/person/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";

export const PeopleList = (props: { people: PersonType[] }) => {
  const [people, setPeople] = useState<PersonType[]>(props.people);
  const [peopleCount, setPeopleCount] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const data = await getPeople(accessToken, clientToken, uid);
        setPeople(data.people);
        setPeopleCount(data.peopleCount);
      } catch (error) {
        console.error("Error fetching people:", error);
        setError("データの取得中にエラーが発生しました\nリロードしてください");
      }
    };
    fetchPeople();
  }, []);

  const handleShowMore = () => {
    setLoading(true);

    const fetchPeople = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const data = await getPeopleWithPageNumber(
          accessToken,
          clientToken,
          uid,
          nextPage
        );
        setPeople((prevPeople) => [...prevPeople, ...data.people]);
      } catch (error) {
        console.error("Error fetching people:", error);
        setError("データの取得中にエラーが発生しました\nリロードしてください");
      }
    };
    fetchPeople();
    setNextPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  if (error) {
    return (
      <p className="whitespace-pre-wrap text-center text-text-gray-dark">
        {error}
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </ul>

      {peopleCount > people.length && (
        <div className="flex justify-center pt-10">
          {loading ? (
            <div className="flex w-48 items-center justify-center rounded-full bg-primary px-14 py-3 font-medium text-white">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>もっと見る</span>
            </div>
          ) : (
            <button
              onClick={handleShowMore}
              className="block cursor-pointer rounded-full bg-primary px-14 py-3 text-center font-medium text-white transition-colors hover:bg-primary-hover"
            >
              もっと見る
            </button>
          )}
        </div>
      )}
    </>
  );
};
