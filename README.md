# 오준석 — 풀스택 개발자 포트폴리오

문제를 직접 정의하고 끝까지 푸는 풀스택 개발자. 이 사이트 자체가 기술 증명입니다.

원페이지 포트폴리오로, 모든 콘텐츠는 `content/`의 마크다운에서 빌드 타임에 읽어옵니다. 마크다운만 추가하면 프로젝트가 늘어나는 구조입니다.

## 기술 스택

- **Next.js 15** (App Router) · **TypeScript** (strict) · **Tailwind v4**
- 콘텐츠: gray-matter frontmatter 파싱 + **zod** 스키마 검증, 서버 컴포넌트에서 빌드 타임 로드
- 마크다운 렌더: react-markdown + remark-gfm (표·코드블록 지원)
- 전 페이지 정적 프리렌더 (SSG), First Load JS 약 151kB

## 섹션 구성

1. **Hero** — 핵심 지표 4개 뷰포트 진입 시 카운트업
2. **Full-Stack Range** — FE ↔ Go API Gateway ↔ Data Pipeline 인터랙티브 아키텍처 다이어그램. 노드별 "직접 구현 / 설계 이해·연동" 구분, 관련 심층분석으로 연결
3. **Deep Dives** — 프로젝트 9건, 카테고리 필터 + STAR 상세 모달
4. **Experience** — 한솔 PNS · PTKOREA 타임라인
5. **Open Source & Side Projects** — Githru · Favus · COMAtching · 부천FC + 수상
6. **Contact**

## 디자인

계기판/오실로스코프 무드 — 어두운 청회색 바탕 + 헤어라인 그리드, 포인트 컬러 앰버 1색, 지표 숫자는 JetBrains Mono, 본문은 Pretendard. '측정으로 증명한다'는 정체성.

## 로컬 실행

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:3000)
npm run build      # 프로덕션 빌드
npm start          # 프로덕션 서버
```

## 콘텐츠 수정

- `content/sections/profile.md` — 히어로·About·스택·강점 (Hero 카운터의 데이터 소스)
- `content/sections/experience.md` — 경력·학력·활동
- `content/sections/side-projects.md` — 오픈소스·사이드 프로젝트·수상
- `content/projects/*.md` — 심층분석 (frontmatter: `id, order, title, category, badge, stack[], metrics[], summary`)

## 배포

Vercel에 그대로 배포 가능합니다.
