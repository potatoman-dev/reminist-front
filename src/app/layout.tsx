import { Providers } from "@/components/Providers";

import { Noto_Sans_JP, M_PLUS_Rounded_1c } from 'next/font/google'
import type { Metadata } from "next";

import "@/app/globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

const mPlusRounded1C = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-m-plus-rounded-1c',
  weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "Reminist",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${mPlusRounded1C.variable} font-sans bg-background pt-16 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
