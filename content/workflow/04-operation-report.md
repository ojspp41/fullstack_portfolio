---
id: operation-report
order: 4
eyebrow: D · 운영 주간보고 자동화
title: 숫자는 코드로 검증하고, 변화의 설명은 AI로
summary: REST API의 운영 지표를 정규화·집계·교차 검증한 뒤 차트와 설명을 연결해 주간보고를 작성합니다.
metrics:
  - label: 운영 주간보고
    value: 약 2~3시간 → 10분 이내
    note: 해당 보고 업무의 소요시간 기준
steps: [REST API, DAU / Token / Top Agent / Model Usage, Normalize, Cross Validation, Chart, AI Explanation, Report]
decision: AI가 숫자를 계산하지 않습니다. 데이터 수집·정규화·집계·기간 검증·합계 검증은 코드가 수행합니다.
---

API로 DAU·Token·Top Agent·Model Usage를 수집하고 기간과 합계가 맞는지 교차 검증한 뒤 차트를 생성합니다. AI는 검증된 지표를 바탕으로 변화가 큰 항목·특이사항·설명을 작성합니다.

재현성이 필요한 계산과 판단은 코드와 규칙으로 확정하고, 사람이 검증할 수 있는 분석·설명에 AI를 활용합니다. 소요시간은 이 자동화 범위에 한정하며, API 대기·작성·검토 시간의 포함 기준은 별도 기록 확인이 필요합니다.
