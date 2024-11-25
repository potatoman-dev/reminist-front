import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

import { signOut } from "@/features/user/api/signOut";

export const Profile = (props: {
  handleModalClose?: () => void;
  handleClose?: () => void;
}) => {
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
      <Link
        href="/mypage"
        onClick={
          props.handleModalClose ? props.handleModalClose : props.handleClose
        }
        className="mb-1 md:hover:bg-background-gray-light"
      >
        <FiUser />
        <p>マイページ</p>
      </Link>
      <button
        onClick={handleSignOut}
        className="md:hover:bg-background-gray-light"
      >
        <FiLogOut />
        <p>ログアウト</p>
      </button>
    </>
  );
};
