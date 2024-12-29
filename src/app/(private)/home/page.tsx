import { notFound } from "next/navigation";

import { ConversationFeed } from "@/features/conversation/components/ConversationFeed";
import { getUpcomingBirthdays } from "@/features/person/api/getUpcomingBirthdays";
import { PeopleUpcomingBrithdays } from "@/features/person/components/PeopleUpcomingBrithdays";
import { SearchField } from "@/features/search/components/SearchField";
import { getAuthTokensServer } from "@/features/user/api/getAuthTokensServer";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const HomePage = async () => {
  await getCurrentUser();

  const { accessToken, clientToken, uid } = getAuthTokensServer();
  try {
    const data = await getUpcomingBirthdays(accessToken, clientToken, uid);
    const people = data.people;

    return (
      <section>
        <SearchField />
        <div className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
          <PeopleUpcomingBrithdays people={people} />
          <div className="mt-10">
            <ConversationFeed />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching upcoming birthdays:", error);
    notFound();
  }
};

export default HomePage;
