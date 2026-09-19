---
{
  "id": "metering",
  "order": 1,
  "published": true,
  "title": "AI Usage & Cost Metering — Pipeline to Back Office",
  "category": "fullstack",
  "badge": "Frontend, backend & metering pipeline built directly",
  "stack": [
    "Go",
    "Kafka",
    "MongoDB",
    "Redis",
    "React Query",
    "ExcelJS"
  ],
  "metrics": [
    {
      "label": "Query time",
      "value": "1,970ms → 2.6ms",
      "note": "3M-record reproduction → 1,440 daily summaries · ~750×"
    },
    {
      "label": "Affiliate comparison requests",
      "value": "~34 → 1",
      "note": "Browser request count · ~97.1% reduction"
    },
    {
      "label": "Settlement history",
      "value": "Versioned price & FX",
      "note": "Reproduce costs using the version valid at usage time"
    }
  ],
  "layers": [
    "Frontend built directly",
    "Backend APIs built directly",
    "Metering pipeline built directly"
  ],
  "summary": "Derived API contracts from dashboard requirements and connected pre-call quota checks, Kafka ingestion, daily aggregation, price/FX history, and browser-side Excel exports.",
  "measurement": "Headline query time is from a 3M-record reproduction with real MongoDB aggregation. Separate current-code local measurements use 1M records with MongoDB and Redis; neither is a whole-system production improvement."
}
---

# From an AI Call to Costs and Operational Metrics

## Situation

Administrators needed usage and costs by organization, user, Agent, and service. Recalculating millions of raw records on every request was expensive. Keeping only the current price could not reproduce past billing, and fixed service fields required frontend and backend changes for each new service.

## Ownership

I directly implemented metering query and comparison APIs, quota controls, Kafka event ingestion and failure handling, daily aggregation with composite-key upserts, price/FX history, dashboard hooks, URL filters, and browser-side ExcelJS multi-sheet exports. This ownership covers the metering event path, not the entire shared Kafka infrastructure.

## Technical decisions

```text
AI request → Redis quota check → AI usage record → Kafka
→ daily summaries → usage-time price/FX → query/comparison API
→ dashboard and browser-side ExcelJS export
```

- Raw usage is stored in MongoDB. Redis keeps current user/organization charge counters for the next request's quota decision.
- In-memory increments flush to MongoDB counters every 60 seconds, and daily reconciliation corrects drift.
- Dashboard summaries use a user·organization·API-key·source·date composite key and upsert to converge safely on reruns.
- Price and FX histories preserve validity intervals so past charges can be reproduced.
- The comparison API combines current/previous periods, service and model distributions, active users, and top Agents. Browser requests fell from about 34 to one. Database calls are bounded to three aggregations plus at most one Agent-name lookup.
- The dynamic `source_usages[{source,total_tokens,charge_amount}]` contract preserves API-only services and automatically drives filters, colors, charts, and Excel. A frontend normalization layer supports both legacy fields and the new array during staged deployment.

## Verification

The earlier 3M-record reproduction reported query time of 1,970ms → 2.6ms (~750×) and 1,440 daily summaries. It is separate from the current-code local measurement below.

### Current-code local measurements — September 14, 2026

Apple M5, 16 GiB RAM, macOS arm64, Go 1.24.5, MongoDB 8.0.28, Redis 8.8.1. One million synthetic records, 100 users, 10 organizations, and 20 Agents. Source hashes for 26 measured files matched the current code.

| Measurement | Result | Scope |
|---|---|---|
| User detail calculated from raw data | 228.665ms p95 | 10,000 records for that user |
| User detail from current summary query | 0.383ms p95 | One daily summary |
| Total tokens/cost from raw data | 1969.781ms p95 | 1M records · comparison query |
| Total tokens/cost from summaries | 0.226ms p95 | 100 summaries · comparison query |
| Generate/store four daily summary types | 26.924s | One run |
| Period-counter reconciliation | 29.764ms | One run |
| Save record → Redis → in-memory increment | 0.366ms p95 | 1,000 CreateMetering calls |
| Redis counter read | 0.093ms p95 | 50 calls |
| Mongo counter flush calculation | 13.229ms | One run · 100 users/10 organizations |
| First Mongo observation after 60s timer | 60.052s | From ticker start · 100ms observation uncertainty |

Queries used three warmups and 50 sequential runs with full cursor consumption. p95 is the 48th sorted sample. Batch, reconciliation, flush, and timer measurements were single runs. Expected real-time charges of ₩4,550 matched Redis and Mongo after the timer. Raw and summary tokens, costs, function counts, and API counts/costs matched.

Including all four summary-generation jobs and reconciliation, a calculated 100-query daily example is **144.288s → 26.972s (~5.3x)**, with a break-even near 19 total-sum queries per day. This is a sum of measured mean latencies, not a separately executed full workload, CPU metric, or throughput improvement.

## Boundaries and next steps

- The shared consumer's default redelivery policy is known; the metering consumer's actual wiring policy still needs confirmation.
- Post-call cost finalization means concurrent calls and event delays can overshoot a quota slightly.
- Daily summaries trade same-day freshness for cheap repeated queries; watermark-based incremental aggregation is a future extension.
- Decimal arithmetic and a fixed rounding point are needed to tighten monetary accuracy.
- New services appear automatically in the UI, but price policy and display-name validation still need operational monitoring.
