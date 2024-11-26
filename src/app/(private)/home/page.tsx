import { getUpcomingBirthdays } from "@/features/person/api/getUpcomingBirthdays";
import { PeopleUpcomingBrithdays } from "@/features/person/components/PeopleUpcomingBrithdays";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const HomePage = async () => {
  await getCurrentUser();
  const data = await getUpcomingBirthdays();
  const people = data.people;

  return (
    <section>
      <div className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
        <PeopleUpcomingBrithdays people={people} />
      </div>
    </section>
  );
};

export default HomePage;
