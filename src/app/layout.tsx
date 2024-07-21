import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextSessionProvider from "../components/NextSessionProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Y2ubeConnect",
  description: "A utility application for youtubers who travel a lot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSessionProvider>{children}</NextSessionProvider>
      </body>
    </html>
  );
}
