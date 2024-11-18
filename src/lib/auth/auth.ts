import Cookies from "js-cookie";
import client from "@/lib/api/client";
import { GetServerSidePropsContext } from "next";

// 認証済みのユーザーを取得
export const getUserFromServerSideProps = async (context:GetServerSidePropsContext) => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;
  const user = client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

  return {props: {user}}
};
