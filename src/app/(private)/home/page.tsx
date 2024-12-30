import { notFound } from "next/navigation";

import { ConversationFeed } from "@/features/conversation/components/ConversationFeed";
import { getNewPeople } from "@/features/person/api/getNewPeople";
import { getUpcomingBirthdays } from "@/features/person/api/getUpcomingBirthdays";
import { PeopleRecently } from "@/features/person/components/PeopleRecently";
import { PeopleUpcomingBrithdays } from "@/features/person/components/PeopleUpcomingBrithdays";
import { getAuthTokensServer } from "@/features/user/api/getAuthTokensServer";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const HomePage = async () => {
  await getCurrentUser();

  const { accessToken, clientToken, uid } = getAuthTokensServer();
  try {
    const upcomingBirthdayData = await getUpcomingBirthdays(
      accessToken,
      clientToken,
      uid
    );
    const upcomingBirthdaysPeople = upcomingBirthdayData.people;

    const newPeopleData = await getNewPeople(accessToken, clientToken, uid);
    const newPeople = newPeopleData.people;

    return (
      <section>
        <div className="">
          <h1 className="mb-5 text-2xl font-bold md:mb-9 md:text-3xl">
            ホーム
          </h1>
          <div className="mb-8 md:mb-11">
            <PeopleUpcomingBrithdays people={upcomingBirthdaysPeople} />
          </div>
          <div className="mb-8 md:mb-11">
            <PeopleRecently people={newPeople} />
          </div>
          <div>
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
