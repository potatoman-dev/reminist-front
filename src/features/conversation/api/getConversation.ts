import client from "@/libs/api/client";

export const getConversation = async (
  accessToken: string,
  clientToken: string,
  uid: string,
  userId: string,
  conversationId: string
) => {
  try {
    const response = await client.get(
      `/people/${userId}/conversations/${conversationId}`,
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

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch conversation, status: ${response.status}`
      );
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred while fetching conversation:", error);
    throw error;
  }
};
