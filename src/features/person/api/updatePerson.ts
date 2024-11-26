import Cookies from "js-cookie";

import { PersonType } from "@/features/person/types";
import client from "@/libs/api/client";

export const updatePerson = async (id: string, params: PersonType) => {
  try {
    console.log({ person: params });
    return client.put(
      `/people/${id}`,
      { person: params },
      {
        headers: {
          "access-token": Cookies.get("access-token"),
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
        },
      }
    );
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
