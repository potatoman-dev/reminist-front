import client from "@/libs/api/client";

export const GetHomeData = async () => {
  const res = await client.get("/");

  const data = await res.data;

  return data;
};
