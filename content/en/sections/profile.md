---
{
  "id": "profile",
  "section": "hero",
  "name": "Junseok Oh",
  "role": "Full-Stack Developer",
  "email": "ojspp000@naver.com",
  "phone": "010-7593-4447",
  "github": "https://github.com/ojspp41",
  "website": "https://fullstack-portfolio-omega-one.vercel.app",
  "tagline": "I turn generative AI into products people can use at work",
  "subtagline": "From UI to APIs, permissions, Agents, data, testing, deployment, and operations",
  "badges": [
    "OSSCA 2025 Excellence Award (Ministerial Prize)",
    "Engineer, Information Processing",
    "OPIc IH"
  ]
}
---

# Turning AI into working products

I am a full-stack developer turning generative AI into products people can use at work. On an internal LLM platform for approximately 10,000 people across 13 affiliates, I expanded my scope from frontend development to metering, usage limits, permissions, sharing APIs, data aggregation, testing, deployment, and operations.

I developed an enterprise Agent safety-validation platform and a production-reporting Agent connecting an on-premise sLLM with MES MCP.

## Key Metrics

| Metric | Value | Description |
|---|---|---|
| Service scale | 10,000 | AI platform development for ~10,000 people across 13 affiliates |
| Metering query | 597× | User summary query · 95th percentile · 1M synthetic records |
| Re-renders | 99.6%↓ | Historical React Profiler replay with a fixed burst |
| Awards | Ministerial Prize | Ministry of Science and ICT · Githru |
| Commercial service | 2,000 users | COMAtching · ₩8M revenue |

## Full-Stack Coverage Map

| Layer | Built directly | Understood & integrated |
|---|---|---|
| Chat and file previews | I built the streaming chat interface and an in-app viewer so employees can open files without downloading them. | I connected the UI to document processing status and to the PDFs produced for previews. |
| Permissions and sharing | I built the approval flow for sharing AI agents across organizations and added a permission check at execution time. | I used the central API server’s shared authentication and service-to-service connections. |
| Error reports and Jira | I built the employee report form, the admin review board, and the API that sends selected reports to Jira. | I connected private image storage to Jira attachments through Atlassian MCP. |
| AI tools for employees | For manufacturing reports, I implemented comparisons with the previous period. In a separate safety tool, I built the inspection results and risk classification views. | I connected the on-premise language model to read-only tools for querying the manufacturing system. |
| Data and usage costs | I built an API that retrieves usage across organizations in one request, the cost dashboard, and Excel exports. | I connected Kafka usage events, daily summaries, and price and FX history to the reporting flow. |
| Build and deployment | I removed unnecessary runtime dependencies from the Docker image and checked that the smaller image could start the service. | I worked with operations on runtime permissions and monitoring in the on-premise Kubernetes environment. |

## Tech Stack

- **AI / Agent**: LLM Application · Generative UI · MCP · AI Agent · RAG Integration · LLM Streaming · Markdown Parser
- **Frontend**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4
- **State / RT**: Zustand · Recoil · TanStack Query · WebSocket / STOMP · EventBus
- **Backend**: Go / Gin · Python / FastAPI · Node.js · Java / Spring Boot · gRPC · Protobuf
- **Data / Infra**: MySQL · MongoDB · Redis · Kafka · MinIO · Docker Multi-stage
- **Test / Automation**: Jest · Go Test · Playwright · CI/CD · Smoke Test
- **Experience environment**: Keycloak · Kubernetes — integration and collaboration with shared authentication and infrastructure, not ownership of the entire architecture.

## Strengths

- **Leadership** — Team lead three times: COMAtching, Favus, and an in-house CoP
- **Product delivery** — AI platform development for ~10,000 people across 13 affiliates; first release with the team within six months of joining
- **Quantified impact** — Local summary query p95 228.665ms → 0.383ms · First-message recovery in 60/60 trials across two local Gateways · Docker 3.63GB → 1.82GB
- **Safety and operations** — Permissions, approvals, auditability, and normal/exceptional/adversarial QA
- **Continuous contribution** — Open-source contributions and VS Code Extension development
