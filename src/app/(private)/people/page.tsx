import { getPeople } from "@/features/person/api/getPeople";
import { PersonCard } from "@/features/person/components/PersonCard";
import { PersonType } from "@/features/person/types";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const PeoplePage = async () => {
  await getCurrentUser();

  const data = await getPeople();

  return (
    <section>
      <div className="mt-6 max-w-6xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
        <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.people.map((person: PersonType) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PeoplePage;
