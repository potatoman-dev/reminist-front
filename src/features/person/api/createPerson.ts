import Cookies from "js-cookie";

import { PersonType } from "@/features/person/types";
import client from "@/libs/api/client";

export const createPerson = async (params: PersonType) => {
  try {
    console.log({ person: params });
    return client.post(
      "/people",
      { person: params },
      {
        headers: {
          "access-token": Cookies.get("access-token"),
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
        },
      }
    );
    // redirect(`/people/${response.data.id}`);
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
