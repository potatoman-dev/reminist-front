import { notFound } from "next/navigation";
import { Suspense } from "react";

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
        <div className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
          <Suspense fallback={<p>loading...</p>}>
            <PeopleUpcomingBrithdays initialPeople={people} />
          </Suspense>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching upcoming birthdays:", error);
    notFound();
  }
};

export default HomePage;
