# 오준석 — AI Product / Full-Stack Engineer

한국어·영어 원페이지 포트폴리오입니다. 콘텐츠는 `content/`의 Markdown에서 빌드 타임에 읽고, gray-matter와 Zod로 검증합니다.

## 내용 기준

기존 6개 심층 분석은 `portfolio_fullstack_v4_extracted_pdf_aligned.md`의 2026-09-14 수정본에 정렬한 내용과 측정 경계를 유지합니다. 대표 경험과 사실관계 교정은 2026-09-19 사용자가 제공한 수정 요청을 반영했습니다. 신호등 에이전트·SLP·AI 개발 방식의 신규 구현 범위와 수치는 제공 자료 기준이며, 이 웹사이트 저장소만으로 실제 프로젝트 구현·업무시간을 독립 검증한 것은 아닙니다. 사내 실제 UI·데이터·내부 코드는 공개하지 않습니다.

특정 기업 지원용 문구 없이 **AI Atlas → 신호등 에이전트 → SLP 제조 AX → AI 활용 개발 시스템** 순서로 대표 경험을 보여줍니다. 요약·지표는 카드에, 상세 구현·판단·한계는 펼치기에 분리했습니다. 개발·검증·배포 폐루프, 재사용 AI Skill, 활용 콘텐츠, 운영 주간보고는 별도의 네 축으로 표시합니다. COMAtching은 보조 경험 첫 번째에 배치하고 Githru·Favus 및 기존 수상 4건을 유지했습니다.

| 순서 | 대표 사례 | 기준 페이지 |
|---|---|---|
| 1 | 사용량·비용 미터링 | 5–6 |
| 2 | 타 조직 Agent 공유 | 7–8 |
| 3 | 파일 인앱 미리보기 | 9–10 |
| 4 | Generative UI | 11–12 |
| 5 | WebSocket 안정화 | 13–14 |
| 6 | Dockerfile 고도화 | 15–16 |

- 미터링 Kafka 인입·집계·가격/환율 이력은 **직접 구현** 범위입니다. 공통 Kafka 기반 전체 구현과는 구분합니다.
- 대표 미터링 지표는 **조회시간 1,970ms → 2.6ms, 약 750배**(300만 건 재현 데이터 → 일별 요약 1,440건)입니다. 현재 코드의 100만 건 로컬 MongoDB·Redis 실측은 상세에서 별도로 유지합니다.
- 첫 출시는 **입사 후 6개월 안에 팀과 함께**로 교정했습니다. 전체 플랫폼 단독 개발·출시 주도로 표현하지 않습니다.
- RAG 경험은 처리 과정 및 청킹·임베딩 상태의 사용자 화면 시각화와 연동이며, 알고리즘·모델·Vector DB 구축과 구분합니다.
- 신호등 에이전트의 최종 판정은 결정론적 규칙, LLM은 위험 시나리오 확장입니다. SLP는 온프레미스 모델과 목적별 읽기 전용 MES MCP 도구를 연결한 생산 리포팅입니다.
- 콘텐츠·운영 자동화 시간은 해당 업무 소요시간 기준이며, 추정치를 실측 성과나 전체 개발 생산성 향상률로 일반화하지 않습니다. 원본 기록의 측정 범위 대조가 필요합니다.
- ExcelJS는 브라우저에서 요약·상세 시트를 생성합니다. 이전 서버 스트리밍·메모리 수치는 현재 페이지에서 제외했습니다.
- Generative UI는 40개 fixture의 **파싱 실패 16건 → 1건**입니다. 렌더 예외 격리는 별도의 결과입니다.
- Docker cold pull은 **로컬 중앙값 8.13s → 3.93s**, 각 3회 실측입니다.
- 로컬 메모리·조회 벤치와 운영 응답시간·Pod 지표를 구분합니다.
- PDF 정리 영속 재시도와 세대 검증은 후속 보강 설계이며 구현 완료로 표시하지 않습니다.

## 로컬 실행·검증

```bash
npm ci
npm test
npm run lint
npm run typecheck
npm run build
npm run dev
```

`npm test`는 Node.js 22.18 이상(TypeScript 타입 제거 지원)이 필요합니다. 별도 테스트 의존성을 설치하지 않습니다.

