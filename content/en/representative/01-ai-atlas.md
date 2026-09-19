---
id: ai-atlas
order: 1
eyebrow: Enterprise AI · Hansol PNS AI Development Team
title: AI Atlas — Enterprise AI Platform for 10,000 Users
summary: An internal LLM and RAG platform used by approximately 10,000 people across 13 affiliates. I expanded my scope from AI UX to selected APIs, permissions, metering, files, deployment, and operations.
stack: [React, TypeScript, Python / FastAPI, Go, Kafka, Redis, MongoDB, Docker]
metrics:
  - label: Platform scale
    value: ~10,000 users · 13 affiliates
  - label: First release
    value: Within six months of joining
    note: Built and released with the team
decision: I owned the frontend and implemented selected backend APIs, permission logic, and the metering pipeline—not the entire platform.
link:
  label: Explore the six existing technical deep dives
  href: "#projects"
---

### From user interfaces to operations

- **Frontend** — Chat, Agent, Generative UI, WebSocket, admin back office, file previews, and user-facing visualization of RAG processing and chunking/embedding status. Also developed a VOC Agent that creates Jira tickets from Generative UI forms.
- **Backend / API** — Python/FastAPI and Go experience covering metering queries, usage limits, resource permissions, and sharing APIs. Go Gateway ownership is limited to the features I directly implemented.
- **Enterprise** — Multi-organization RBAC boundaries for read / execute / write / share, Agent sharing approval, revocation, and execution reauthorization.
- **Data / Operation** — Metering ingestion, daily pre-aggregation, and price/FX history in a Kafka, Redis, and MongoDB environment; Docker, testing, deployment, Smoke Tests, and operational automation.

Within six months of joining, I worked with the team on the first release for approximately 10,000 people across 13 affiliates. This does not imply ownership of the entire platform or shared infrastructure. RAG work means UX and integration for processing status, not development of chunking algorithms, embedding models, or a Vector DB.

### Technical evidence retained

Separate case studies retain implementation, verification, and limitations for usage/cost metering, multi-organization Agent sharing, in-app file previews, Generative UI JSON recovery, WebSocket reliability, and Docker image optimization.
