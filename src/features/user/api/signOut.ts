import Cookies from "js-cookie";

import client from "@/libs/api/client";

// サインアウト（ログアウト）
export const signOut = () => {
  return client
    .delete("/auth/sign_out", {
      headers: {
        "access-token": Cookies.get("access-token"),
        client: Cookies.get("client"),
        uid: Cookies.get("uid"),
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
