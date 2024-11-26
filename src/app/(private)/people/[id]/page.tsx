import { getPerson } from "@/features/person/api/getPerson";
import { PersonBasicInformation } from "@/features/person/components/PersonBasicInformation";

const PersonPage = async ({ params }: { params: { id: string } }) => {
  const data = await getPerson(params.id, "ja");

  return (
    <section>
      <div className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
        <PersonBasicInformation data={data.person} />
      </div>
    </section>
  );
};

export default PersonPage;
