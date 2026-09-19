---
id: ai-development
order: 4
eyebrow: Development System · 개발·QA·문서·운영
title: AI 활용 개발 시스템 — 실패 증거가 다음 개발의 입력으로
summary: 요구사항 분석부터 구현·테스트·브라우저 검증·MR·배포·Smoke Test까지 연결하고, 반복 업무를 재사용 AI Skill과 콘텐츠·보고 자동화로 정리했습니다.
stack: [Jira, Jest, Go Test, Playwright, GitLab MR, CI/CD, AI Skill]
metrics:
  - label: 재사용 AI Skill
    value: 36개
  - label: 운영 주간보고
    value: 2~3시간 → 10분 이내
    note: 업무 소요시간 기준 · 자동화 범위와 역할은 상세에 표시
decision: AI가 코드를 생성하는 데서 끝내지 않고, 실패 원인을 프롬프트·테스트·검증 규칙에 다시 반영합니다.
link:
  label: 개발·검증·배포와 자동화의 네 가지 축 보기
  href: "#ai-workflow"
---

테스트 실패·브라우저 차이·코드 리뷰·QA 결함을 원인별로 분류해 다음 작업의 입력으로 남깁니다. 실행 조건·입력·검증 기준을 갖춘 36개 Skill로 반복 작업을 자산화했습니다.

활용 가이드 5개와 실제 화면 이미지 93개를 제작하는 흐름을 자동화했고, 서비스 활용 영상 제작은 약 3일에서 4시간으로 단축했습니다. 운영 보고서는 코드가 데이터를 수집·정규화·집계·교차 검증하고, AI는 큰 변화와 특이사항의 설명을 작성합니다.

업무 소요시간은 인프라 벤치마크나 모든 작업의 생산성 향상률과 구분합니다. 사내 실제 화면과 데이터는 공개하지 않습니다.
