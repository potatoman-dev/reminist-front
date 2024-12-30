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
        <h1 className="mb-9 text-3xl font-bold">ヒトの一覧</h1>
        <div className="mb-16 w-full">
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
