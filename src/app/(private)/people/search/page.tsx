"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { deletePerson } from "@/features/person/api/deletePerson";
import { PersonCard } from "@/features/person/components/PersonCard";
import { PersonType } from "@/features/person/types";
import { getSearchPersonResult } from "@/features/search/api/getSearchPersonResult";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import refetchForServer from "@/libs/api/refetchForServer";

const PeopleSearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const [people, setPeople] = useState<PersonType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const people = await getSearchPersonResult(
          accessToken,
          clientToken,
          uid,
          search
        );
        setPeople(people);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPeople();
  }, []);

  const handleDelete = async (id: number) => {
    if (id) {
      await deletePerson(id);
      setPeople((prevPeople) =>
        prevPeople.filter((person) => person.id !== id)
      );
      refetchForServer("/people");
    }
  };

  return (
    <section className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
      <div>
        <h1 className="mb-4 w-full rounded-lg bg-background-gray-light px-8 py-5 text-sm shadow-sm md:text-base">
          検索ワード：{search}
        </h1>
        {loading ? (
          <p className="mt-10 text-center">loading...</p>
        ) : people?.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {people.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-center">該当する人物はいません</p>
        )}
      </div>
    </section>
  );
};
export default PeopleSearchPage;
