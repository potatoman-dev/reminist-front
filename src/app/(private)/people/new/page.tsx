import { PersonCreate } from "@/features/person/components/PersonCreate";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const PersonNewPage = async () => {
  await getCurrentUser();
  return (
    <section>
      <PersonCreate />
    </section>
  );
};

export default PersonNewPage;
