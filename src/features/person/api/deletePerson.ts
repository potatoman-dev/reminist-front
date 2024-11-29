import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import client from "@/libs/api/client";

export const deletePerson = async (id: number) => {
  const { accessToken, clientToken, uid } = getAuthTokensClient();

  try {
    const response = await client.delete(`/people/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "access-token": accessToken,
        client: clientToken,
        uid: uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to delete person, status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error occurred while deleting person:", error);
    throw error;
  }
};
