import { Footer } from "@/components/Footer";
import { PublicHeader } from "@/components/Header/PublicHeader";

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
      <PublicHeader />
      {children}
      <Footer />
    </>
  );
}