import { Logo } from "../_components/Logo";

export const PublicHeader = () => {
  return (
    <header className="fixed left-0 top-0 h-12 w-full border-b-[1px] border-border bg-surface md:h-16">
      <Logo/>
    </header>
  );
}