import { PersonCreate } from "@/features/person/components/PersonCreate";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const PersonNewPage = async () => {
  await getCurrentUser();
  return (
    <section className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
      <PersonCreate />
    </section>
  );
};

export default PersonNewPage;
