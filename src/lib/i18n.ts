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
        "화면부터 서버 계약까지",
        "AI / LLM 애플리케이션 개발자",
        "측정으로 증명하는 엔지니어",
      ],
      ctaProjects: "프로젝트 보기",
      ctaCoverage: "Coverage Map",
    },
    sections: {
      architecture: {
        index: "02",
        label: "Architecture",
        title: "화면부터 파이프라인까지, 담당 범위를 그대로",
        sub: "직접 구현한 것과 설계를 이해하고 연동한 것을 구분해서 보여드립니다. 노드를 선택하면 관련 심층분석으로 연결됩니다.",
      },
      coverage: "Coverage Map — 레이어별 담당 범위",
      about: "About",
      stack: "Tech Stack",
      strengths: "Strengths",
      deepDives: {
        index: "03",
        label: "Deep Dives",
        title: (n: number) => `핵심 기술 사례 ${n}건 — 구현과 검증`,
        sub: "카드를 열면 문제·선택·구현·결과·현재 한계를 볼 수 있습니다. 측정 조건은 각 사례에 함께 표시했습니다.",
      },
      career: { index: "01", label: "Career", title: "경력" },
      openSource: { index: "04", label: "Open Source", title: "오픈소스 & 사이드 프로젝트" },
      contact: { index: "05", label: "Contact", title: "연락하기" },
      disclosure: "사내 보안 정책에 따라 실제 서비스 UI·데이터·내부 코드는 공개하지 않습니다. 기술 구조·담당 범위·재현 가능한 측정 결과를 중심으로 재구성했습니다.",
    },
    projects: {
      filterAll: "전체",
      cardHint: "구현·검증·한계 보기 →",
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
        "From UI to Server Contracts",
        "AI / LLM Application Engineer",
        "An Engineer Who Measures",
      ],
      ctaProjects: "View Projects",
      ctaCoverage: "Coverage Map",
    },
    sections: {
      architecture: {
        index: "02",
        label: "Architecture",
        title: "From the screen to the pipeline — my exact scope",
        sub: "What I built directly vs. what I understood and integrated with, clearly separated. Select a node to jump to the related deep dive.",
      },
      coverage: "Coverage Map — ownership by layer",
      about: "About",
      stack: "Tech Stack",
      strengths: "Strengths",
      deepDives: {
        index: "03",
        label: "Deep Dives",
        title: (n: number) => `${n} core case studies — implementation & verification`,
        sub: "Open a case for the problem, decisions, implementation, results, and current limitations. Measurement scope is shown alongside each result.",
      },
      career: { index: "01", label: "Career", title: "Experience" },
      openSource: { index: "04", label: "Open Source", title: "Open Source & Side Projects" },
      contact: { index: "05", label: "Contact", title: "Get in Touch" },
      disclosure: "Internal service UI, data, and source code are not public. Technical structures, ownership, and reproducible measurements have been reconstructed under company security policies.",
    },
    projects: {
      filterAll: "All",
      cardHint: "Implementation, evidence & limits →",
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
