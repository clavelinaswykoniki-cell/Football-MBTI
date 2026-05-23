import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GOAT 足球辩论场 · Messi vs Ronaldo",
  description:
    "8 场史诗级足球对决·12 轮辩论·AI 深度人格分析·测出你的足球人格",
  openGraph: {
    title: "GOAT 足球辩论场 · Messi vs Ronaldo",
    description:
      "8 场史诗级足球对决·12 轮辩论·AI 深度人格分析·测出你的足球人格",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
