import Cookies from "js-cookie";

import client from "@/libs/api/client";

import { getAuthTokensClient } from "./getAuthTokensClient";

// サインアウト（ログアウト）
export const signOut = async () => {
  const { accessToken, clientToken, uid } = getAuthTokensClient();

  return client
    .delete("/auth/sign_out", {
      headers: {
        "access-token": accessToken,
        client: clientToken,
        uid: uid,
      },
    })
    .then((response) => {
      Cookies.remove("access-token");
      Cookies.remove("client");
      Cookies.remove("uid");
      Cookies.remove("user-name");
      return response;
    });
};
