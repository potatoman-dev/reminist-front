import { notFound } from "next/navigation";

import client from "@/libs/api/client";

import { getAuthTokensServer } from "./getAuthTokensServer";

export const getCurrentUser = async () => {
  const { accessToken, clientToken, uid } = getAuthTokensServer();

  try {
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
