---
id: metering
order: 1
title: AI Usage & Cost Metering + Billing Back Office
category: fullstack
badge: Full-Stack Flagship · FE + BE Built Hands-On
stack: [Go, Kafka, MongoDB, Redis, React Query, ExcelJS, REST API]
metrics:
  - { label: "Query latency p95", value: "1,970ms → 2.6ms", note: "~750x faster · daily-batch pre-aggregation" }
  - { label: "Rows scanned", value: "3M → 1,440 rows", note: "~2,000x smaller, constant-size" }
  - { label: "Excel export memory", value: "1,871MB → 8.2MB", note: "server-side streaming · ~230x lower" }
  - { label: "Quota enforcement", value: "instant 429 block", note: "Redis counter · 100 calls/min" }
layers: ["FE direct", "BE API direct", "Pipeline integration (Kafka·SCD-2)"]
summary: A back office where I defined the data shape the UI needed first, then reverse-engineered the backend aggregation to produce exactly that shape. I built the metering query API and the usage quota control API myself.
---

# AI Usage & Cost Metering + Billing Back Office

> **FE built hands-on** — dashboard · shared list-query hook · ExcelJS multi-sheet export · 6 filters synchronized to the URL
> **BE built hands-on** — metering query API (6 filters · pagination · Excel export) · usage quota control API (per-plan quotas, real-time counter blocking)
> **Design understanding & integration** — Go pipeline (Kafka ingestion · daily-batch pre-aggregation · idempotency · SCD-2 price/exchange-rate history)

## S — Situation

As the AI service grew, administrators needed a back office to see and control who was using how much and what they would be billed. This wasn't three features to bolt on separately — it was **one problem that had to flow through a single pipeline**.

- Call records arrive via Kafka, and with at-least-once delivery the same record can arrive more than once.
- Recomputing millions of raw records on every query is slow and expensive.
- Prices and exchange rates change over time; overwriting old values makes past invoices impossible to reproduce (no settlement, no audit).
- Without quotas, unbounded calls make costs impossible to control.

## T — Task

1. Aggregate call records that arrive with duplicates mixed in, **safely even when processed twice (idempotent)**
2. **Pre-aggregate into summary data** the dashboard can render directly, with no further transformation
3. **Recompute and verify past invoices against the rates in effect at the time**, even after prices and exchange rates change
4. When usage exceeds the plan quota, **block and warn in real time at the call path itself**

## A — Action

### Export end-to-end flow (built hands-on, from request to file)

```
[FE] Click export → [BE] Metering query API (6 filters · pagination)
  → [BE] ExcelJS streaming (summary + detail sheets) → [FE] File download
```

**BE**
- Moved large Excel generation from the browser to **server-side streaming** — the ExcelJS streaming writer flushes rows as they arrive, and the data source reads page by page, so memory stays flat regardless of row count
- Combined the 6 filters into a single query, producing summary + detail multi-sheet workbooks
- Usage quota control: when a plan quota is exceeded, the gateway's **Redis counter blocks the call with an immediate 429 before it ever goes out, plus a warning**

**FE**
- Persisted the 6 filters in the URL — refresh or share a link, and the same view comes back
- A shared list-query hook reuses loading, error, and pagination handling
- Export progress / completion / failure states handled in the UI

**Pipeline (design understanding & integration)**
- Upserts on a unique index over the aggregation key make **re-runs idempotent** — running twice yields the exact same 1,440 summary rows and identical cost totals
- Prices and exchange rates are never deleted; they **accumulate as SCD-2 versions** — an invoice from months ago reproduces with the prices in effect back then

## R — Results

| Metric | Before | After |
|---|---|---|
| Query latency p95 | 1,970ms (on-the-fly aggregation) | **2.6ms** (daily-batch pre-aggregation · ~750x) |
| Rows scanned | 3,000,000 raw records | **1,440** summary rows |
| Idempotent aggregation | — | Row counts and cost totals unchanged across two runs |
| Excel memory (200K rows) | 1,871MB (browser) | **8.2MB** (server streaming) · flat at 22.4MB even for 500K rows |

- Manual settlement reports replaced by automated generation
- Administrators can query and export directly → eliminated the recurring data-extraction requests (VOC)

## Anticipated Questions

- **Q. Why pre-aggregation?** On-the-fly aggregation slows down linearly as raw data grows. By reading only a once-daily summary, query cost becomes a constant.
- **Q. How do you handle Kafka duplicates?** Unique index on the aggregation key + upsert. Because re-running is inherently safe, disaster recovery is simply running it again.
