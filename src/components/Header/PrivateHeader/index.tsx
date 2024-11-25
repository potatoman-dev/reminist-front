import Link from "next/link";
import { FiPlus } from "react-icons/fi";

import { Logo } from "@/components/Header/Common/Logo";
import { getCurrentUserName } from "@/features/user/api/getCurrentUserName";

import { HamburgerNav } from "./HamburgerNav";
import { Links } from "./Links";
import { ProfileModal } from "./ProfileModal";

export const PrivateHeader = async () => {
  const data = getCurrentUserName();

  return (
    <header className="fixed left-0 top-0 h-12 w-full bg-background px-2 md:h-16 md:px-20">
      <div className="flex h-full w-full items-center border-b border-background-gray-dark px-2 md:px-4">
        <Logo />
        <ul className="ml-14 hidden gap-5 md:flex">
          <Links />
        </ul>
        <Link
          href="/people/new"
          className="ml-auto mr-4 flex items-center gap-1 rounded bg-primary px-4 py-1.5 text-sm text-white transition-colors hover:bg-primary-hover md:mr-6 md:py-2 md:text-base"
        >
          <FiPlus />
          <p>新しいヒト</p>
        </Link>
        <div className="hidden md:block">
          <ProfileModal name={data.name} />
        </div>
        <HamburgerNav name={data.name} />
      </div>
    </header>
  );
};
