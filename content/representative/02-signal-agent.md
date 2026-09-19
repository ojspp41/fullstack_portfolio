---
id: signal-agent
order: 2
eyebrow: Agent Safety · 한솔그룹 AX 프로젝트
title: 신호등 에이전트 — 기업용 AI Agent 안전성 검증
summary: 기업용 AI Agent를 업무에 적용하기 전에 권한·민감정보·승인 절차·프롬프트 인젝션 위험을 분석하고 초록·노랑·빨강 단계로 판정하는 풀스택 검증 플랫폼입니다.
stack: [React, TypeScript, TanStack Query, Node.js, Clean Architecture, AI Agent, Human-in-the-loop, JSON / PDF Report]
metrics:
  - label: 업무별 품질 프리셋
    value: 4개
  - label: 평가 시나리오
    value: 주요 위험 10개
    note: 공격 페르소나 8개 · 방어 페르소나 5개
decision: 최종 신호등 판정은 LLM이 아니라 결정론적 규칙이 수행합니다.
---

### 검사부터 결과와 이력까지

- **Frontend** — 검사 생성·파일/저장소 입력·진행 상태·신호등 판정·Risk Graph·개선안·검사 이력 화면을 React·TypeScript·TanStack Query로 구현했습니다.
- **Backend** — Node.js·TypeScript·Clean Architecture 기반으로 파일/ZIP 입력, 공개 GitHub/GitLab 저장소 검사, 비동기 검사 상태, 결과/이력 API, JSON/PDF 리포트를 연결했습니다.
- **Evaluation** — 업무별 품질 프리셋 4개, 공격 페르소나 8개, 방어 페르소나 5개, 주요 위험 시나리오 10개로 검사 관점을 구분했습니다.

### 규칙의 판정과 LLM의 탐색을 분리

LLM은 정상 테스트가 놓치기 쉬운 위험 시나리오를 확장하는 역할로 제한했습니다. 외부 모델에는 원본 전체가 아니라 비식별화·최소화한 정보만 전달합니다.

사람 승인·민감정보 마스킹·감사 로그·중복 실행 방지·비신뢰 입력 격리·출력 경로 제한을 통제 요구사항으로 다뤘습니다. Agent의 성능뿐 아니라 안전성·권한·감사 가능성·재현성까지 제품 요구사항에 포함한 경험입니다.

한솔그룹 AX 프로젝트에서 수행한 개발 활동입니다. 검증 결과는 정의한 검사 범위에 한정하며 모든 위험을 탐지한다는 보장과 구분합니다.
