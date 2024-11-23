import { getCurrentUser } from "@/lib/auth/auth";

import { PeopleNewForm } from "./_components/Form";

const PersonNewPage = async () => {
  await getCurrentUser();

  return (
    <section>
      <PeopleNewForm />
    </section>
  );
};

export default PersonNewPage;
