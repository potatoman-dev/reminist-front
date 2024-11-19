import Cookies from "js-cookie";

import client from "@/lib/api/client";

import { SignInParams, SignUpParams } from "./types";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

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
      console.log("signIn api");
      Cookies.set("uid", response.headers["uid"]);
      Cookies.set("client", response.headers["client"]);
      Cookies.set("access-token", response.headers["access-token"]);
    })
    .catch(function (error) {
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      console.error(error);
      throw error;
    });
};

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
      return response;
    });
};
