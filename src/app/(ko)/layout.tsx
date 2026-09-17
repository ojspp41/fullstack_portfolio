import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";

const TITLE = "오준석 — Full-Stack Engineer · AI / LLM Application";
const DESCRIPTION =
  "한솔그룹 13개 계열사·1만 명 사내 LLM 서비스 AI Atlas의 프론트 오너. Go Gateway 일부와 미터링 파이프라인 직접 구현. 미터링·타 조직 Agent 공유·파일 미리보기·Generative UI·WebSocket·Docker의 여섯 기술 사례와 검증 결과.";

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
