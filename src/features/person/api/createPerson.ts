import { PersonType } from "@/features/person/types";
import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import client from "@/libs/api/client";
import refetchForServer from "@/libs/api/refetchForServer";

export const createPerson = async (params: PersonType) => {
  const { accessToken, clientToken, uid } = getAuthTokensClient();

  try {
    const person = client.post(
      "/people",
      { person: params },
      {
        headers: {
          "access-token": accessToken,
          client: clientToken,
          uid: uid,
        },
      }
    );
    refetchForServer("/people");
    return person;
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
