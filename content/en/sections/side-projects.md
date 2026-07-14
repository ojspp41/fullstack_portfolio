---
id: side-projects
section: side-projects
---

# Open Source & Side Projects

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

## COMAtching v3 ~ v4 (Team Lead) — Full-Stack Side Project
**2023.06 — 2025.05 · Launched commercially · 2,000 cumulative users · ₩8M revenue**

`React` `Recoil` `SockJS/STOMP` `Node.js` `MySQL` `Docker/Jenkins`

- Team lead — owned planning, development, and operations end to end (frontend-led); **designed the MySQL schema, joins, and indexes myself** (user–match join for match lookups + status index) and implemented part of the backend matching logic
- Built duplicate-payment protection with the Toss Payments SDK + an **Idempotency-Key-based payment idempotency** system
- **Built the Docker · Jenkins CI/CD pipeline from scratch** — automated builds and deployments

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

- Designed a Generative UI processing pipeline — converting AI responses into safe UI
- Visualized the RAG, chunking, and embedding process for users
- Designed RBAC permission boundaries — a can() abstraction isolating the FE from unsettled role specs (understood & integrated the BE permission.go design)
- Built a streaming markdown parser from scratch (Progressive Markdown Parser)
- Built a VOC agent — auto-generating Jira tickets from a Generative UI form (driven by guide documents)
- MES data analysis agent — natural language to SQL (Text-to-SQL) with chart visualization
- Automated guidebook production combining playwright-mcp + Confluence MCP — screen captures and document generation with Claude Code
- Usage/cost metering dashboard — translated screen requirements into backend aggregations (Kafka · SCD2 integration; built the FE hooks and ExcelJS export myself)
- Full-stack in-app file preview — built the preview endpoint and separated delivery path myself + three layers of malware blocking
- Automated QA sheet production with agent-browser — an AI workflow from scenario derivation to result compilation
- Refactored to an FSD (Feature-Sliced Design) architecture based on the QA sheets — realigned responsibility boundaries and made dependencies unidirectional
