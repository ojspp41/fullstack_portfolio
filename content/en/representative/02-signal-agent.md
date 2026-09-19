---
id: signal-agent
order: 2
eyebrow: Agent Safety · Hansol Group AX Project
title: 신호등 에이전트 — Enterprise AI Agent Safety Validation
summary: A full-stack validation platform that analyzes permissions, sensitive information, approval procedures, and prompt-injection risks before an enterprise Agent is used at work, assigning green, yellow, or red outcomes.
stack: [React, TypeScript, TanStack Query, Node.js, Clean Architecture, AI Agent, Human-in-the-loop, JSON / PDF Report]
metrics:
  - label: Task-specific quality presets
    value: "4"
  - label: Evaluation coverage
    value: 10 core risk scenarios
    note: 8 attack personas · 5 defense personas
decision: Deterministic rules—not the LLM—make the final traffic-light classification.
---

### From inspection requests to reports and history

- **Frontend** — React, TypeScript, and TanStack Query for inspection creation, file/repository input, progress, traffic-light outcomes, Risk Graph, improvement recommendations, and history.
- **Backend** — Node.js, TypeScript, and Clean Architecture connecting file/ZIP inputs, inspection of public GitHub/GitLab repositories, asynchronous inspection state, results/history APIs, and JSON/PDF reports.
- **Evaluation** — Four task-specific quality presets, eight attack personas, five defense personas, and ten core risk scenarios.

### Separate deterministic decisions from LLM exploration

The LLM is restricted to extending risk scenarios that ordinary tests may miss. External models receive only minimized, de-identified information, not the complete original inputs.

Human approval, sensitive-data masking, audit logs, duplicate-execution prevention, untrusted-input isolation, and output-path restrictions are product controls. Safety, permissions, auditability, and reproducibility matter alongside Agent performance.

This was development work in a Hansol Group AX project. Validation results are limited to the defined inspection scope, not a guarantee that every risk will be detected.
