---
id: ai-atlas-overview
section: ai-atlas
title: AI Atlas — 프로젝트 개요
period: 2025.10 ~ 재직 중
scope: 한솔그룹 13개 계열사 · 1만 명
role: Full-Stack (단독) — FE 오너 + Go Gateway 일부(백오피스·미터링)
---

# AI Atlas — 한솔그룹 13개 계열사 1만 명 사내 LLM 서비스

## 입사 시점의 상황 (Context & Problem)

- **2025.10 합류** — 사내 LLM 서비스의 클라이언트 전체를 책임지는 자리
- **입사 직후 사수 이탈** — 인수인계 도중 5년차 시니어 이탈. 코드 컨벤션·도메인 지식·의사결정이 동시에 비었다
- **기획자·디자이너·QA 모두 부재** — RAG·청킹·임베딩을 사용자에게 보여줘 본 사람도 없었다
- **2개월 내 13개 계열사 1만 명 런칭 기한** — 경영진 약속 일정. '늦추기'도 '대충 출시'도 불가능
- **폐쇄망 · 보안 정책 · 13개 계열사 권한 매트릭스** — 외부 SaaS·CDN·에러 트래커 미사용, 인프라·보안과 동시에 해결

## 주요 기능 (도메인별)

### 인증 · 조직 · 권한 — 4 features
| 도메인 | 내용 |
|---|---|
| auth | 로그인 · 회원가입 · 이메일 인증 |
| organization | 조직/팀 CRUD · 스위처 · 드래그앤드롭 조직도 |
| permissions | 리소스 기반 통합 권한 (RBAC) |
| api-keys | 외부 연동 키 발급 · 회수 |

### Agent 생태계 — 4 features
| 도메인 | 내용 |
|---|---|
| agents | Agent CRUD · 템플릿 · 풀스크린 프롬프트 에디터 · MCP/ToolSet/SubAgent 연결 |
| tools/mcp | MCP 서버 카탈로그 · 승인 흐름 |
| tools/toolSets | ToolSet 등록 · 승인 상태 관리 |
| schedules | Agent 자동 실행 (반복 / 세션 모드 / 실행 이력) |

### 채팅 · 세션 — 3 features
| 도메인 | 내용 |
|---|---|
| chat | ChatGPT 스타일 UI · ChartRenderer · MermaidRenderer · 마크다운 스트리밍 · 위젯/라이트박스 |
| sessions | 세션 CRUD · 상태 · 공유 |
| sessionTools | 세션 내 도구 호출 추적 |

### 콘텐츠 · 협업 — 5 features
| 도메인 | 내용 |
|---|---|
| documents | PDF · DOCX · XLSX · HWP 파싱과 관리 |
| files | 업로드 매니저 · 카트 · 기존 파일 선택기 |
| share | Agent·Session·Document·File 4종을 user/team/org/system 4계층에 공유 |
| announcements | 공지 작성 · 카테고리 필터 |
| notifications | 실시간 알림 · 필터 · 사용자 설정 |

### 운영 · 관리자 (백오피스 어드민) — 3 features
| 도메인 | 내용 |
|---|---|
| token-usage | 사용자·조직·모델·일/월별 토큰 사용량 미터링 대시보드 (recharts) |
| migration | 시스템 데이터 이주 — 권한 관리 체크 · 리소스별 집계 |
| settings/system | 시스템 · 사용자 · 조직 · MCP · ToolSet 관리 |

## 기술 스택

- **FE**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4 · shadcn/ui
- **State**: Zustand · TanStack Query · WebSocket/STOMP · Jest · Playwright
- **BE / Gateway**: Go 1.24 · Gin · gRPC · Protobuf · Kafka · Redis · MinIO · MySQL · MongoDB
- **Infra**: Docker · Kubernetes · CI/CD · 폐쇄망 배포
