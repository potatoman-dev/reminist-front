import { cookies } from 'next/headers'
import client from "@/lib/api/client";


const HomePage = async () => {
  const res = await client.get("/");
  const data = await res.data;
    console.log(data);


      const cookieStore = cookies()
      const accessToken = cookieStore.get("access-token")?.value || "";
      const clientToken = cookieStore.get("client")?.value || "";
      const uid = cookieStore.get("uid")?.value || "";

      if (!accessToken || !clientToken || !uid) {
        throw new Error("Missing authentication tokens");
      }

      const tokenRes = await client.get("/auth/validate_token", {
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: clientToken,
          uid: uid,
        },
      });

      const tokenData = tokenRes.data;

  return <div>{<h1><p>{tokenData.data.name}</p>Home Page</h1>}</div>;
};

export default HomePage;
