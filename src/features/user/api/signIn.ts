import Cookies from "js-cookie";
import client from "@/libs/api/client";
import { SignInParams } from "@/features/user/types";

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