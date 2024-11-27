import client from "@/libs/api/client";

export const getPeople = async (
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  try {
    const response = await client.get(`/people`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        client: clientToken,
        uid: uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch people, status: ${response.status}`);
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred while fetching people:", error);
    throw error;
  }
};
