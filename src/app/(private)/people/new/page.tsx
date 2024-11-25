import { PersonForm } from "@/features/person/components/PersonForm";
import { getCurrentUser } from "@/features/user/api/getCurrentUser";

const PersonNewPage = async () => {
  await getCurrentUser();
  return (
    <section>
      <PersonForm />
    </section>
  );
};

export default PersonNewPage;
