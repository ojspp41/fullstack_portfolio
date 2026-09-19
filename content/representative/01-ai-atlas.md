---
id: ai-atlas
order: 1
eyebrow: Enterprise AI · 한솔PNS AI개발팀
title: AI Atlas — 1만 명 엔터프라이즈 AI 플랫폼
summary: 13개 계열사 약 1만 명이 사용하는 사내 LLM·RAG 플랫폼에서 AI UX부터 API·권한·미터링·파일·배포·운영까지 담당 범위를 확장한 Full-Stack 경험입니다.
stack: [React, TypeScript, Python / FastAPI, Go, Kafka, Redis, MongoDB, Docker]
metrics:
  - label: 사용자 규모
    value: 약 1만 명 · 13개 계열사
  - label: 첫 출시
    value: 입사 후 6개월 안에
    note: 팀과 함께 제품화·개발
decision: 프론트엔드 오너로 화면을 구현하고, 직접 담당한 Backend/API·권한 로직과 미터링 파이프라인을 연결했습니다.
link:
  label: 기존 6개 기술 심층 분석 보기
  href: "#projects"
---

### 화면에서 운영까지 넓힌 담당 범위

- **Frontend** — Chat·Agent·Generative UI·WebSocket, 관리자 백오피스, 파일 미리보기, RAG 처리 과정 및 청킹·임베딩 상태의 사용자 화면 시각화. Generative UI 폼에서 Jira 티켓을 생성하는 VOC Agent도 개발했습니다.
- **Backend / API** — Python/FastAPI·Go를 활용한 미터링 조회·사용 한도·리소스 권한·공유 API. Go Gateway에서는 직접 담당한 일부 기능을 구현했습니다.
- **Enterprise** — 다중 조직 RBAC의 read / execute / write / share 경계, Agent 공유 승인·회수·실행 재인가.
- **Data / Operation** — Kafka·Redis·MongoDB 환경에서 미터링 인입·일별 사전집계·가격 및 환율 이력 관리, Docker, 테스트·배포·Smoke Test, 운영 자동화.

입사 후 6개월 안에 팀과 함께 13개 계열사 약 1만 명 대상 첫 출시를 진행했습니다. 전체 플랫폼이나 공통 인프라를 혼자 개발한 경험으로 표현하지 않습니다. RAG 청킹 알고리즘·임베딩 모델·Vector DB 구축이 아니라 처리 상태를 사용자에게 보여주는 UX와 연동을 담당했습니다.

### 유지한 기술 심층 분석

사용량·비용 미터링, 다중 조직 Agent 공유, 파일 인앱 미리보기, Generative UI JSON 복구, WebSocket 실시간 안정성, Docker 이미지 최적화의 구현·검증·한계를 별도로 공개합니다.
