// import { useSetAtom } from "jotai";
// import { useEffect } from "react";

// import { loadingAtom } from "@/atoms/loadingAtom";
// import { userAtom } from "@/atoms/userAtom";
// import { getCurrentUser } from "@/lib/auth/api";

// export const useAuth = () => {
//   const setUser = useSetAtom(userAtom);
//   const setLoading = useSetAtom(loadingAtom);

//   const handleGetCurrentUser = async () => {
//     setLoading(true);

//     try {
//       const res = await getCurrentUser();
//       if (res?.data.isLogin === true) {
//         setUser(res.data.data);
//       } else {
//         console.log("no current user");
//       }
//     } catch (e) {
//       console.log(e);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleGetCurrentUser();
//   }, []);

//   return { handleGetCurrentUser };
// };
