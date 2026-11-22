---
id: slp-manufacturing
order: 3
eyebrow: Enterprise Integration · 제조 AX
title: SLP 제조 AX — 생산 실적 보고서 에이전트
summary: 생산 담당자의 질문을 받아 이번 기간과 직전 기간의 실적을 비교하는 에이전트를 개발했습니다. 기존 생산관리시스템(MES)에서 필요한 수치를 읽는 조회 도구도 만들었습니다.
stack: [On-Premise sLLM, MCP, MES, MS-SQL, AI Agent, HTML Report]
metrics:
  - label: 조회 범위
    value: 생산 · 품질 · 설비 · LOT
  - label: 결과물
    value: Summary + HTML Report
---

사내에서 운영하는 언어 모델을 에이전트에 연결했습니다. 보고서에서는 생산관리시스템이 반환한 수치와 모델이 제시한 변동 원인을 구분해, 담당자가 해석의 근거를 확인할 수 있게 했습니다.
