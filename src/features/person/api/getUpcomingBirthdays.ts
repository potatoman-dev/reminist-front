import client from "@/libs/api/client";

export const getUpcomingBirthdays = async (
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  try {
    const response = await client.get(`/people?filter=upcoming_birthdays`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        client: clientToken,
        uid: uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch upcoming birthdays, status: ${response.status}`
      );
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred while fetching upcoming birthdays:", error);
    throw error;
  }
};
