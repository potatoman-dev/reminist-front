import Cookies from "js-cookie";

import { getAuthTokensClient } from "@/features/user/api/getAuthTokensClient";
import client from "@/libs/api/client";

export const updateUserName = async (params: { name: string }) => {
  const { accessToken, clientToken, uid } = getAuthTokensClient();

  try {
    client.put(
      `/auth`,
      { name: params.name },
      {
        headers: {
          "access-token": accessToken,
          client: clientToken,
          uid: uid,
        },
      }
    );

    Cookies.set("user-name", params.name);
  } catch (error) {
    console.error("Error occurred while fetching current user:", error);
  }
};
