import { Logo } from "@/components/Header/Common/Logo";
import { getCurrentUserName } from "@/features/user/api/getCurrentUserName";

import { HamburgerNav } from "./HamburgerNav";
import { Links } from "./Links";
import { ProfileModal } from "./ProfileModal";

export const PrivateHeader = async () => {
  const data = getCurrentUserName();

  return (
    <header className="fixed left-0 top-0 flex h-12 w-full items-center border-b-[1px] border-border bg-surface px-4 md:h-16 md:px-8">
      <Logo />
      <ul className="ml-14 hidden gap-5 md:flex">
        <Links />
      </ul>
      <div className="ml-auto hidden md:block">
        <ProfileModal name={data.name} />
      </div>
      <HamburgerNav name={data.name} />
    </header>
  );
};
