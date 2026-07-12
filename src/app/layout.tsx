import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
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
    { media: "(prefers-color-scheme: light)", color: "#f3f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1014" },
  ],
};

// applied before paint: stored choice > system preference > dark (design default)
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
