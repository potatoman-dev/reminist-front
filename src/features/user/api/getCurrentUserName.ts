import { cookies } from "next/headers";

export const getCurrentUserName = () => {
  const cookieStore = cookies();
  const name = cookieStore.get("user-name")?.value || "";
  return { name: name };
};
