import { getPerson } from "@/features/person/api/getPerson";
import { PersonEdit } from "@/features/person/components/PersonEdit";

const EditPersonPage = async ({ params }: { params: { id: string } }) => {
  const data = await getPerson(params.id, "en");

  return (
    <section>
      <PersonEdit id={params.id} data={data.person} />
    </section>
  );
};

export default EditPersonPage;
