import { ConversationType } from "@/features/conversation/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import client from "@/libs/api/client";
import refetchForServer from "@/libs/api/refetchForServer";

export const createConversation = async (params: ConversationType) => {
  const { accessToken, clientToken, uid } = getAuthTokensClient();

  try {
    const response = await client.post(
      `/people/${params.personId}/conversations`,
      { conversation: params },
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: clientToken,
          uid: uid,
        },
      }
    );

    refetchForServer(`/people/${params.personId}`);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred while fetching conversations:", error);
    throw error;
  }
};
