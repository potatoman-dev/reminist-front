import { cookies } from "next/headers";

export const getAuthTokens = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token")?.value || "";
  const clientToken = cookieStore.get("client")?.value || "";
  const uid = cookieStore.get("uid")?.value || "";

  if (!accessToken || !clientToken || !uid) {
    throw new Error("Missing authentication tokens");
  }

  return { accessToken, clientToken, uid };
};
