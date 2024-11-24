import { SignUpParams } from "@/features/user/types";
import client from "@/libs/api/client";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};
