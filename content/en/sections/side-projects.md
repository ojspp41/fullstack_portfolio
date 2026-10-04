---
{
  "id": "side-projects",
  "section": "side-projects"
}
---

# Open Source & Side Projects

## COMAtching v1 ~ v4 (Team Lead) — Product Development & Operations
**Jun 2023 — May 2025 · ~2 years · ~2,000 cumulative users · ~₩8M revenue**

`Java / Spring Boot` `React` `Recoil` `SockJS/STOMP` `Node.js` `MySQL` `Docker/Jenkins`

- Built and operated the product with the team, improving v1–v4 with user feedback and performance data. Led the frontend and handled MySQL schema/joins/indexes, selected backend matching logic, and operations/deployment.
- **Matching-query optimization** — Addressed a requirement involving ~50,000 candidates. A 5,000-person sample with SQL score calculation reduced DB queries **601 → 2** and SQL time **261.1ms → 18.8ms**. This is sample SQL timing, not end-to-end service latency.
- Toss Payments SDK with **Idempotency-Key-based duplicate-payment prevention**, and **Docker/Jenkins CI/CD setup**.

## Githru (VSCode Extension) — Contributor
**2025.06 — 2025.12 · 🏆 2025 Open Source Contribution Academy Excellence Award — Ministerial Prize, Ministry of Science and ICT**

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

1. **Academic Honors Award** — The Catholic University of Korea · 2026.02.11
2. **Open Source Developer Contest — Outstanding Project** — Favus · 2025.12.21
3. **Open Source Contribution Academy — Excellence Award / Ministerial Prize** — Ministry of Science and ICT · Githru · 2025.12.05
4. **Programming Contest — Silver Prize** — The Catholic University of Korea · 2024.10.26
5. **GGUM Hackathon — Excellence Award** — Classroom/library-seat visualization · 2024.10.21

---

# AI Experience

- Loop and harness engineering: explicit inputs and verification criteria; test, review, and deployment failures feed the next iteration.
- Weekly reports: code validates periods/totals; AI explains verified changes.
- Real-screen guides linked to AX Campus contents, indexes, and image references.
- HWP screen specifications and test-case authoring with actual execution/review.
- Excel processing and analysis support with code-generated outputs and direct review.
- Product development: MES MCP reporting, Agent safety checks, Generative UI, organization-scoped sharing and Outbox, and metering/preview API integration.
