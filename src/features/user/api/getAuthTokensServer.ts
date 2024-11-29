import { cookies } from "next/headers";

export const getAuthTokensServer = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token")?.value || "";
  const clientToken = cookieStore.get("client")?.value || "";
  const uid = cookieStore.get("uid")?.value || "";

  return { accessToken, clientToken, uid };
};
