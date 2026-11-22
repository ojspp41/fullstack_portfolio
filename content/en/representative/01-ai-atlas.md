---
{
  "id": "ai-atlas",
  "order": 1,
  "eyebrow": "Enterprise AI · Hansol PNS AI Development Team",
  "title": "AI Atlas — Enterprise AI Platform for 10,000 Users",
  "summary": "I built the employee chat interface and the admin dashboard. I developed the usage lookup and limit-check APIs in Go and connected them to the shared metering system.",
  "stack": [
    "React",
    "TypeScript",
    "Python / FastAPI",
    "Go",
    "Kafka",
    "Redis",
    "MongoDB",
    "Docker"
  ],
  "metrics": [
    {
      "label": "Platform scale",
      "value": "~10,000 users · 13 affiliates"
    },
    {
      "label": "First release",
      "value": "Within six months of joining",
      "note": "Built and released with the team"
    }
  ]
}
---

### From user interfaces to operations

- **Frontend** — Chat, Agent, Generative UI, WebSocket, admin back office, error reporting (VOC), file previews, and user-facing visualization of RAG processing and chunking/embedding status.
- **Backend / API** — Python/FastAPI and Go experience covering metering queries, usage limits, resource permissions, and sharing APIs. Go Gateway ownership is limited to the features I directly implemented.
- **Enterprise** — Multi-organization RBAC boundaries for read / execute / write / share, Agent sharing approval, revocation, and execution reauthorization.
- **Data / Operation** — Query APIs integrated with shared metering ingestion, daily aggregation, and price/FX infrastructure; Docker, testing, deployment, Smoke Tests, and operational automation.

Within six months of joining, I worked with the team on the first release for approximately 10,000 people across 13 affiliates. This does not imply ownership of the entire platform or shared infrastructure. RAG work means UX and integration for processing status, not development of chunking algorithms, embedding models, or a Vector DB.
