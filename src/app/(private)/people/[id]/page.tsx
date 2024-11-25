import { getPerson } from "@/features/person/api/getPerson";
import { PersonBasicInfomation } from "@/features/person/components/PersonBasicInfomation";

const PersonPage = async ({ params }: { params: { id: string } }) => {
  const data = await getPerson(params.id);

  return (
    <section>
      <div className="mx-6 mt-6 max-w-3xl md:mx-auto md:mt-16 md:w-3/4">
        <PersonBasicInfomation data={data.person} />
      </div>
    </section>
  );
};

export default PersonPage;
