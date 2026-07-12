import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const TITLE = "오준석 — 문제를 직접 정의하고 끝까지 푸는 풀스택 개발자";
const DESCRIPTION =
  "한솔그룹 1만 명 사내 AI 서비스 'AI Atlas' 프론트 오너 · Go Gateway 미터링/한도 API 직접 구현. 리렌더 99.6%↓, 조회 750배↑, 과기정통부 장관상 — 모든 결정을 수치로 증명합니다.";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${jetbrainsMono.variable} dark`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
