"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList, FiPlusCircle } from "react-icons/fi";

// TODO: update links
const links = [
  {
    href: "/home",
    label: "ホーム",
    icon: <FiHome />,
  },
  {
    href: "/people",
    label: "ヒトの一覧",
    icon: <FiList />,
  },
  {
    href: "/people/new",
    label: "ヒトの新規追加",
    icon: <FiPlusCircle />,
  },
];

export const Links = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`flex items-center gap-1 ${pathname === link.href ? "relative text-primary" : ""}`}
          >
            {link.icon}
            <p>{link.label}</p>
            {pathname === link.href && (
              <div className="absolute -left-3 bottom-1/2 h-1 w-1 translate-y-1/2 rounded-full bg-primary-variant md:-bottom-1 md:left-1/2" />
            )}
          </Link>
        </li>
      ))}
    </>
  );
};
