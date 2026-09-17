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
subtagline: AI Atlas 프론트 오너 · Go Gateway 일부와 미터링 파이프라인 직접 구현
badges: ["OSSCA 2025 우수상 (장관상)", "오픈소스 개발자 대회 우수작", "정보처리기사", "OPIc IH"]
---

# 문제를 직접 정의하고 끝까지 푸는 풀스택 개발자

기획자·디자이너가 없는 환경에서 사용자 문제를 직접 정의하고, 화면부터 서버 계약까지 구현해 온 풀스택 개발자입니다. 한솔그룹 13개 계열사·1만 명 규모 사내 LLM 서비스 ‘AI Atlas’의 프론트 오너로서, Go 기반 미터링 조회·사용 한도 제어·파일 미리보기 API를 일부 직접 구현했습니다. 리렌더 99.6% 감소, Docker 이미지 50% 감소, Generative UI JSON 회복률 60%→97.5%를 측정으로 검증했습니다.

## 핵심 지표

| 지표 | 값 | 설명 |
|---|---|---|
| 서비스 규모 | 1만 명 | 한솔그룹 13개 계열사 사내 LLM 서비스 |
| 리렌더 | 99.6%↓ | 응답 폭주 시, React Profiler 실측 |
| 수상 | 장관상 | 과학기술정보통신부 · Githru |
| 상용 서비스 | 2,000명 | COMAtching · 매출 800만원 |

## Full-Stack Coverage Map

| 레이어 | 직접 구현 | 설계 이해·연동 |
|---|---|---|
| UI | 백오피스 대시보드·조회 훅·ExcelJS · 조직별 공유 화면 · 파일 렌더 3층 · Generative UI · WebSocket 방어 · 스트리밍 마크다운 파서 | RAG·청킹·임베딩 과정 시각화 |
| API · 서버 계약 | 미터링 조회·비교 · 사용 한도 제어 · 타 조직 승인·실행 재인가·회수 · 파일 미리보기 엔드포인트 | 중앙 Gateway의 공통 gRPC·Protobuf 기반 |
| 데이터 · 파이프라인 | 미터링 Kafka 인입·실패 처리 · 일배치·복합 키 upsert · 가격·환율 이력 관리 · 공유 Outbox 수렴 · COMAtching MySQL 스키마·조인·인덱스 | 공통 Kafka 기반 · 파싱엔진 PDF 선생성 연동 |
| 인프라 | Docker 멀티스테이지·standalone · Non-root APM 권한 해결 · 스모크 테스트 | Kubernetes·운영팀 협업 |

## Tech Stack

- **AI / LLM**: LLM Streaming · Generative UI Pipeline · RAG Integration · Markdown Parser · MCP
- **Frontend**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4
- **State / RT**: Zustand · Recoil · TanStack Query · WebSocket / STOMP · EventBus
- **Backend**: Go 1.24 · MySQL · MongoDB · Redis · Gin · gRPC · Protobuf · Kafka · MinIO
- **Infra / Test**: Docker Multi-stage · Kubernetes · CI/CD · Jest (TDD) · Playwright

## 강점 & 협업 역량

- **리더십** — 팀장 역임 3회(COMAtching · Favus · 사내 CoP)
- **오너십** — 1만 명 서비스 런칭 리더
- **임팩트 정량화** — 리렌더 99.6%↓ · 도커 이미지 50%↓ · 실패율 90%↓
- **지속적 기여** — 오픈소스 컨트리뷰션 + VS Code Extension 개발
