import { PersonType } from "@/features/person/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import client from "@/libs/api/client";

export const updatePerson = async (id: string, params: PersonType) => {
  const { accessToken, clientToken, uid } = getAuthTokensClient();

  try {
    return client.put(
      `/people/${id}`,
      { person: params },
      {
        headers: {
          "access-token": accessToken,
          client: clientToken,
          uid: uid,
        },
      }
    );
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
