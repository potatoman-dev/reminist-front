import Link from "next/link";

interface HeaderButtonProps {
  text: string;
  class: string;
  href: string;
}

export const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <Link
      href={props.href}
      className={`rounded-lg px-4 py-1.5 text-sm transition-colors md:rounded-full md:px-8 md:py-3 md:text-base ${props.class}`}
    >
      {props.text}
    </Link>
  );
};
