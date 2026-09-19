---
id: profile
section: hero
name: 오준석 (Oh Junseok)
role: AI Product / Full-Stack Engineer
email: ojspp000@naver.com
phone: 010-7593-4447
github: https://github.com/ojspp41
website: https://fullstack-portfolio-omega-one.vercel.app
tagline: 생성형 AI를 실제 업무에서 사용할 수 있도록 제품화합니다
subtagline: 화면·API·권한·Agent·데이터·테스트·배포·운영까지 담당 범위를 넓혀왔습니다
badges: ["OSSCA 2025 우수상 (장관상)", "오픈소스 개발자 대회 우수작", "정보처리기사", "OPIc IH"]
---

# AI를 실제 서비스로 제품화하는 개발자

생성형 AI를 실제 업무에서 사용할 수 있도록 제품화하는 AI Product / Full-Stack Engineer입니다. 13개 계열사 약 1만 명이 사용하는 사내 LLM 플랫폼에서 화면 개발로 시작해 미터링·사용 한도·권한·공유 API, 데이터 집계, 테스트, 배포와 운영까지 담당 범위를 확장했습니다.

기업용 AI Agent 안전성 검증 솔루션과 온프레미스 sLLM·MES MCP 기반 생산 리포팅 Agent를 개발했으며, AI를 개발·QA·문서·운영 프로세스에도 적용해 반복 업무와 품질 관리 방식을 개선하고 있습니다.

## 핵심 지표

| 지표 | 값 | 설명 |
|---|---|---|
| 서비스 규모 | 1만 명 | 13개 계열사 약 1만 명 대상 AI 플랫폼 제품화·개발 |
| 미터링 조회 | 750× | 조회시간 1,970ms → 2.6ms · 300만 건 재현 데이터 |
| 리렌더 | 99.6%↓ | 응답 폭주 시, React Profiler 실측 |
| 수상 | 장관상 | 과학기술정보통신부 · Githru |
| 상용 서비스 | 2,000명 | COMAtching · 매출 800만원 |

## Full-Stack Coverage Map

| 레이어 | 직접 구현 | 설계 이해·연동 |
|---|---|---|
| UI | 백오피스 대시보드·조회 훅·ExcelJS · 조직별 공유 화면 · 파일 렌더 3층 · Generative UI · WebSocket 방어 · 스트리밍 마크다운 파서 · RAG 처리·청킹·임베딩 상태 시각화 | RAG 처리 파이프라인 연동 |
| API · 서버 계약 | 미터링 조회·비교 · 사용 한도 제어 · 타 조직 승인·실행 재인가·회수 · 파일 미리보기 엔드포인트 | 중앙 Gateway의 공통 gRPC·Protobuf 기반 |
| AI · Agent | 신호등 에이전트 검사·결과 UI·비동기 검사 API · 결정론적 위험 판정 · MES MCP 읽기 전용 조회·기간 비교·HTML 리포트 | 온프레미스 sLLM 적용 · MES·MS-SQL 시스템 연계 |
| 데이터 · 파이프라인 | 미터링 Kafka 인입·실패 처리 · 일배치·복합 키 upsert · 가격·환율 이력 관리 · 공유 Outbox 수렴 · COMAtching MySQL 스키마·조인·인덱스 | 공통 Kafka 기반 · 파싱엔진 PDF 선생성 연동 |
| 테스트 · 인프라 | Docker 멀티스테이지·standalone · Non-root APM 권한 해결 · Jest·Go Test·Playwright · 배포·스모크 테스트 | Kubernetes·운영팀 협업 · 공통 인증·저장소 환경 |

## Tech Stack

- **AI / Agent**: LLM Application · Generative UI · MCP · AI Agent · RAG Integration · LLM Streaming · Markdown Parser
- **Frontend**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4
- **State / RT**: Zustand · Recoil · TanStack Query · WebSocket / STOMP · EventBus
- **Backend**: Go / Gin · Python / FastAPI · Node.js · Java / Spring Boot · gRPC · Protobuf
- **Data / Infra**: MySQL · MongoDB · Redis · Kafka · MinIO · Docker Multi-stage
- **Test / Automation**: Jest · Go Test · Playwright · CI/CD · Smoke Test
- **경험 환경**: Keycloak · Kubernetes — 공통 인증·인프라와 연동·협업한 범위이며 전체 설계·구축 경험과 구분합니다.

## 강점 & 협업 역량

- **리더십** — 팀장 역임 3회(COMAtching · Favus · 사내 CoP)
- **제품화** — 13개 계열사 약 1만 명 대상 AI 플랫폼 제품화·개발, 입사 후 6개월 안에 팀과 함께 첫 출시
- **임팩트 정량화** — 조회시간 1,970ms → 2.6ms · 리렌더 99.6%↓ · Docker 3.63GB → 1.82GB
- **안전성과 운영** — 권한·승인·감사 가능성, 정상·예외·공격 시나리오 검증
- **지속적 기여** — 오픈소스 컨트리뷰션 + VS Code Extension 개발
