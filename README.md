# 오준석 · 풀스택 개발자

화면·API·권한·데이터 조회·테스트·배포를 연결한 경험을 정리한 포트폴리오입니다.

**[포트폴리오 웹사이트](https://fullstack-portfolio-omega-one.vercel.app/)** · **[English](https://fullstack-portfolio-omega-one.vercel.app/en)** · **[GitHub](https://github.com/ojspp41)**

상세 사례는 제출용 포트폴리오 PDF의 **아키텍처 → 문제·목표 → 해결 과정 → 결과** 순서로 작성했습니다. 각 페이지에 담당 범위·측정 조건·현재 한계를 함께 표시합니다. 구조 그림을 선택하면 원본 크기로 열 수 있습니다.

## 기술 사례 8개

| 사례 | 핵심 내용 | 상세 |
|---|---|---|
| SLP · MES 생산 리포팅 Agent | 읽기 전용 MCP 조회·기간 비교·근거와 HTML 보고서 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=slp-reporting) |
| 사용량·비용 미터링 백오피스 | 조회·한도 API와 화면·Excel·인보이스 연결 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=metering) |
| 조직별 Agent 공유 | 사용자·조직·공유자별 승인·실행·회수와 Outbox | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=cross-org-sharing) |
| 파일 인앱 미리보기 | 원본/사본 통로 분리·현재 처리 세대 선택·스트리밍 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=file-preview) |
| Generative UI | 원본 우선 파싱·실패 입력 정제·위젯 오류 격리 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=generative-ui) |
| WebSocket 안정화 | 연결 생명주기·스트리밍 유지·폭주 패턴 갱신 감소 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=websocket) |
| Docker 이미지 개선 | 레이어 분석·APM 설치 분리·실제 부팅 검증 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=dockerfile) |
| 채팅 목록 조회 개선 | projection·권한 재검증·인덱스·로딩 상태 | [보기](https://fullstack-portfolio-omega-one.vercel.app/?p=session-list) |

미터링의 FE·조회·비교·한도 API와 공통 Kafka 인입·일배치·가격·환율 기반의 연동 범위를 구분했습니다. 파일 미리보기의 DRM/PDF 변환 엔진, RAG 처리 기반, 온프레미스 모델도 기존 시스템과 연동한 범위로 표시합니다. 실제 사내 UI·데이터·코드는 공개하지 않으며, 그림은 공개 설명을 위해 재구성한 자료입니다.

## AI·업무 자동화 경험 5개

1. **개발 품질 관리:** 루프 엔지니어링으로 구현·검증·실패·수정을 연결하고, 하네스 엔지니어링으로 AI 작업의 입력·도구·완료 기준·검증 규칙을 정리했습니다.
2. **운영보고:** API 수치·기간·합계는 코드로 검증하고, AI는 변화 설명을 작성합니다. 기존 기록의 생성·검증 업무는 약 2~3시간 → 10분 이내입니다.
3. **가이드·웹 문서:** 실제 화면 캡처·주석·Confluence 가이드를 AX Campus의 목차·색인·링크·이미지 참조와 연결했습니다.
4. **화면설계서·테스트케이스:** HWP 구성·테스트 작성은 AI로 보조하고 실제 실행·누락·중복·최종 문구는 직접 확인했습니다.
5. **Excel 가공·분석 지원:** AI로 코드·설명 작성을 보조하고 실제 계산·파일 출력·수치 검수는 코드와 직접 확인으로 수행했습니다.

## 경력·자격·수상

- **한솔 PNS IT · AI 개발팀:** 2025.10 — 재직 중. 13개 계열사 약 1만 명 **대상** AI Atlas의 첫 출시에 입사 후 6개월 안에 팀과 함께 기여했습니다.
- **펑타이그레이터차이나 유한회사 (PTKOREA):** 풀스택 QA 자동화 인턴 · 2025.06.23 — 2025.10.01.
- **가톨릭대학교 컴퓨터정보공학과:** 2020.03 — 2026.02 · 학점 4.05/4.5.
- 정보처리기사(2025.09.12) · OPIc IH(2025.08.28) · 컴퓨터활용능력 2급(2021.04.09) · 운전면허 1종 보통(2023.12.04).
- **수상 5개:** 학업성적우등상, 오픈소스 개발자 대회 우수작, 오픈소스 컨트리뷰션 아카데미 우수상/과학기술정보통신부 장관상, Programming 대회 은상, GGUM 해커톤 우수상. 상세 날짜는 사이트 수상 항목에 표시합니다.

## 콘텐츠 관리

- `content/sections/`: 프로필·경력·수상·사이드 프로젝트.
- `content/representative/`: 대표 경험 4개.
- `content/projects/`: 공개 기술 사례 8개와 비공개 초안. `published: true`인 파일만 표시합니다.
- `content/workflow/`: AI·업무 자동화 경험 5개.
- `content/en/`: 같은 ID와 순서를 가진 영문 콘텐츠.
- `content/diagrams/*.mmd`: 구조 그림의 Mermaid 원본.
- `public/diagrams/*.png`: PDF에서 사용한 재구성 그림.

프런트매터의 ID는 `?p=<id>` 상세 링크에 사용합니다. Markdown 본문 안의 그림은 `/diagrams/<name>.png`로 참조합니다. 로컬 절대 경로나 사내 자료 링크를 공개 본문에 넣지 않습니다.

## 로컬 실행·검증

Node.js 22.18 이상이 필요합니다. Next.js 15·React 19·TypeScript·Tailwind CSS 4·gray-matter·Zod·react-markdown을 사용합니다.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

기존 콘텐츠 검증은 양 언어의 공개 사례·순서·구조·그림 경로, 경력·수상, 검증 수치와 표현 경계를 확인합니다. 브라우저에서는 상세 링크·그림·모바일 줄바꿈·키보드 닫기를 확인합니다. 저장소의 기본 브랜치 배포는 연결된 Vercel 프로젝트를 사용합니다.
