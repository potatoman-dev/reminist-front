import { Logo } from "@/components/Header/Common/Logo";

import { HeaderButton } from "./HeaderButton";

export const PublicHeader = () => {
  return (
    <header className="fixed left-0 top-0 flex h-12 w-full items-center justify-between border-b border-border-white px-4 md:h-16 md:px-8">
      <Logo />
      <div className="flex gap-3">
        <HeaderButton
          href="/signin"
          text="ログイン"
          class="bg-background-gray-normal hover:bg-background-gray-normal-hover"
        />
        <HeaderButton
          href="/signup"
          text="新規登録"
          class="bg-background-black text-white hover:bg-background-black-hover"
        />
      </div>
    </header>
  );
};
