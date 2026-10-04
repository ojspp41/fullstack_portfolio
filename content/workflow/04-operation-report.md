---
{
  "id": "operation-report",
  "order": 2,
  "eyebrow": "02 · AI·업무 자동화",
  "title": "운영보고 자동화",
  "summary": "API 운영 지표의 기간·합계·수치 연속성을 코드로 확인한 뒤 AI가 보고 내용을 작성했습니다. 계산과 설명을 나누고 생성·검증 시간을 줄였습니다.",
  "steps": [
    "REST API",
    "Normalize",
    "Period / Total Validation",
    "Chart",
    "AI Explanation",
    "Review"
  ],
  "metrics": [
    {
      "label": "운영 주간보고",
      "value": "약 2~3시간 → 10분 이내",
      "note": "생성·검증 포함 · 기존 실행 기록"
    }
  ],
  "decision": "AI가 숫자를 계산하지 않습니다. 수집·집계·기간·합계 검증은 코드로 처리합니다."
}
---

API에서 DAU·Token·Top Agent·Model Usage를 수집하고 기간·합계·전주 비교의 연속성을 검증했습니다. AI는 검증된 수치의 변화와 특이사항을 설명하고 사람이 최종 보고 내용을 확인했습니다.

기존 실행 기록 기준 주간보고 1회 약 2~3시간 → 10분 이내입니다. 보고 생성과 검증을 포함한 해당 업무의 결과이며 모든 운영 업무의 시간 절감으로 확대하지 않습니다.
