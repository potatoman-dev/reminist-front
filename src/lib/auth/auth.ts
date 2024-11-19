// import Cookies from "js-cookie";
// import client from "@/lib/api/client";
// import { GetServerSidePropsContext } from "next";

// // 認証済みのユーザーを取得
// export const getUserFromServerSideProps = async (context:GetServerSidePropsContext) => {
  //   if (
    //     !Cookies.get("_access_token") ||
    //     !Cookies.get("_client") ||
    //     !Cookies.get("_uid")
    //   )
    //     return;
    //   const user = client.get("/auth/sessions", {
      //     headers: {
        //       "access-token": Cookies.get("_access_token"),
        //       client: Cookies.get("_client"),
        //       uid: Cookies.get("_uid"),
        //     },
        //   });
        
        //   return {props: {user}}
        // };

        // ###############################################
        
//         import { GetServerSideProps } from "next";

// export const withAuthServerSideProps = (url: string): GetServerSideProps => {
//   return async (context) => {
//     const { req, res } = context;

//     const uid = req.cookies["uid"] || "";
//     const client = req.cookies["client"] || "";
//     const accessToken = req.cookies["access-token"] || "";

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
//       headers: {
//         "Content-Type": "application/json",
//         uid: uid,
//         client: client,
//         "access-token": accessToken,
//       },
//     });
//     if (!response.ok && response.status === 401) {
//       return {
//         redirect: {
//           destination: "/signin",
//           permanent: false,
//         },
//       };
//     }
//     // TODO: 他にも500エラーを考慮した分岐も必要
//     const props = await response.json();
//     return { props };
//   };
// };

// #########################################################


import { cookies } from "next/headers";

export const withAuthServerSideProps = async (url: string) => {
  const cookieStore = cookies();

  const uid = cookieStore.get("uid")?.value || "";
  const client = cookieStore.get("client")?.value || "";
  const accessToken = cookieStore.get("access-token")?.value || "";

  console.log("Request Data:", {
    url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    headers: {
      "Content-Type": "application/json",
      uid,
      client,
      "access-token": accessToken,
    },
  });


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    headers: {
      "Content-Type": "application/json",
      uid,
      client,
      "access-token": accessToken,
    } as HeadersInit,
    cache: "no-store", // 常に最新のデータを取得
  });

  if(!response.ok){
    const errorText = await response.text();
    console.error("Fetch error:", errorText); // エラーメッセージをログに出力
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (!response.ok && response.status === 401) {
    // return { redirect: "/signin" }; // 認証失敗時のリダイレクト
  }

  // 必要なデータを取得
  const data = await response.json();
  return { data };
};