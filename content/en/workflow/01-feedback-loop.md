---
id: development-loop
order: 1
eyebrow: A · AI Development, Validation & Deployment Loop
title: Failure evidence becomes input for the next development cycle
summary: Model requirements and state first, then feed tests, browser validation, reviews, and deployment results back into the next task.
stack: [Jira, Jest, Go Test, Playwright, GitLab MR, CI/CD, Smoke Test]
steps: [Requirement, State Modeling, Implementation, Unit Test, Browser Validation, MR, Deploy, Smoke Test, Feedback Loop]
decision: Classify test failures, browser differences, review findings, and QA defects by cause; update prompts, tests, and validation rules.
---

Start with Jira requirements, state, and impact analysis, then implement and unit-test. Validate actual browser behavior with Playwright, review the GitLab MR, deploy through CI/CD, and run Smoke Tests.

Record evidence and causes when validation fails. Separate code defects, environment differences, and missing requirements, then revise the next task's prompts, tests, and checks. Using AI does not replace review or deployment validation.
