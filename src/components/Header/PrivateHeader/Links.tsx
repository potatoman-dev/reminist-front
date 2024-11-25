"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser } from "react-icons/fi";

const links = [
  {
    href: "/home",
    label: "ホーム",
    icon: <FiHome />,
  },
  {
    href: "/people",
    label: "ヒトの一覧",
    icon: <FiUser />,
  },
];

export const Links = (props: { handleClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={props.handleClose ? props.handleClose : undefined}
            className={`flex items-center gap-1 ${pathname === link.href ? "relative text-primary" : ""}`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        </li>
      ))}
    </>
  );
};
