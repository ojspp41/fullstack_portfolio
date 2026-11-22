---
{
  "id": "profile",
  "section": "hero",
  "name": "오준석 (Oh Junseok)",
  "role": "풀스택 개발자",
  "email": "ojspp000@naver.com",
  "phone": "010-7593-4447",
  "github": "https://github.com/ojspp41",
  "website": "https://fullstack-portfolio-omega-one.vercel.app",
  "tagline": "생성형 AI를 실제 업무에서 사용할 수 있도록 제품화합니다",
  "subtagline": "화면·API·권한·Agent·데이터·테스트·배포·운영까지 담당 범위를 넓혀왔습니다",
  "badges": [
    "OSSCA 2025 우수상 (장관상)",
    "정보처리기사",
    "OPIc IH"
  ]
}
---

# AI를 실제 서비스로 제품화하는 개발자

생성형 AI를 실제 업무에서 사용할 수 있도록 제품화하는 풀스택 개발자입니다. 13개 계열사 약 1만 명 대상 사내 LLM 플랫폼에서 화면 개발로 시작해 미터링·사용 한도·권한·공유 API, 데이터 집계, 테스트, 배포와 운영까지 담당 범위를 확장했습니다.

기업용 AI Agent 안전성 검증 솔루션과 온프레미스 sLLM·MES MCP 기반 생산 리포팅 Agent를 개발했습니다.

## 핵심 지표

| 지표 | 값 | 설명 |
|---|---|---|
| 서비스 규모 | 1만 명 | 13개 계열사 약 1만 명 대상 AI 플랫폼 제품화·개발 |
| 미터링 조회 | 597× | 사용자 요약 조회 · 95백분위 · 합성 원본 100만 건 |
| 리렌더 | 99.6%↓ | 과거 고정 폭주 입력의 React Profiler 기록 |
| 수상 | 장관상 | 과학기술정보통신부 · Githru |
| 상용 서비스 | 2,000명 | COMAtching · 매출 800만원 |

## Full-Stack Coverage Map

| 레이어 | 직접 구현 | 설계 이해·연동 |
|---|---|---|
| 사용자 화면과 파일 미리보기 | 채팅 답변을 도착하는 대로 보여주고, 파일을 내려받지 않고 열어 보는 화면을 만들었습니다. | 기존 문서 처리 시스템에서 받은 진행 상태와 미리보기용 PDF를 화면에 연결했습니다. |
| 권한과 조직 간 공유 | 다른 조직에 AI 에이전트를 공유할 때 승인을 받고, 실행할 때도 권한을 다시 확인하도록 구현했습니다. | 중앙 API 서버의 공통 인증과 서비스 간 통신을 사용했습니다. |
| 오류 제보와 Jira 등록 | 직원의 제보 화면과 관리자 보드를 만들고, 관리자가 선택한 건을 Jira로 보내는 API를 구현했습니다. | 사진은 비공개 저장소에 보관하고, Atlassian MCP를 통해 Jira 티켓에 첨부했습니다. |
| 업무용 AI 에이전트 | 제조 보고서에서는 생산 수치를 이전 기간과 비교해 보여줬습니다. 별도 안전성 검사 도구에서는 검사 결과와 위험 판정 화면을 만들었습니다. | 사내 언어 모델을 제조 시스템의 읽기 전용 조회 도구와 연결했습니다. |
| 사용량 데이터와 비용 | 조직별 사용량을 한 번에 조회하는 API와 비용 대시보드, 엑셀 내보내기를 만들었습니다. | Kafka로 수집한 사용량, 일별 집계, 가격과 환율 이력을 비용 조회에 연결했습니다. |
| 빌드와 배포 | Docker 이미지에서 실행에 불필요한 의존성을 걷어 내고, 용량을 줄인 뒤 서비스가 실제로 뜨는지 확인했습니다. | 운영팀과 함께 사내 Kubernetes 환경의 실행 권한과 모니터링 설정을 맞췄습니다. |

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
- **임팩트 정량화** — 로컬 요약 조회 p95 228.665ms → 0.383ms · 로컬 Gateway 2개에서 첫 질문 복구 60/60회 · Docker 3.63GB → 1.82GB
- **안전성과 운영** — 권한·승인·감사 가능성, 정상·예외·공격 시나리오 검증
- **지속적 기여** — 오픈소스 컨트리뷰션 + VS Code Extension 개발
