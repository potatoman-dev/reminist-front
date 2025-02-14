import Cookies from "js-cookie";

import { SignInParams } from "@/features/user/types";
import client from "@/libs/api/client";

// サインイン（ログイン）
export const signIn = async (params: SignInParams) => {
  return await client
    .post(
      "/auth/sign_in",
      {
        email: params.email,
        password: params.password,
      },
      {
        withCredentials: true,
      }
    )
    .then(function (response) {
      Cookies.set("uid", response.headers["uid"]);
      Cookies.set("client", response.headers["client"]);
      Cookies.set("access-token", response.headers["access-token"]);
      Cookies.set("user-name", response.data.data.name);
    })
    .catch(function (error) {
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      console.error(error);
      throw error;
    });
};
