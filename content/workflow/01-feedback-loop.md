---
id: development-loop
order: 1
eyebrow: A · AI 개발·검증·배포 폐루프
title: 실패 증거가 다음 개발의 입력이 되는 AI 개발 폐루프
summary: 요구사항과 상태를 먼저 정리하고, 구현 이후의 테스트·브라우저 검증·리뷰·배포 결과까지 다음 작업에 반영합니다.
stack: [Jira, Jest, Go Test, Playwright, GitLab MR, CI/CD, Smoke Test]
steps: [Requirement, State Modeling, Implementation, Unit Test, Browser Validation, MR, Deploy, Smoke Test, Feedback Loop]
decision: 테스트 실패·브라우저 차이·리뷰·QA 결함을 원인별로 나눠 프롬프트·테스트·검증 규칙을 갱신합니다.
---

Jira 요구사항에서 상태와 영향 범위를 정리하고 구현·단위 테스트로 이어갑니다. Playwright로 실제 브라우저 동작을 확인한 뒤 GitLab MR의 리뷰, CI/CD 배포, Smoke Test까지 검증합니다.

검증에 실패하면 증거와 원인을 기록합니다. 코드 결함·환경 차이·요구사항 누락을 구분하고 같은 문제가 반복되지 않도록 다음 작업의 프롬프트와 테스트, 확인 규칙에 반영합니다. AI를 활용하되 리뷰와 배포 검증을 생략하는 방식은 아닙니다.
