import client from "@/libs/api/client";
import { SignUpParams } from "@/features/user/types";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};
