import Cookies from "js-cookie";

export const getAuthTokensClient = () => {
  const uid = Cookies.get("uid") || "";
  const clientToken = Cookies.get("client") || "";
  const accessToken = Cookies.get("access-token") || "";

  return { accessToken, clientToken, uid };
};
