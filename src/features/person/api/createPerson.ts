import Cookies from "js-cookie";

import { PersonType } from "@/features/person/types";
import client from "@/libs/api/client";
import refetchForServer from "@/libs/api/refetchForServer";

export const createPerson = async (params: PersonType) => {
  try {
    const person = client.post(
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
    refetchForServer("/people");
    return person;
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
