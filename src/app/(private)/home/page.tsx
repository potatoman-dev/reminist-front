import { notFound } from "next/navigation";

import { ConversationFeed } from "@/features/conversation/components/ConversationFeed";
import { getUpcomingBirthdays } from "@/features/person/api/getUpcomingBirthdays";
import { PeopleUpcomingBrithdays } from "@/features/person/components/PeopleUpcomingBrithdays";
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
        <div className="">
          <h1 className="mb-9 text-3xl font-bold">ホーム</h1>
          <div className="mb-11">
            <PeopleUpcomingBrithdays people={people} />
          </div>
          <div className="">
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
