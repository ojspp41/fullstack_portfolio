---
{
  "id": "development-loop",
  "order": 1,
  "eyebrow": "01 · AI·업무 자동화",
  "title": "개발 품질 관리 · 루프·하네스 엔지니어링",
  "summary": "AI로 분석·구현·테스트를 보조하고 실제 화면·리뷰·배포로 확인했습니다. 입력·완료 기준과 검증 규칙을 재사용 절차로 만들고 실패를 다음 개발에 반영했습니다.",
  "steps": [
    "Requirement",
    "State Modeling",
    "Implementation",
    "Unit Test",
    "Browser Validation",
    "MR",
    "Deploy",
    "Smoke Test",
    "Feedback Loop"
  ],
  "metrics": [],
  "decision": "AI가 만든 결과의 완료 여부는 테스트·실제 화면·리뷰·배포 증거로 확인합니다."
}
---

루프 엔지니어링은 구현→검증→실패 확인→수정의 흐름을 연결하는 일입니다. 하네스 엔지니어링은 AI가 작업할 때 필요한 입력·도구·완료 기준·검증 절차를 마련하는 일입니다.

요구사항의 상태와 영향 범위를 정리한 뒤 AI로 구현·테스트를 보조했습니다. 단위 테스트, 화면 QA, GitLab MR, 배포 파이프라인과 스모크 테스트로 확인하고, 발견한 실패는 회귀 테스트와 확인 규칙에 반영했습니다. 모든 단계가 매 작업마다 자동 실행됐다는 뜻은 아닙니다.
