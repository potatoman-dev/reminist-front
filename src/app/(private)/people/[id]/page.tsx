import { getPerson } from "@/api/getPerson";

const PersonPage = async ({ params }: { params: { id: string } }) => {
  const data = await getPerson(params.id);
  console.log(data);

  return (
    <div>
      <p>{data.person.name}</p>
    </div>
  );
};

export default PersonPage;
