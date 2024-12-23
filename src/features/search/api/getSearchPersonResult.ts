import client from "@/libs/api/client";

export const getSearchPersonResult = async (
  accessToken: string,
  clientToken: string,
  uid: string,
  name: string
) => {
  try {
    const response = await client.get(`/people/search?q[name_cont]=${name}`, {
      headers: {
        "Cache-Control": "no-cache",
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
    return data.people;
  } catch (error) {
    console.error("Error occurred while fetching people:", error);
    throw error;
  }
};