- 콘텐츠 테스트 14개: 한국어/영어 6개 심층 사례·대표 경험 4개·워크플로 4개, Hero 지표, 경력, 수상 4개, 측정 수치, 공개 링크, 아키텍처 사례 연결, 과장·지원 대상 문구 회귀, 번역 구조 일치를 검사합니다.
- lint: ESLint + Next.js core-web-vitals/TypeScript 규칙, 경고 0개 기준. App Router 루트 HTML 문서의 native `<head>`만 Pages Router 전용 규칙에서 제외합니다.
- typecheck: `tsc --noEmit`.
- 빌드: Next.js TypeScript 검사 및 두 언어 페이지 정적 생성.
- 브라우저 확인: 필터, 상세 모달, ESC 닫기, `?p=cross-org-sharing` / `?p=file-preview` 딥링크, 390px 모바일 상세.

## 콘텐츠 관리

- `content/sections/profile.md`: 프로필·Hero 지표·담당 범위·스택·강점
- `content/sections/experience.md`: 경력·학력·활동
- `content/sections/ai-atlas-overview.md`: AI Atlas 개요
- `content/sections/side-projects.md`: 오픈소스·사이드 프로젝트·수상·AI 경험
- `content/projects/*.md`: 한국어 사례
- `content/representative/*.md`: 대표 경험 4개
- `content/workflow/*.md`: AI 개발·QA·문서·운영의 네 가지 축
- `content/en/`: 동일 콘텐츠의 영어판

프로젝트는 frontmatter의 `published: true`일 때만 표시됩니다. 기존 PDF 인보이스·RBAC·마크다운 파서·파일 업로드 상세 파일은 삭제하지 않고 비공개 보관 상태로 두었습니다. 새 사례를 표시하려면 두 언어 파일의 ID·순서·published를 함께 맞추고 테스트의 기준 목록을 검토합니다.

`measurement`는 Deep Dive 카드와 상세에 함께 노출되는 측정 조건입니다. 개선 수치와 한계를 함께 적습니다. 대표 경험·워크플로의 frontmatter는 `id`, `order`, `eyebrow`, `title`, `summary`, `metrics`, `stack`, `decision`, `steps`, `link`를 Zod로 검증합니다. 신규 콘텐츠는 반드시 한국어/영어를 함께 수정합니다.

## PDF 다운로드

기존 `public/junseok-oh-fullstack-portfolio.pdf`는 보존했지만 최신 MD와의 일치가 확인되지 않아 두 언어 프로필의 `resumePdf` 선언을 제거했습니다. 최신 PDF로 교체한 뒤 두 프로필에 아래 항목을 복원하면 다운로드 버튼이 표시됩니다.

```yaml
resumePdf: /junseok-oh-fullstack-portfolio.pdf
```

파일 보존 상태이므로 이전 PDF의 직접 URL은 여전히 접근 가능합니다.

## 화면·배포

기존 파스텔·인디고 테마, Pretendard 본문, 모노스페이스 데이터, Lottie 및 reduced-motion 지원을 유지했습니다. 카드에 측정 경계를 표시하고 아키텍처에서 직접 구현과 공통 기반 연동을 구분합니다. 키보드 focus-visible과 native details/summary를 지원합니다.

Vercel에서는 `VERCEL_PROJECT_PRODUCTION_URL`을 metadataBase로 사용합니다. 다른 호스팅에서는 `NEXT_PUBLIC_SITE_URL`을 실제 공개 URL로 설정하세요. 환경 변수가 없을 때는 이 저장소의 기존 운영 주소 `https://fullstack-portfolio-omega-one.vercel.app`를 사용합니다.

Vercel 배포를 지원합니다. GitHub 반영 후 운영 배포 상태는 호스팅 환경에서 별도로 확인합니다. `output: standalone` 설정에서 자체 호스팅할 경우 Next.js standalone 서버와 정적 자산 배치가 필요합니다.

배포 전 보안 점검에서 확인된 기존 의존성 취약점은 Next.js 15.5.25, js-yaml 3.15.2, nanoid 3.3.19, sharp 0.35.4와 PostCSS 8.5.28로 갱신했습니다. Next.js 15의 고정된 이전 PostCSS 하위 의존성은 `overrides`로 패치 버전을 사용합니다. `npm audit --omit=dev --audit-level=high` 결과 보고된 취약점 0건이며, 의존성 변경 후 테스트·lint·타입 검사·프로덕션 빌드를 재검증합니다.
