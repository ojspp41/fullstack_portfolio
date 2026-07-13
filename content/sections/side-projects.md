---
id: side-projects
section: side-projects
---

# 오픈소스 & 사이드 프로젝트

## Githru (VSCode Extension) — 컨트리뷰션
**2025.06 ~ · 🏆 2025 오픈소스 컨트리뷰션 아카데미 우수상 — 과학기술정보통신부 장관상**

`TypeScript` `React` `Zustand` `D3.js` `Tailwind`

- TemporalFilter 컴포넌트 렌더링 성능 최적화 PR(#812) — 라인 차트 데이터 처리 로직 최적화로 **렌더링 성능 18.9% 개선, 변동성 93% 감소**
- D3.js 차트 컴포넌트의 불필요한 재계산 방지로 대용량 커밋 데이터 처리 성능 향상

## Favus — S3 멀티파트 업로드 도구 (팀장)
**2025.06 — 2025.09 · 🏆 2025 오픈소스 개발자 대회 우수작 — 직장인 부문**

`Go CLI` `React` `Next.js` `Python` `WebSocket` `AWS S3`

- Go 기반 **병렬 청킹 + 상태 저장 메커니즘** — 네트워크 중단 시 자동 재개, 대용량 파일 전송 **실패율 90% 감소**
- WebSocket 3계층 모니터링 (CLI → Python Server → React UI) — 업로드 진행률·파트별 상태 실시간 시각화

## COMAtching v3 ~ v4 (팀장) — 풀스택 사이드 프로젝트
**2023.06 — 2025.05 · 서비스 상용화 · 누적 사용자 2,000명 · 매출 800만원**

`React` `Recoil` `SockJS/STOMP` `Node.js` `MySQL` `Docker/Jenkins`

- 팀장 — 기획·개발·운영 전 과정 책임(프론트 주도), **MySQL 스키마·조인·인덱스 직접 설계**(매칭 조회 user–match 조인 + status 인덱스), 백엔드 매칭 로직 일부 구현
- Toss Payments SDK + **Idempotency-Key 기반 중복 결제 방지(결제 멱등성)** 시스템 구축
- **Docker·Jenkins CI/CD 파이프라인 직접 구축** — 빌드·배포 자동화

## 부천 FC | AI 응원 매칭 — 기업 협업 프로젝트
**2024.09 — 2024.10 · 부천 FC 경기장 실서비스 배포 · 700명 참여**

`React` `Recoil` `jsQR` `Chart.js`

- 화면 기획 및 프론트엔드 단독 개발 — 입장 QR 인증 → 성향 분석 → 매칭까지 전체 사용자 플로우 설계
- AI 기반 성향 분석 — 6가지 응원 유형을 Chart.js 레이더 차트로 시각화

---

# 수상 내역

1. 🥇 **2025 오픈소스 컨트리뷰션 아카데미 우수상** — 과학기술정보통신부 장관상 · Githru
2. 🥈 **2025 오픈소스 개발자 대회 우수작** — 직장인 부문 · Favus (Go CLI · WebSocket)
3. 🏅 **GGUM 교내 해커톤 우수상** — 도서관 좌석/빈 강의실 시각화 (React, TS)
4. 🏅 **교내 ICPC 우수상** — 알고리즘 대회

---

# AI 활용 경험 (AI Experience 섹션용)

- 생성형 UI 처리 흐름 (Pipeline) 설계 — AI 응답을 안전한 UI로 변환
- 검색 증강 (RAG) · Chunking · 임베딩 과정 시각화
- RBAC 권한 경계 설계 — can() 추상화로 미확정 역할 스펙과 FE 격리 (BE permission.go 설계 이해·연동)
- 스트리밍 마크다운 파서 직접 설계 (Progressive Markdown Parser)
- VOC 에이전트 직접 개발 — 생성형 UI 폼으로 Jira 티켓 자동 생성 (가이드 문서 기반)
- MES 데이터 분석 에이전트 — 자연어를 SQL로 변환(Text-to-SQL)한 차트 시각화
- playwright-mcp + Confluence MCP 결합 가이드북 자동화 — Claude Code로 화면 캡처·문서 자동 생성
- 사용량·비용 미터링 대시보드 — 화면 요구를 백엔드 집계로 정의 (Kafka·SCD2 연동, FE 훅·ExcelJS 직접 구현)
- 파일 인앱 미리보기 풀스택 — 미리보기 엔드포인트·통로 분리 직접 구현 + 악성코드 차단 3겹
- agent-browser 기반 QA 시트 자동 제작 — 시나리오 도출부터 결과 정리까지 AI 처리 흐름
- QA 시트를 토대로 FSD(Feature-Sliced Design) 구조 리팩토링 — 책임 경계 재정렬 및 의존성 단방향화
