import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

import { signOut } from "@/lib/auth/api";

export const Profile = () => {
  const route = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      route.push("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Link href="/mypage" className="mb-1 md:hover:bg-background-secondary">
        <FiUser />
        <p>マイページ</p>
      </Link>
      <button
        onClick={handleSignOut}
        className="md:hover:bg-background-secondary"
      >
        <FiLogOut />
        <p>ログアウト</p>
      </button>
    </>
  );
};
