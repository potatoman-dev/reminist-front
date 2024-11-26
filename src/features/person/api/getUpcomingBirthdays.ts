import { notFound } from "next/navigation";

import { getAuthTokens } from "@/features/user/api/getAuthTokens";
import client from "@/libs/api/client";

export const getUpcomingBirthdays = async () => {
  const { accessToken, clientToken, uid } = getAuthTokens();

  try {
    const response = await client.get(`/people?filter=upcoming_birthdays`, {
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
        `Failed to fetch current user, status: ${response.status}`
      );
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    console.error("Error occurred while fetching current user:", error);
    notFound();
  }
};
