import { getConversationsList } from "@/features/conversation/api/getConversationsList";
import { ConversationsList } from "@/features/conversation/components/ConversationsList";
import { getPerson } from "@/features/person/api/getPerson";
import { PersonBasicInformation } from "@/features/person/components/PersonBasicInformation";
import { getAuthTokensServer } from "@/features/user/api/getAuthTokensServer";

const PersonPage = async ({ params }: { params: { id: string } }) => {
  const { accessToken, clientToken, uid } = getAuthTokensServer();

  const person = await getPerson(params.id, "ja");
  const conversations = await getConversationsList(
    accessToken,
    clientToken,
    uid,
    params.id
  );

  return (
    <section>
      <h1 className="mb-9 text-3xl font-bold">{person.person.name}</h1>
      <PersonBasicInformation data={person.person} />
      <div className="mx-auto mt-20 max-w-2xl">
        <ConversationsList conversations={conversations} personId={params.id} />
      </div>
    </section>
  );
};

export default PersonPage;
