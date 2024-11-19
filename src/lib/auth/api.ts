import Cookies from "js-cookie";

import client from "@/lib/api/client";

import { SignInParams, SignUpParams } from "./types";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

// サインイン（ログイン）
export const signIn =async (params: SignInParams) => {
  // const res = await client.post("/auth/sign_in", {email: params.email, password: params.password});

  return await client.post("/auth/sign_in", {
    email: params.email,
    password: params.password,
  }
  ,{
    withCredentials: true
  }
)
  .then(function (response) {
  console.log('signIn api');
    Cookies.set("uid", response.headers["uid"]);
    Cookies.set("client", response.headers["client"]);
    Cookies.set("access-token", response.headers["access-token"]);
  })
  .catch(function (error) {
  Cookies.remove("uid");
    Cookies.remove("client");
    Cookies.remove("access-token");
    console.error(error);
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

// 認証済みのユーザーを取得
export const getCurrentUser = async () => {
  const accessToken = Cookies.get("access-token") || "";
  const clientToken = Cookies.get("client") || "";
  const uid = Cookies.get("uid") || "";

  if (!accessToken || !clientToken || !uid) {
    return null;
  }
  // if (
  //   !Cookies.get("_access_token") ||
  //   !Cookies.get("_client") ||
  //   !Cookies.get("_uid")
  // ){
  //   return null;
  // }

  try {
  //  const res = await client.get("/profiles", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "access-token": Cookies.get("_access_token"),
  //       client: Cookies.get("_client"),
  //       uid: Cookies.get("_uid"),
  //     },
  //   });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles`, {
    headers: {
      "Content-Type": "application/json",
      "access-token": accessToken,
      client: clientToken,
      uid: uid,
    },
  });

    // return res.data;


    if (!res.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await res.json();
    console.log(data);

    return data;
  }catch(e){
    console.error(e);
    return null
  }
};
