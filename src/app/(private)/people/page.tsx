import Link from "next/link";

import { getPeople } from "@/features/person/api/getPeople";
import { PersonType } from "@/features/person/types";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const PeoplePage = async () => {
  await getCurrentUser();

  const data = await getPeople();

  return (
    <div>
      <h1>People</h1>
      <ul>
        {data.people.map((person: PersonType) => (
          <li key={person.id}>
            <Link href={`/people/${person.id}`}>
              {person.name}(id:{person.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeoplePage;
