# 포트폴리오 웹사이트 제작 프롬프트

> 아래 프롬프트를 Claude Code / Cursor 등에 그대로 붙여넣고, `content/` 폴더를 프로젝트 루트에 함께 두세요.

---

## 프롬프트 (복사해서 사용)

Next.js 15 (App Router) + TypeScript(strict) + Tailwind v4로 **원페이지 풀스택 개발자 포트폴리오**를 만들어줘. 나는 오준석, "문제를 직접 정의하고 끝까지 푸는 풀스택 개발자"이고, 이 사이트 자체가 내 기술 증명이 되어야 해.

### 콘텐츠 소스 (중요)
- 모든 내용은 `content/` 폴더의 마크다운 파일에서 읽는다. 하드코딩 금지.
- `content/sections/profile.md` — 히어로·About·스택·강점
- `content/sections/experience.md` — 경력(한솔 PNS·PTKOREA)·학력·활동
- `content/projects/*.md` — 심층분석 9개. frontmatter에 `id, order, title, category(fullstack|frontend|infra), badge, stack[], metrics[], summary`가 있다.
- `content/sections/side-projects.md` — 오픈소스·사이드 프로젝트·수상
- gray-matter로 frontmatter 파싱 + 서버 컴포넌트에서 빌드 타임에 읽고, 본문은 마크다운 렌더러(react-markdown + remark-gfm, 표 지원 필수)로 렌더.

### 페이지 구조 (원페이지, 스크롤 내비)
1. **Hero** — 이름·태그라인·핵심 지표 4개(1만 명 / 리렌더 99.6%↓ / 장관상 / 조회 750배↑). 지표는 뷰포트 진입 시 카운트업.
2. **Full-Stack Range** — 이 사이트의 시그니처 섹션. FE ↔ API Gateway(Go) ↔ Pipeline(Kafka·Redis·MinIO·MongoDB)를 잇는 인터랙티브 아키텍처 다이어그램. 각 노드 hover 시 "직접 구현 / 설계 이해·연동" 배지와 관련 프로젝트로 앵커 링크. 풀스택 포지셔닝을 한눈에 증명하는 게 목적.
3. **Deep Dives (프로젝트 9개)** — 카테고리 필터 탭: `전체 / Full-Stack / Frontend / Infra`. 카드에는 title·badge·metrics 칩·summary. 카드 클릭 시 모달 또는 인라인 확장으로 md 본문 전체(STAR·표·코드블록) 렌더. **fullstack 3개(미터링·파일 미리보기·PDF 인보이스)가 기본 정렬 상단**에 오게.
4. **Experience** — 한솔 PNS(담당 범위 표 포함) → PTKOREA 인턴 타임라인.
5. **Open Source & Side Projects** — Githru·Favus·COMAtching·부천FC 카드 + 수상 배지.
6. **Contact / Footer** — 이메일·GitHub·기존 포트폴리오 링크.

### 인터랙션 & 모션
- 스크롤 진행 인디케이터 + 우측 고정 섹션 도트 내비
- 섹션별 스크롤 트리거 리빌(IntersectionObserver, 과하지 않게 1회성)
- 프로젝트 카드 hover 시 metrics 칩 강조
- `prefers-reduced-motion` 존중, 모바일 반응형 필수
- Lighthouse 성능을 의식해 이미지·모션 최소화 (이 자체가 포트폴리오 어필 포인트)

### 디자인 방향
- 흔한 AI 생성 룩(크림 배경 + 세리프 + 테라코타 / 검정 배경 + 형광 그린) 피할 것.
- 소재가 "폐쇄망 사내 시스템·파이프라인·측정"이므로, **계기판/오실로스코프 같은 엔지니어링 계측 무드**를 제안: 어두운 청회색 바탕에 데이터 시각화용 포인트 컬러 1개, 지표 숫자는 모노스페이스(예: JetBrains Mono / IBM Plex Mono), 본문은 Pretendard. 헤어라인 그리드와 수치 라벨로 '측정으로 증명한다'는 정체성을 시각화.
- 시그니처는 2번 섹션의 아키텍처 다이어그램 하나에 집중하고 나머지는 절제.

### 기술 요건
- 컴포넌트: `Hero, ArchitectureDiagram, ProjectFilter, ProjectCard, ProjectDetail(모달), Timeline, MetricCounter, SectionNav`
- md 추가만으로 프로젝트가 늘어나는 구조 (frontmatter 스키마 zod 검증이면 더 좋음)
- 다크 기본, SEO 메타 + OG 태그, Vercel 배포 가능하게

먼저 디자인 토큰(팔레트 4~6색 hex, 타입 2~3종, 레이아웃 컨셉, 시그니처 요소)을 짧게 제안하고 내 확인 후 구현해줘.

---

## md 파일 배치

```
project-root/
├─ content/
│  ├─ sections/
│  │  ├─ profile.md
│  │  ├─ experience.md
│  │  └─ side-projects.md
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
- 면접관 동선: Hero(15초) → 아키텍처 다이어그램(풀스택 증명) → fullstack 3개 심층 → 나머지. 필터 기본값을 '전체'로 두되 정렬은 order 순(풀스택 우선)으로.
- "직접 구현 / 설계 이해·연동" 구분을 시각 요소(배지 2색)로 일관되게 노출하면 정직함 자체가 강점이 됩니다.
