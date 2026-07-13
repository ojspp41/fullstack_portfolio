---
id: profile
section: hero
name: 오준석 (Oh Junseok)
role: Full-Stack Engineer · AI / LLM Application
email: ojspp000@naver.com
phone: 010-7593-4447
github: https://github.com/ojspp41
website: https://portfolio-nextjs-puce-pi.vercel.app
tagline: 문제를 직접 정의하고 끝까지 푸는 풀스택 개발자
subtagline: 화면부터 서버 계약, 파이프라인 연동, 인프라까지 — 백오피스 어드민 풀스택
badges: ["OSSCA 2025 우수상 (장관상)", "오픈소스 개발자 대회 우수작", "정보처리기사", "OPIc IH"]
resumePdf: /junseok-oh-fullstack-portfolio.pdf
---

# 문제를 직접 정의하고 끝까지 푸는 풀스택 개발자

기획자·디자이너 없는 환경에서 사용자 문제를 직접 정의하고 끝까지 푸는 풀스택 개발자입니다.

한솔그룹 13개 계열사·1만 명 사내 AI(LLM) 서비스 **AI Atlas**에서 프론트를 오너로 구현하고, **백오피스 어드민(사용량·비용 미터링·과금)의 서버 계약(RESTful API)을 직접 설계·구현**했습니다 — 미터링 조회 API·사용 한도 제어 API·파일 미리보기 엔드포인트·서버사이드 PDF 캡처까지.

그 프론트가 붙는 Go 기반 중앙 API Gateway(gRPC·Kafka·Redis·MinIO)는 설계 의도를 이해하고 연동했습니다. 화면부터 서버 계약까지 직접 설계하며, 모든 결정을 수치로 증명합니다.

## 핵심 지표 (Hero Stats)

| 지표 | 값 | 설명 |
|---|---|---|
| 서비스 규모 | 1만 명 | 한솔그룹 13개 계열사 사내 LLM 서비스 |
| 리렌더 | 99.6%↓ | 응답 폭주 시, React Profiler 실측 |
| 수상 | 장관상 | 과학기술정보통신부 · Githru 오픈소스 |
| 상용 서비스 | 2,000명 | COMAtching · 매출 800만원 |
| 조회 속도 | 750배↑ | 미터링 1,970ms → 2.6ms (사전집계) |
| 도커 이미지 | 50%↓ | 3.63GB → 1.82GB, 숨은 회귀 1.56GB 적발 |

## Full-Stack Coverage Map

| 레이어 | 직접 구현 | 설계 이해·연동 |
|---|---|---|
| UI | 스트리밍 마크다운 파서 · Generative UI · WebSocket 6단계 방어 · RBAC can() · 백오피스 대시보드 | — |
| API · 서버 계약 | 미터링 조회 · 사용 한도 제어 · 파일 미리보기 엔드포인트 · PDF 캡처 · ExcelJS 스트리밍 | permission.go (멀티소스 SSOT) |
| 데이터 · 파이프라인 | COMAtching MySQL 스키마·조인·인덱스 | Kafka 인입 · 일배치 사전집계 · SCD-2 |
| 인프라 | Docker 이미지 50%↓ · 스모크 테스트 | K8s · 폐쇄망 운영 |

## Tech Stack

- **AI / LLM**: LLM Streaming · Generative UI Pipeline · RAG Integration · Markdown Parser · MCP
- **Frontend**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4
- **State / RT**: Zustand · Recoil · TanStack Query · WebSocket / STOMP · EventBus
- **Backend**: Go 1.24 · Gin · gRPC · Protobuf · Kafka · MinIO · MySQL · MongoDB · Redis
- **Infra / Test**: Docker Multi-stage · Kubernetes · CI/CD · Jest · TDD · Playwright

## 강점 & 협업 역량

- **리더십** — 팀장 역임 3회 (COMAtching · Favus · 사내 CoP)
- **오너십** — 1만 명 서비스 런칭 리더
- **임팩트 정량화** — 리렌더 99.6%↓ · 도커 이미지 50%↓ · 실패율 90%↓
- **지속적 기여** — 오픈소스 컨트리뷰션 + VSCode extension 개발
