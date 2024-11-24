import Cookies from "js-cookie";

import { PersonType } from "@/features/person/types";
import client from "@/libs/api/client";

export const createPerson = async (params: PersonType) => {
  try {
    return client.post("/people", params, {
      headers: {
        "access-token": Cookies.get("access-token"),
        client: Cookies.get("client"),
        uid: Cookies.get("uid"),
      },
    });
    // console.log(response.data.id)
    // redirect(`/people/${response.data.id}`);
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
