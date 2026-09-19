---
id: side-projects
section: side-projects
---

# Open Source & Side Projects

## COMAtching v1 ~ v4 (Team Lead) — Product Development & Operations
**Jun 2023 — May 2025 · ~2 years · ~2,000 cumulative users · ~₩8M revenue**

`Java / Spring Boot` `React` `Recoil` `SockJS/STOMP` `Node.js` `MySQL` `Docker/Jenkins`

- Built and operated the product with the team, improving v1–v4 with user feedback and performance data. Led the frontend and handled MySQL schema/joins/indexes, selected backend matching logic, and operations/deployment.
- **Matching-query optimization** — Addressed a requirement involving ~50,000 candidates. A 5,000-person sample with SQL score calculation reduced DB queries **601 → 2** and SQL time **261.1ms → 18.8ms**. This is sample SQL timing, not end-to-end service latency.
- Toss Payments SDK with **Idempotency-Key-based duplicate-payment prevention**, and **Docker/Jenkins CI/CD setup**.

## Githru (VSCode Extension) — Contributor
**2025.06 ~ · 🏆 2025 Open Source Contribution Academy Excellence Award — Ministerial Prize, Ministry of Science and ICT**

`TypeScript` `React` `Zustand` `D3.js` `Tailwind`

- Rendering performance PR (#812) for the TemporalFilter component — optimized line-chart data processing, **improving rendering performance by 18.9% and reducing variance by 93%**
- Eliminated unnecessary recomputation in D3.js chart components, improving performance on large commit datasets

## Favus — S3 Multipart Upload Tool (Team Lead)
**2025.06 — 2025.09 · 🏆 2025 Open Source Developer Contest Winner — Professional Division**

`Go CLI` `React` `Next.js` `Python` `WebSocket` `AWS S3`

- Go-based **parallel chunking + state persistence mechanism** — automatic resume after network interruptions, cutting large-file transfer **failure rates by 90%**
- Three-tier WebSocket monitoring (CLI → Python Server → React UI) — real-time visualization of upload progress and per-part status

## Bucheon FC | AI Fan-Matching — Corporate Collaboration Project
**2024.09 — 2024.10 · Deployed live at the Bucheon FC stadium · 700 participants**

`React` `Recoil` `jsQR` `Chart.js`

- Screen planning and sole frontend development — designed the full user flow from QR entry verification → personality analysis → matching
- AI-based personality analysis — visualized six supporter types with Chart.js radar charts

---

# Awards

1. 🥇 **2025 Open Source Contribution Academy Excellence Award** — Ministerial Prize, Ministry of Science and ICT · Githru
2. 🥈 **2025 Open Source Developer Contest Winner** — Professional Division · Favus (Go CLI · WebSocket)
3. 🏅 **GGUM University Hackathon Excellence Award** — Library seat / empty classroom visualization (React, TS)
4. 🏅 **University ICPC Excellence Award** — Algorithm competition

---

# AI Experience

- Generative UI pipeline design: transform AI responses into safe UI.
- User-facing visualization of RAG processing and chunking/embedding status.
- Cross-org Agent sharing: organization-scoped paths, approval revalidation, five execution authorization paths, and Outbox convergence.
- Progressive streaming markdown parser implementation.
- VOC Agent: create Jira tickets from Generative UI forms based on guide documentation.
- SLP Manufacturing AX: production reporting connecting an on-premise sLLM to purpose-defined read-only MES MCP tools.
- 신호등 에이전트: enterprise Agent safety validation with deterministic final classifications.
- AI development/validation/deployment loop and 36 reusable AI Skills.
- Five usage guides and 93 actual screen images; usage-video production ~3 days → 4 hours.
- Weekly operations report ~2–3 hours → within 10 minutes; code calculates and validates, AI explains changes.
- Guidebook automation using playwright-mcp and Confluence MCP with Claude Code.
- Usage and cost metering: directly implemented Kafka ingestion, daily aggregation, price/FX history, frontend hooks, and ExcelJS exports.
- Full-stack in-app file previews: separate preview endpoint and three-stage active-content execution defenses (one server + two frontend).
