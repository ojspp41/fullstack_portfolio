import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";
import { siteUrl } from "@/lib/site-url";

const TITLE = "오준석 — AI Product / Full-Stack Engineer";
const DESCRIPTION =
  "생성형 AI를 실제 서비스로 제품화하는 AI Product / Full-Stack Engineer. 13개 계열사 약 1만 명의 AI Atlas, 신호등 에이전트 안전성 검증, On-Prem sLLM × MES MCP 생산 리포팅, AI 개발·검증·배포 폐루프와 여섯 기술 심층 분석.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
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
