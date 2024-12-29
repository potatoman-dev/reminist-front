import client from "@/libs/api/client";

export const getFeed = async (
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  try {
    const response = await client.get(`/feeds`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "access-token": accessToken,
        client: clientToken,
        uid: uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch feed, status: ${response.status}`);
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error occurred while fetching feed:", error);
    throw error;
  }
};
