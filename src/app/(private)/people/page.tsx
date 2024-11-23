import Link from "next/link";

import { getPeople } from "@/api/getPeople";
import { PersonType } from "@/types/person";

const PeoplePage = async () => {
  const data = await getPeople();
  console.log(data);

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
