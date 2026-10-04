---
id: ai-atlas-overview
section: ai-atlas
title: AI Atlas — Project Overview
period: Oct 2025 — Present
scope: 13 Hansol Group affiliates · ~10,000 eligible people
role: Full-Stack · Frontend Owner
---

# AI Atlas — Internal LLM Service for 13 Affiliates and ~10,000 Eligible People

## From user problems to launch

Within six months of joining, I worked with the team on the first release for approximately 10,000 people across 13 affiliates. Without a product manager or designer, I defined user problems, owned the frontend, and implemented selected Go Gateway query/quota/sharing/preview features and integrated them with the shared metering infrastructure.

## AI / LLM product development

- Generative UI JSON recovery and widget isolation
- Streaming markdown parsing and WebSocket client defenses
- User-facing visualization of RAG processing and chunking/embedding status—not development of algorithms, models, or a Vector DB
- Cross-organization Agent approval, execution, and revocation
- In-app file previews and isolated serving of DRM-processed copies

### Operations & Admin — Usage and Cost Metering

I built query/comparison APIs, usage limits, query hooks, and browser-side ExcelJS exports for dashboard requirements, integrating them with shared Kafka ingestion, daily aggregation, and price/FX infrastructure. The `source_usages` array contract automatically carries new services into filters, colors, charts, and Excel.

## Public scope

Actual internal UI, data, and source code are not public. The case studies reconstruct technical structures and ownership, clearly separating local validation from production results.
