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
      className={`rounded-md px-4 py-1.5 text-sm transition-colors md:px-6 md:py-2 md:text-base ${props.class}`}
    >
      {props.text}
    </Link>
  );
};
