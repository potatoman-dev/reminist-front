import client from "@/libs/api/client";

export const deleteConversation = async (
  accessToken: string,
  clientToken: string,
  uid: string,
  personId: string,
  conversationId: string
) => {
  try {
    const response = await client.delete(
      `/people/${personId}/conversations/${conversationId}`,
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
        `Failed to delete conversation, status: ${response.status}`
      );
    }

    return response;
  } catch (error) {
    console.error("Error occurred while deleting conversation:", error);
    throw error;
  }
};
