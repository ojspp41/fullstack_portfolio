---
id: slp-manufacturing
order: 3
eyebrow: Enterprise Integration · 제조 AX
title: SLP 제조 AX — On-Prem sLLM × MES MCP 생산 리포팅 Agent
summary: 외부 SaaS 활용이 제한된 기업 환경에서 온프레미스 sLLM과 MES를 MCP로 연결해 생산 데이터를 조회·비교하고 보고서까지 생성하는 Agent입니다.
stack: [On-Premise sLLM, MCP, MES, MS-SQL, AI Agent, HTML Report]
metrics:
  - label: 조회 범위
    value: 생산 · 품질 · 설비 · LOT
  - label: 결과물
    value: Summary + HTML Report
decision: 목적별로 정의한 읽기 전용 MCP 조회 도구를 Agent가 선택합니다.
steps: [User Request, On-Prem sLLM, MES MCP, 생산 / 품질 / 설비 / LOT 조회, 현재 기간 vs 직전 기간 비교, 이상 변동 추가 탐색, Summary + HTML Report]
---

### 기업 시스템에 모델을 적용

사용자의 질문을 이해한 Agent가 목적별 MCP 도구를 선택합니다. 생산·품질/불량·설비·LOT 이력을 조회하고 현재 기간과 직전 동일 기간을 비교합니다. 이상 변동이 있으면 추가 데이터를 조회한 뒤 요약과 HTML 보고서를 생성합니다.

온프레미스 모델을 Agent와 MCP에 적용한 경험입니다. 모델의 직접 학습·구축이나 MES 전체 개발 경험으로 표현하지 않습니다.

### 조회 근거와 해석을 분리

- MCP 조회 결과에 없는 수치는 생성하지 않도록 제한했습니다.
- 관측된 사실과 원인 해석을 분리하고 조회 범위를 제한했습니다.
- 오류 재시도와 허위 수치를 작성하라는 요청에 대한 방어를 검증했습니다.
- 모델·프롬프트·MCP·인프라 장애를 구분해 원인을 추적했습니다.
- 정상 요청뿐 아니라 예외·공격 시나리오까지 QA에 포함했습니다.
