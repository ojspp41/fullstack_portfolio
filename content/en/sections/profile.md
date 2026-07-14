---
id: profile
section: hero
name: Junseok Oh
role: Full-Stack Engineer · AI / LLM Application
email: ojspp000@naver.com
phone: 010-7593-4447
github: https://github.com/ojspp41
website: https://portfolio-nextjs-puce-pi.vercel.app
tagline: A full-stack developer who defines problems himself and solves them end to end
subtagline: From the UI to server contracts, pipeline integration, and infrastructure — full-stack across the back-office admin
badges: ["OSSCA 2025 Excellence Award (Ministerial Prize)", "Open Source Developer Contest Winner", "Engineer, Information Processing", "OPIc IH"]
resumePdf: /junseok-oh-fullstack-portfolio.pdf
---

# A Full-Stack Developer Who Defines Problems Himself and Solves Them End to End

I am a full-stack developer who defines user problems firsthand and solves them end to end — in environments with no product manager or designer.

On **AI Atlas**, Hansol Group's internal AI (LLM) service serving 10,000 users across 13 affiliates, I owned the frontend and **personally designed and implemented the server contracts (RESTful APIs) for the back-office admin (usage and cost metering, billing)** — metering query APIs, usage-limit control APIs, file preview endpoints, and server-side PDF capture.

For the Go-based central API Gateway (gRPC · Kafka · Redis · MinIO) that this frontend connects to, I understood the design intent and integrated against it. I design everything from the screen down to the server contract, and I back every decision with numbers.

## Key Metrics (Hero Stats)

| Metric | Value | Description |
|---|---|---|
| Service scale | 10,000 | Internal LLM service for 13 Hansol Group affiliates |
| Re-renders | 99.6%↓ | Measured with React Profiler under response bursts |
| Awards | Ministerial Prize | Ministry of Science and ICT · Githru open source |
| Commercial service | 2,000 users | COMAtching · ₩8M revenue |
| Query speed | 750x↑ | Metering 1,970ms → 2.6ms (pre-aggregation) |
| Docker image | 50%↓ | 3.63GB → 1.82GB, caught a hidden 1.56GB regression |

## Full-Stack Coverage Map

| Layer | Built directly | Understood & integrated |
|---|---|---|
| UI | Streaming markdown parser · Generative UI · 6-layer WebSocket defense · RBAC can() · Back-office dashboard | — |
| API / Server contracts | Metering queries · Usage-limit controls · File preview endpoints · PDF capture · ExcelJS streaming | permission.go (multi-source SSOT) |
| Data / Pipeline | COMAtching MySQL schema·joins·indexes | Kafka ingestion · Daily batch pre-aggregation · SCD-2 |
| Infra | Docker image 50%↓ · Smoke tests | K8s · Air-gapped operations |

## Tech Stack

- **AI / LLM**: LLM Streaming · Generative UI Pipeline · RAG Integration · Markdown Parser · MCP
- **Frontend**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4
- **State / RT**: Zustand · Recoil · TanStack Query · WebSocket / STOMP · EventBus
- **Backend**: Go 1.24 · Gin · gRPC · Protobuf · Kafka · MinIO · MySQL · MongoDB · Redis
- **Infra / Test**: Docker Multi-stage · Kubernetes · CI/CD · Jest · TDD · Playwright

## Strengths & Collaboration

- **Leadership** — Served as team lead three times (COMAtching · Favus · in-house CoP)
- **Ownership** — Led the launch of a 10,000-user service
- **Quantified impact** — Re-renders 99.6%↓ · Docker image 50%↓ · Failure rate 90%↓
- **Continuous contribution** — Open source contributions + VSCode extension development
