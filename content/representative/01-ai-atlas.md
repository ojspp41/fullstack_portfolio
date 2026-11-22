---
{
  "id": "ai-atlas",
  "order": 1,
  "eyebrow": "Enterprise AI · 한솔PNS AI개발팀",
  "title": "AI Atlas — 1만 명 대상 엔터프라이즈 AI 플랫폼",
  "summary": "직원용 채팅 화면과 관리자 대시보드를 만들었습니다. Go로 사용량 조회·한도 확인 API를 개발하고 기존 사용량 집계 시스템에 연결했습니다.",
  "stack": [
    "React",
    "TypeScript",
    "Python / FastAPI",
    "Go",
    "Kafka",
    "Redis",
    "MongoDB",
    "Docker"
  ],
  "metrics": [
    {
      "label": "서비스 대상 규모",
      "value": "약 1만 명 · 13개 계열사"
    },
    {
      "label": "첫 출시",
      "value": "입사 후 6개월 안에",
      "note": "팀과 함께 제품화·개발"
    }
  ]
}
---

### 화면에서 운영까지 넓힌 담당 범위

- **Frontend** — Chat·Agent·Generative UI·WebSocket, 관리자 백오피스, 오류 제보(VOC), 파일 미리보기, RAG 처리 과정 및 청킹·임베딩 상태의 사용자 화면 시각화.
- **Backend / API** — Python/FastAPI·Go를 활용한 미터링 조회·사용 한도·리소스 권한·공유 API. Go Gateway에서는 직접 담당한 일부 기능을 구현했습니다.
- **Enterprise** — 다중 조직 RBAC의 read / execute / write / share 경계, Agent 공유 승인·회수·실행 재인가.
- **Data / Operation** — Kafka·Redis·MongoDB의 공통 미터링 인입·일별 집계·가격·환율 기반과 조회 API를 연동하고, Docker, 테스트·배포·Smoke Test, 운영 자동화.

입사 후 6개월 안에 팀과 함께 13개 계열사 약 1만 명 대상 첫 출시를 진행했습니다. 전체 플랫폼이나 공통 인프라를 혼자 개발한 경험으로 표현하지 않습니다. RAG 청킹 알고리즘·임베딩 모델·Vector DB 구축이 아니라 처리 상태를 사용자에게 보여주는 UX와 연동을 담당했습니다.
