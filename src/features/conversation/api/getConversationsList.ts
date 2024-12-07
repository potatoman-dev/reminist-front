import client from "@/libs/api/client";

export const getConversationsList = async (
  accessToken: string,
  clientToken: string,
  uid: string,
  userId: string
) => {
  try {
    const response = await client.get(`/people/${userId}/conversations`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "access-token": accessToken,
        client: clientToken,
        uid: uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch conversations, status: ${response.status}`
      );
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred while fetching conversations:", error);
    throw error;
  }
};
