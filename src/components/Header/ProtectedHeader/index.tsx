
import { withAuthServerSideProps } from "@/lib/auth/auth";
import { Logo } from "../_components/Logo";
import { signOut } from "@/lib/auth/api";
import { Logout } from "../_components/Logout";
import client from "@/lib/api/client";

export const ProtectedHeader = async () => {
  // const {data} = await withAuthServerSideProps("/profiles");
// console.log(data);



  return (
    <header className="fixed left-0 top-0 h-12 w-full border-b-[1px] border-border bg-surface md:h-16">
      <Logo/>
      {/* {user?.data?.email} */}
      <Logout />
    </header>
  );
}