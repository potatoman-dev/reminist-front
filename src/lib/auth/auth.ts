import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import client from "@/lib/api/client";

const getAuthTokens = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token")?.value || "";
  const clientToken = cookieStore.get("client")?.value || "";
  const uid = cookieStore.get("uid")?.value || "";

  if (!accessToken || !clientToken || !uid) {
    throw new Error("Missing authentication tokens");
  }

  return { accessToken, clientToken, uid };
};

export const getCurrentUser = async () => {
  try {
    const { accessToken, clientToken, uid } = getAuthTokens();

    const response = await client.get("auth/validate_token", {
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

    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    console.error("Error occurred while fetching current user:", error);

    notFound();
  }
};
