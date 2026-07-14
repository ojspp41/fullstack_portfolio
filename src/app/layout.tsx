import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import ThemeToggle from "@/components/ThemeToggle";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const TITLE = "오준석 — Full-Stack Engineer · AI / LLM Application";
const DESCRIPTION =
  "화면부터 서버 계약, 파이프라인 연동, 인프라까지 — 백오피스 어드민 풀스택. 한솔그룹 13개 계열사 1만 명 사내 AI(LLM) 서비스에서 미터링·과금 백오피스의 RESTful API를 직접 설계·구현. 조회 750배↑ · 리렌더 99.6%↓ · 도커 이미지 50%↓.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e4fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// applied before paint: stored choice > system preference > light (design default)
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="antialiased">
        <div className="blob blob-1" aria-hidden />
        <div className="blob blob-2" aria-hidden />
        <div className="blob blob-3" aria-hidden />
        <ParticleBackground />
        <CursorGlow />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
