import { getPerson } from "@/features/person/api/getPerson";
import { PersonEdit } from "@/features/person/components/PersonEdit";

const EditPersonPage = async ({ params }: { params: { id: string } }) => {
  const data = await getPerson(params.id, "en");

  return (
    <section>
      <div className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
        <PersonEdit id={params.id} data={data.person} />
      </div>
    </section>
  );
};

export default EditPersonPage;
