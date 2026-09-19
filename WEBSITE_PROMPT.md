# 포트폴리오 웹사이트 제작 프롬프트

> 아래 프롬프트를 Claude Code / Cursor 등에 그대로 붙여넣고, `content/` 폴더를 프로젝트 루트에 함께 두세요.

---

## 프롬프트 (복사해서 사용)

Next.js 15 (App Router) + TypeScript(strict) + Tailwind v4의 기존 **AI Product / Full-Stack Engineer 원페이지 포트폴리오**를 유지·확장한다. 화면·API·권한·Agent·데이터·테스트·배포·운영까지 AI를 실제 서비스로 제품화한 경험을 보여준다. 특정 기업 지원용 문구를 넣지 않고 기존 색상·타이포그래피·모션·상세 UI를 유지한다.

### 콘텐츠 소스 (중요)
- 모든 내용은 `content/` 폴더의 마크다운 파일에서 읽는다. 하드코딩 금지.
- `content/sections/profile.md` — 히어로·About·스택·강점
- `content/sections/experience.md` — 경력(한솔 PNS·PTKOREA)·학력·활동
- `content/projects/*.md` — 공개 심층분석 6개. frontmatter에 `id, order, published, title, category(fullstack|frontend|infra), badge, stack[], metrics[], summary, measurement`가 있다. 비공개 파일은 보관한다.
- `content/representative/*.md` — AI Atlas·신호등 에이전트·SLP 제조 AX·AI 활용 개발 시스템.
- `content/workflow/*.md` — 개발·검증·배포 폐루프, 재사용 AI Skill 36개, 활용 콘텐츠, 운영 주간보고 자동화.
- `content/en/` — 동일한 사실관계·담당 범위·측정 경계를 유지한 영어판.
- `content/sections/side-projects.md` — 오픈소스·사이드 프로젝트·수상
- gray-matter로 frontmatter 파싱 + 서버 컴포넌트에서 빌드 타임에 읽고, 본문은 마크다운 렌더러(react-markdown + remark-gfm, 표 지원 필수)로 렌더.

### 페이지 구조 (원페이지, 스크롤 내비)
1. **Hero** — 이름·AI Product / Full-Stack Engineer·태그라인·지표 4개(1만 명 / 미터링 조회 750× / 장관상 / 상용 서비스 2,000명). 기존 카운트업 유지.
2. **Representative Experience** — About과 대표 경험 4개. 요약 → 핵심 수치 → 접힌 상세 순서. 신호등 에이전트는 규칙 기반 판정, SLP는 읽기 전용 MES MCP 기반 생산 리포팅으로 표현.
3. **Career** — 한솔PNS → PTKOREA 타임라인과 기존 수상 4개. 팀과 함께 입사 후 6개월 안에 첫 출시한 범위로 표현.
4. **Architecture / Coverage** — 기존 인터랙티브 다이어그램과 담당 범위 표. 직접 구현 / 설계 이해·연동 구분. RAG는 처리 상태 UX, 공통 인프라는 연동 범위임을 명확히 한다.
5. **Technical Deep Dive** — 미터링 → 다중 조직 Agent 공유 → 파일 인앱 미리보기 → Generative UI → WebSocket → Docker. 필터·모달·딥링크·측정 조건·한계 유지.
6. **AI-Native Development Workflow** — 네 가지 축의 요약·성과·상세. 코드가 계산·검증하고 AI는 분석·설명을 작성하는 역할 구분.
7. **Product & Open Source** — COMAtching → Githru → Favus → 부천FC. 상용 서비스·외부 코드베이스 협업·장애 복구 등 개발 기본기 유지.
8. **Contact / Footer** — 이메일·GitHub. 최신 일치가 확인되지 않은 PDF 다운로드 버튼은 숨긴 상태 유지.

### 인터랙션 & 모션
- 스크롤 진행 인디케이터 + 우측 고정 섹션 도트 내비
- 섹션별 스크롤 트리거 리빌(IntersectionObserver, 과하지 않게 1회성)
- 프로젝트 카드 hover 시 metrics 칩 강조
- `prefers-reduced-motion` 존중, 모바일 반응형 필수
- Lighthouse 성능을 의식해 이미지·모션 최소화 (이 자체가 포트폴리오 어필 포인트)

### 디자인 방향
- 흔한 AI 생성 룩(크림 배경 + 세리프 + 테라코타 / 검정 배경 + 형광 그린) 피할 것.
- 기존 파스텔 배경·인디고 포인트·둥근 카드·Pretendard·JetBrains Mono·Lottie를 유지한다. 기본은 라이트이며 다크 전환을 지원한다. 대표 경험은 기존 카드와 native details로 추가하고, 동작 흐름은 줄바꿈 가능한 작은 Flow UI로 보여준다.
- 시그니처는 2번 섹션의 아키텍처 다이어그램 하나에 집중하고 나머지는 절제.

### 기술 요건
- 컴포넌트: `Hero, ArchitectureDiagram, ProjectFilter, ProjectCard, ProjectDetail(모달), Timeline, MetricCounter, SectionNav`
- md 추가만으로 프로젝트가 늘어나는 구조 (frontmatter 스키마 zod 검증이면 더 좋음)
- 라이트 기본 / 다크 전환, SEO 메타 + OG 태그, Vercel 배포 가능하게

기존 디자인 토큰과 인터랙티브 아키텍처를 유지한다. 변경 후 `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`를 실행하고 한국어·영어, 데스크톱·모바일, 필터·펼치기·모달·딥링크를 검증한다.

---

## md 파일 배치

```
project-root/
├─ content/
│  ├─ sections/
│  │  ├─ profile.md
│  │  ├─ experience.md
│  │  └─ side-projects.md
│  ├─ representative/            (대표 경험 4개)
│  ├─ workflow/                  (개발·QA·문서·운영 4개)
│  ├─ en/                        (한국어와 같은 구조의 영어판)
│  └─ projects/
│     ├─ 01-metering-backoffice.md   (fullstack)
│     ├─ 02-file-preview.md          (fullstack)
│     ├─ 03-pdf-invoice.md           (fullstack)
│     ├─ 04-websocket-defense.md     (frontend)
│     ├─ 05-generative-ui.md         (frontend)
│     ├─ 06-rbac.md                  (frontend·FE/BE 경계)
│     ├─ 07-markdown-parser.md       (frontend)
│     ├─ 08-file-upload.md           (frontend)
│     └─ 09-dockerfile.md            (infra)
└─ src/ ...
```

## 팁

- frontmatter의 `metrics` 배열이 카드 칩과 Hero 카운터의 데이터 소스가 되도록 하면 md만 고쳐도 수치가 반영됩니다.
- 공개 프로젝트는 `published: true`만 표시하며 타 조직 Agent 공유 파일 `10-cross-org-agent-sharing.md`를 포함한다. 기존 PDF 인보이스·RBAC·마크다운 파서·업로드 상세는 비공개 보관한다.
- 방문자 동선: Hero → 대표 경험 → 관심 있는 기술 상세 / AI 개발 방식. 필터 기본값은 '전체', 정렬은 기존 심층 분석 순서를 유지한다.
- "직접 구현 / 설계 이해·연동" 구분을 시각 요소(배지 2색)로 일관되게 노출하면 정직함 자체가 강점이 됩니다.
