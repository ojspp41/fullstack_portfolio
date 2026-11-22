import type { Locale } from "./content";

export type { Locale };

/** UI chrome strings (content itself comes from the per-locale markdown). */
export const UI = {
  ko: {
    header: {
      email: "이메일",
      navigation: "섹션 내비게이션",
      lightTheme: "라이트 모드로 전환",
      darkTheme: "다크 모드로 전환",
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
        "화면에서 API·권한까지",
        "LLM에서 업무 시스템까지",
        "테스트에서 배포·운영까지",
      ],
      ctaProjects: "프로젝트 보기",
      ctaCases: "기술 사례 보기",
    },
    sections: {
      representative: {
        index: "03", label: "Selected Projects", title: "AI 기능을 실제 서비스로",
      },
      workflow: {
        index: "05", label: "AI-Native Development Workflow", title: "AI를 서비스뿐 아니라 개발 방식에도 내재화",
        sub: "개발·QA·문서·운영의 반복 작업을 재사용 가능한 절차로 만들고, 실패 증거를 다음 작업의 입력으로 남깁니다.",
      },
      workflowPrinciple: "재현성이 필요한 판단은 코드와 규칙으로 확정하고, AI는 사람이 검증할 수 있는 분석·설명 영역에 활용합니다.",
      about: "About",
      deepDives: {
        index: "04",
        label: "Deep Dives",
        title: (n: number) => `핵심 기술 사례 ${n}건 — 구현과 검증`,
        sub: "구조 그림 → 문제·목표 → 해결 과정 → 결과 순서로 읽을 수 있습니다. 담당 범위와 측정 조건도 함께 표시했습니다.",
      },
      career: { title: "경력", details: "경력 상세 · 학력 · 수상 보기" },
      openSource: { index: "06", label: "Product & Open Source", title: "제품 운영의 기본기와 오픈소스 기여" },
      contact: { index: "07", label: "Contact", title: "연락하기" },
      disclosure: "사내 보안 정책에 따라 실제 서비스 UI·데이터·내부 코드는 공개하지 않습니다. 기술 구조·담당 범위·재현 가능한 측정 결과를 중심으로 재구성했습니다.",
    },
    projects: {
      filterAll: "전체",
      cardHint: "구현·검증·한계 보기 →",
      close: "닫기",
      filterAria: "프로젝트 카테고리 필터",
    },
    features: { details: "구현 범위·설계 판단 펼치기", flow: "동작 흐름", stack: "사용 기술" },
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
      navigation: "Section navigation",
      lightTheme: "Switch to light mode",
      darkTheme: "Switch to dark mode",
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
        "From UI to APIs and Permissions",
        "From LLMs to Enterprise Systems",
        "From Tests to Deployment and Operations",
      ],
      ctaProjects: "View Projects",
      ctaCases: "View case studies",
    },
    sections: {
      representative: {
        index: "03", label: "Selected Projects", title: "From AI features to working products",
      },
      workflow: {
        index: "05", label: "AI-Native Development Workflow", title: "AI in the product and in the way I build it",
        sub: "Reusable procedures for development, QA, documentation, and operations. Evidence from failures becomes input for the next task.",
      },
      workflowPrinciple: "Code and deterministic rules settle reproducible decisions. AI supports analysis and explanations that people can verify.",
      about: "About",
      deepDives: {
        index: "04",
        label: "Deep Dives",
        title: (n: number) => `${n} core case studies — implementation & verification`,
        sub: "Read each case as architecture → problem/goal → actions → results, with implementation scope and measurement conditions.",
      },
      career: { title: "Career", details: "Career details, education and awards" },
      openSource: { index: "06", label: "Product & Open Source", title: "Product operations and open-source contributions" },
      contact: { index: "07", label: "Contact", title: "Get in Touch" },
      disclosure: "Internal service UI, data, and source code are not public. Technical structures, ownership, and reproducible measurements have been reconstructed under company security policies.",
    },
    projects: {
      filterAll: "All",
      cardHint: "Implementation, evidence & limits →",
      close: "Close",
      filterAria: "Project category filter",
    },
    features: { details: "Implementation scope & decisions", flow: "Process flow", stack: "Technologies used" },
    timeline: {
      backoffice: "AI Atlas · Operations & Admin (Back-Office)",
      expandOverview: "AI Atlas · Expand project overview",
    },
    sideProjects: { awards: "Awards", ai: "AI Experience" },
    footer: { pdf: "Full-Stack Portfolio PDF ↓", note: "measured, not claimed." },
  },
} as const;

export type UIDict = (typeof UI)[Locale];
