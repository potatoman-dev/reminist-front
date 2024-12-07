import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

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
      <div className="mt-6 max-w-3xl px-6 md:mx-auto md:mt-16 lg:w-3/4">
        <Link
          className="flex w-fit items-center gap-2 text-sm text-text-gray-dark"
          href="/people"
        >
          <FiChevronLeft />
          ヒトの一覧
        </Link>
        <PersonBasicInformation data={person.person} />
        <div className="mt-16">
          <ConversationsList
            conversations={conversations}
            personId={params.id}
          />
        </div>
      </div>
    </section>
  );
};

export default PersonPage;
