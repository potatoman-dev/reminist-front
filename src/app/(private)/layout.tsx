import { Footer } from "@/components/Footer";
import { PrivateHeader } from "@/components/Header/PrivateHeader";

import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Reminist",
  description: "Generated by create next app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateHeader />
      <div className="w-full max-w-4xl px-6 py-16 md:mx-auto lg:w-3/4">
        {children}
      </div>
      <Footer />
    </>
  );
}
