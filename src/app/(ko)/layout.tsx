import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";

const TITLE = "오준석 — Full-Stack Engineer · AI / LLM Application";
const DESCRIPTION =
  "화면부터 서버 계약, 파이프라인 연동, 인프라까지 — 백오피스 어드민 풀스택. 한솔그룹 13개 계열사 1만 명 사내 AI(LLM) 서비스에서 미터링·과금 백오피스의 RESTful API를 직접 설계·구현. 조회 750배↑ · 리렌더 99.6%↓ · 도커 이미지 50%↓.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { languages: { ko: "/", en: "/en" } },
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

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ko">{children}</RootShell>;
}
