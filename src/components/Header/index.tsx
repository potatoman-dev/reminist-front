"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FiHome, FiList, FiPlusCircle } from "react-icons/fi";

export const Header = () => {
  const { loading, isSignedIn, currentUser, handleSignOut } = useAuth();
  const pathname = usePathname();

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

  useEffect(() => {
    console.log(loading, isSignedIn, currentUser);
  }
  , [loading, isSignedIn, currentUser]);

  const loggedInPath = ["/home", "/people", "/people/new"];

  return (
    <header className="h-16 border-b-[1px] border-border bg-surface">
      <div className="flex h-full items-center gap-16 px-10">
        <div className="shrink-0">
          <Image src="/logo.png" alt="reminist logo" width={133} height={23} />
        </div>
        {loggedInPath.includes(pathname) && !loading && isSignedIn ? (
          <>
          <nav>
            <ul className="flex gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 ${pathname === link.href ? "relative text-primary" : ""}`}
                  >
                    {link.icon}
                    <p>{link.label}</p>
                    {pathname === link.href && (
                      <div className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full bg-primary-variant" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            
          </div>
          </>
        ) : (
          <nav>
            <ul className="flex gap-5">
              <li>
                <Link href="/signup" className="flex items-center gap-1">
                  <p>新規登録</p>
                </Link>
              </li>
              <li>
                <Link href="/signin" className="flex items-center gap-1">
                  <p>ログイン</p>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
