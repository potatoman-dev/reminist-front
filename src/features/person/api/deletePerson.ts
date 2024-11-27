import Cookies from "js-cookie";

import client from "@/libs/api/client";

export const deletePerson = async (id: number) => {
  try {
    const response = await client.delete(`/people/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "access-token": Cookies.get("access-token"),
        client: Cookies.get("client"),
        uid: Cookies.get("uid"),
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
