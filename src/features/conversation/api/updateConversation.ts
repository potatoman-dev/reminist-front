import { ConversationType } from "@/features/conversation/types";
import client from "@/libs/api/client";

export const updateConversation = async (
  accessToken: string,
  clientToken: string,
  uid: string,
  params: ConversationType
) => {
  try {
    return client.put(
      `/people/${params.personId}/conversations/${params.id}`,
      { conversation: params },
      {
        headers: {
          "access-token": accessToken,
          client: clientToken,
          uid: uid,
        },
      }
    );
  } catch (error) {
    console.error("Error occurred while fetching current conversation:", error);
  }
};
