"use client";

import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiList,
  FiLogOut,
  FiPlusCircle,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { loadingAtom } from "@/atoms/loadingAtom";
import { userAtom } from "@/atoms/userAtom";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth/api";
import { getUserFromServerSideProps } from "@/lib/auth/auth";
import { User } from "@/types/user";
import { GetServerSidePropsContext } from "next";
import { UserName } from "./_components/UserName";

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

const  Header = () => {
  const route = useRouter();
  const pathname = usePathname();
  // const { handleGetCurrentUser } = useAuth();
  // const [user, setUser] = useAtom(userAtom);
  // const loading = useAtomValue(loadingAtom);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(loading);

  //   handleGetCurrentUser();
  // }, []);


  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // setUser(null);
      route.push("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  const loggedInPath = ["/home", "/people", "/people/new"];


  return (
    <>
      <header className="fixed left-0 top-0 h-12 w-full border-b-[1px] border-border bg-surface md:h-16">
        <div className="flex h-full items-center gap-16 px-6 md:px-10">
          <div className="w-28 shrink-0 md:w-[133px]">
            <Image
              src="/logo.png"
              alt="reminist logo"
              width={133}
              height={23}
            />
          </div>
          <div className="ml-auto h-6 w-6 md:hidden">
            <FiMenu className="h-full w-full text-text" />
          </div>
          <div className="fixed right-0 top-0 h-screen max-w-80 w-2/3 bg-surface px-6 pt-3 pb-6">
            <div className="flex flex-col h-full">
              <div className="ml-auto h-6 w-6">
                <FiX className="h-full w-full text-text" />
              </div>
              {loggedInPath.includes(pathname) ? (
                <>
                  <p className="mt-5 min-w-20 rounded-md bg-background-secondary p-2 text-center text-sm text-text-secondary">
                    <UserName />
                  </p>
                  <ul className="mt-8 flex flex-col gap-4 pl-4">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`flex w-fit items-center gap-1 ${pathname === link.href ? "relative text-primary" : ""}`}
                        >
                          {link.icon}
                          <p>{link.label}</p>
                          {pathname === link.href && (
                            <div className="absolute -left-3 top-1/2 h-1 w-1 rounded-full bg-primary-variant" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-8 pt-8 border-t-[1px] border-border flex flex-col gap-4 pl-4">
                  <li>
                      <Link
                        href="/mypage"
                        className={`flex items-center gap-1 ${pathname === "/mypage" ? "relative text-primary" : ""}`}
                      >
                        <FiUser />
                        <p>マイページ</p>
                        {pathname === "/mypage" && (
                          <div className="absolute -left-3 top-1/2 h-1 w-1 rounded-full bg-primary-variant" />
                        )}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1"
                      >
                        <FiLogOut />
                        <p>ログアウト</p>
                      </button>
                    </li>
                    </ul>
                </>
              ) : (
                <>
                  <ul className="mt-8 flex flex-col gap-5 [&>li>a]:block [&>li>a]:w-full [&>li>a]:rounded-md [&>li>a]:py-2 [&>li>a]:text-center">
                  <li>
                    <Link
                      href="/signin"
                      className="border-2 border-border"
                    >
                      ログイン
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="bg-primary text-on-primary"
                    >
                      新規登録
                    </Link>
                  </li>
                </ul>
                </>
              )}
              <div className="mt-auto flex flex-col gap-2 items-end [&_a]:w-fit [&_a]:text-sm [&_a]:text-secondary">
              <Link href="/terms-of-use">利用規約</Link>
              <Link href="/privacy-policy">プライバシーポリシー</Link>
            </div>

            </div>
          </div>
          <div className="hidden w-full items-center md:flex">
            {loggedInPath.includes(pathname)  ? (
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
                <div className="ml-auto">
                  <button
                    onClick={handleModalOpen}
                    className="min-w-20 cursor-pointer rounded-md bg-background-secondary p-2 text-center text-sm text-text-secondary"
                  >
                    <UserName />
                  </button>
                  {isModalOpen ? (
                    <>
                      <div className="-bottom-22 absolute right-10 z-20 rounded-md border-[1px] border-border bg-surface px-2 py-2 shadow-sm [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:rounded-md [&>*]:px-8 [&>*]:py-1.5 [&>*]:transition-colors">
                        <Link
                          href="/mypage"
                          className="mb-1 hover:bg-background-secondary"
                        >
                          <FiUser />
                          <p>マイページ</p>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="hover:bg-background-secondary"
                        >
                          <FiLogOut />
                          <p>ログアウト</p>
                        </button>
                      </div>
                      <div
                        onClick={handleModalClose}
                        className="bg-transparent fixed left-0 top-0 z-10 h-screen w-full"
                      ></div>
                    </>
                  ) : null}
                </div>
              </>
            ) : (
              <nav className="ml-auto">
                <ul className="flex gap-5 [&>li>a]:block [&>li>a]:w-28 [&>li>a]:rounded-md [&>li>a]:py-1 [&>li>a]:text-center">
                  <li>
                    <Link
                      href="/signin"
                      className="hover:bg-background-secondary"
                    >
                      ログイン
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="bg-primary text-on-primary hover:bg-primary-hover"
                    >
                      新規登録
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;