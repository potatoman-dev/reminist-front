"use client";

import { useEffect, useState } from "react";

import { deletePerson } from "@/features/person/api/deletePerson";
import { getPeople } from "@/features/person/api/getPeople";
import { PersonCard } from "@/features/person/components/PersonCard";
import { PersonType } from "@/features/person/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";

export const PeopleList = (props: { people: PersonType[] }) => {
  const [people, setPeople] = useState<PersonType[]>(props.people);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const { accessToken, clientToken, uid } = getAuthTokensClient();
      try {
        const data = await getPeople(accessToken, clientToken, uid);
        setPeople(data.people);
      } catch (error) {
        console.error("Error fetching people:", error);
        setError("データの取得中にエラーが発生しました\nリロードしてください");
      }
    };
    fetchPeople();
  }, []);

  const handleDelete = async (id: number) => {
    if (id) {
      await deletePerson(id);
      const newPeople = people.filter((person) => person.id !== id);
      setPeople(newPeople);
    }
  };

  if (error) {
    return (
      <p className="whitespace-pre-wrap text-center text-text-gray-dark">
        {error}
      </p>
    );
  }

  return (
    <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
