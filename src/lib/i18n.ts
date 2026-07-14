import type { Locale } from "./content";

export type { Locale };

/** UI chrome strings (content itself comes from the per-locale markdown). */
export const UI = {
  ko: {
    header: {
      email: "이메일",
      pdf: "PDF ↓",
      langSwitch: "EN",
      langSwitchHref: "/en",
      langSwitchAria: "Switch to English",
    },
    hero: {
      greeting: "안녕하세요, 저는",
      name: "오준석",
      nameSuffix: " 입니다",
      typewriter: [
        "풀스택 개발자",
        "백오피스 어드민 빌더",
        "AI / LLM 애플리케이션 개발자",
        "측정으로 증명하는 엔지니어",
      ],
      ctaProjects: "프로젝트 보기",
      ctaCoverage: "Coverage Map",
    },
    sections: {
      range: {
        index: "01",
        label: "Full-Stack Range",
        title: "화면부터 파이프라인까지, 담당 범위를 그대로",
        sub: "직접 구현한 것과 설계를 이해하고 연동한 것을 구분해서 보여드립니다. 노드를 선택하면 관련 심층분석으로 연결됩니다.",
      },
      coverage: "Coverage Map — 레이어별 담당 범위",
      about: "About",
      stack: "Tech Stack",
      strengths: "Strengths",
      deepDives: {
        index: "02",
        label: "Deep Dives",
        title: (n: number) => `심층분석 ${n}건 — 모든 결정을 수치로`,
        sub: "카드를 클릭하면 상황 → 과제 → 행동 → 결과(STAR) 전체와 측정 데이터를 볼 수 있습니다.",
      },
      career: { index: "03", label: "Career", title: "경력" },
      openSource: { index: "04", label: "Open Source", title: "오픈소스 & 사이드 프로젝트" },
      contact: { index: "05", label: "Contact", title: "연락하기" },
    },
    projects: {
      filterAll: "전체",
      cardHint: "STAR 전문·측정 과정 →",
      close: "닫기",
      filterAria: "프로젝트 카테고리 필터",
    },
    diagram: {
      direct: "직접 구현",
      integrated: "설계 이해 · 연동",
      legendHint: "— 노드를 선택하면 관련 프로젝트로 연결됩니다",
      readout: "READOUT",
      readoutHint: "— 노드를 선택하면 담당 범위와 관련 심층분석이 표시됩니다.",
    },
    coverageMap: { layer: "Layer", direct: "직접 구현", integrated: "설계 이해 · 연동" },
    timeline: {
      backoffice: "AI Atlas · 운영·관리자 (백오피스 어드민)",
      expandOverview: "AI Atlas · 프로젝트 개요 펼치기",
    },
    sideProjects: { awards: "Awards — 수상 내역", ai: "AI 활용 경험" },
    footer: { pdf: "풀스택 포트폴리오 PDF ↓", note: "measured, not claimed." },
  },
  en: {
    header: {
      email: "Email",
      pdf: "PDF ↓",
      langSwitch: "한국어",
      langSwitchHref: "/",
      langSwitchAria: "한국어로 전환",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Junseok Oh",
      nameSuffix: "",
      typewriter: [
        "Full-Stack Developer",
        "Back-Office Admin Builder",
        "AI / LLM Application Engineer",
        "an engineer who proves it with measurements",
      ],
      ctaProjects: "View Projects",
      ctaCoverage: "Coverage Map",
    },
    sections: {
      range: {
        index: "01",
        label: "Full-Stack Range",
        title: "From the screen to the pipeline — my exact scope",
        sub: "What I built directly vs. what I understood and integrated with, clearly separated. Select a node to jump to the related deep dive.",
      },
      coverage: "Coverage Map — ownership by layer",
      about: "About",
      stack: "Tech Stack",
      strengths: "Strengths",
      deepDives: {
        index: "02",
        label: "Deep Dives",
        title: (n: number) => `${n} deep dives — every decision, measured`,
        sub: "Click a card for the full Situation → Task → Action → Result write-up with measurement data.",
      },
      career: { index: "03", label: "Career", title: "Experience" },
      openSource: { index: "04", label: "Open Source", title: "Open Source & Side Projects" },
      contact: { index: "05", label: "Contact", title: "Get in Touch" },
    },
    projects: {
      filterAll: "All",
      cardHint: "Full STAR + measurements →",
      close: "Close",
      filterAria: "Project category filter",
    },
    diagram: {
      direct: "Built directly",
      integrated: "Understood & integrated",
      legendHint: "— select a node to jump to the related projects",
      readout: "READOUT",
      readoutHint: "— select a node to see its scope and related deep dives.",
    },
    coverageMap: { layer: "Layer", direct: "Built directly", integrated: "Understood & integrated" },
    timeline: {
      backoffice: "AI Atlas · Operations & Admin (Back-Office)",
      expandOverview: "AI Atlas · Expand project overview",
    },
    sideProjects: { awards: "Awards", ai: "AI Experience" },
    footer: { pdf: "Full-Stack Portfolio PDF ↓", note: "measured, not claimed." },
  },
} as const;

export type UIDict = (typeof UI)[Locale];
