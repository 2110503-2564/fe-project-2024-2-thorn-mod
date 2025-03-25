import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

import ReduxProviders from "@/redux/ReduxProvider";
import TopMenu from "@/components/TopMenu";

import "./globals.css";

import NextAuthProviders from "@/providers/NextAuthProvider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Reservation",
  description: "Welcome to Restaurant Reservation Discover your favorite restaurants and book a table in just a few clicks.",
  icons: {
    icon: "/favicon.ico", // ✅ ใช้ path ตรงนี้ถ้าไม่ได้ใช้ชื่อ default
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProviders> */}
          <NextAuthProviders session={session}>
            <TopMenu/>
            {children}
          </NextAuthProviders>
        {/* </ReduxProviders> */}
        
       
        </body>
    </html>
  );
}

<body className={`${inter.className} bg-white text-black`}></body>
