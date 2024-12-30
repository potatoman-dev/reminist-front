import { notFound } from "next/navigation";

import { getPeople } from "@/features/person/api/getPeople";
import { PeopleList } from "@/features/person/components/PeopleList";
import { SearchField } from "@/features/search/components/SearchField";
import { getAuthTokensServer } from "@/features/user/api/getAuthTokensServer";

const PeoplePage = async () => {
  const { accessToken, clientToken, uid } = getAuthTokensServer();
  try {
    const data = await getPeople(accessToken, clientToken, uid);
    const people = data.people;

    return (
      <section className="">
        <h1 className="mb-5 text-2xl font-bold md:mb-9 md:text-3xl">
          ヒトの一覧
        </h1>
        <div className="mb-12 w-full md:mb-16">
          <SearchField />
        </div>
        <PeopleList people={people} />
      </section>
    );
  } catch (error) {
    console.error("Error fetching people:", error);
    notFound();
  }
};

export default PeoplePage;
