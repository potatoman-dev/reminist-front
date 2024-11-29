import { notFound } from "next/navigation";

import { getPeople } from "@/features/person/api/getPeople";
import { PeopleList } from "@/features/person/components/PeopleList";
import { getAuthTokensServer } from "@/features/user/api/getAuthTokensServer";

const PeoplePage = async () => {
  const { accessToken, clientToken, uid } = getAuthTokensServer();
  try {
    const data = await getPeople(accessToken, clientToken, uid);
    const people = data.people;

    return (
      <section>
        <div className="mt-6 max-w-6xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
          <PeopleList people={people} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching people:", error);
    notFound();
  }
};

export default PeoplePage;
