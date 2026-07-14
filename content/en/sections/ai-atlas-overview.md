---
id: ai-atlas-overview
section: ai-atlas
title: AI Atlas — Project Overview
period: 2025.10 ~ Present
scope: 13 Hansol Group affiliates · 10,000 users
role: Full-Stack (solo) — FE owner + part of the Go Gateway (back office · metering)
---

# AI Atlas — Internal LLM Service for 10,000 Users Across 13 Hansol Group Affiliates

## The Situation at Joining (Context & Problem)

- **Joined 2025.10** — a role owning the entire client of the company's internal LLM service
- **Senior engineer left right after I joined** — the 5-year senior departed mid-handover; code conventions, domain knowledge, and decision-making all went vacant at once
- **No PM, no designer, no QA** — no one had ever tried presenting RAG, chunking, or embedding to end users
- **Two months to launch to 10,000 users across 13 affiliates** — a deadline promised to executives; neither delaying nor shipping something rough was an option
- **Air-gapped network · security policies · a 13-affiliate permission matrix** — no external SaaS, CDN, or error trackers; solved alongside infrastructure and security

## Key Features (by Domain)

### Auth · Organization · Permissions — 4 features
| Domain | Description |
|---|---|
| auth | Login · Sign-up · Email verification |
| organization | Org/team CRUD · Switcher · Drag-and-drop org chart |
| permissions | Resource-based unified permissions (RBAC) |
| api-keys | External integration key issuance · revocation |

### Agent Ecosystem — 4 features
| Domain | Description |
|---|---|
| agents | Agent CRUD · Templates · Full-screen prompt editor · MCP/ToolSet/SubAgent connections |
| tools/mcp | MCP server catalog · Approval flow |
| tools/toolSets | ToolSet registration · Approval status management |
| schedules | Automated agent runs (recurring / session mode / run history) |

### Chat · Sessions — 3 features
| Domain | Description |
|---|---|
| chat | ChatGPT-style UI · ChartRenderer · MermaidRenderer · Streaming markdown · Widgets/lightbox |
| sessions | Session CRUD · State · Sharing |
| sessionTools | Tool-call tracking within sessions |

### Content · Collaboration — 5 features
| Domain | Description |
|---|---|
| documents | PDF · DOCX · XLSX · HWP parsing and management |
| files | Upload manager · Cart · Existing-file picker |
| share | Sharing 4 resource types (Agent · Session · Document · File) across 4 tiers (user/team/org/system) |
| announcements | Announcement authoring · Category filters |
| notifications | Real-time notifications · Filters · User preferences |

### Operations · Admin (Back-Office) — 3 features
| Domain | Description |
|---|---|
| token-usage | Token usage metering dashboard by user, org, model, and day/month (recharts) |
| migration | System data migration — permission checks · per-resource aggregation |
| settings/system | System · User · Org · MCP · ToolSet management |

## Tech Stack

- **FE**: React 19 · Next.js 15 · TypeScript (strict) · Tailwind v4 · shadcn/ui
- **State**: Zustand · TanStack Query · WebSocket/STOMP · Jest · Playwright
- **BE / Gateway**: Go 1.24 · Gin · gRPC · Protobuf · Kafka · Redis · MinIO · MySQL · MongoDB
- **Infra**: Docker · Kubernetes · CI/CD · Air-gapped deployment
