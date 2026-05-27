import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "足球 MBTI",
  description:
    "用足球辩论测出你的球迷人格：8 场史诗级对决、FBTI 测试、AI 深度人格分析。",
  openGraph: {
    title: "足球 MBTI",
    description:
      "用足球辩论测出你的球迷人格：8 场史诗级对决、FBTI 测试、AI 深度人格分析。",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
