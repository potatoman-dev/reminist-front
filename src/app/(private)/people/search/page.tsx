"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PersonCard } from "@/features/person/components/PersonCard";
import { PersonType } from "@/features/person/types";
import { getSearchPersonResult } from "@/features/search/api/getSearchPersonResult";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";

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

  return (
    <section>
      <div>
        <h1 className="mb-9 text-3xl font-bold">検索結果</h1>
        <p className="mb-12 w-full rounded-2xl border border-border-white bg-white px-8 py-5 text-sm shadow shadow-shadow md:text-base">
          検索ワード：{search}
        </p>
        {loading ? (
          <p className="mt-10 text-center">loading...</p>
        ) : people?.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {people.map((person) => (
              <PersonCard key={person.id} person={person} />
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
