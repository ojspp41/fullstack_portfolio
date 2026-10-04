---
{
  "id": "metering",
  "order": 2,
  "published": true,
  "title": "Usage & cost metering back office",
  "category": "fullstack",
  "badge": "Implementation · verification",
  "layers": [
    "Frontend / query API implementation",
    "Aggregation pipeline integration"
  ],
  "stack": [
    "Next.js",
    "Go",
    "MongoDB",
    "Redis",
    "Kafka",
    "ExcelJS"
  ],
  "metrics": [
    {
      "label": "Reproduced query",
      "value": "1,970ms → 2.6ms"
    },
    {
      "label": "Comparison requests",
      "value": "~34 → 1"
    }
  ],
  "summary": "Separated real-time quota checks from daily-summary reads, connecting query APIs to dashboards, Excel, and invoices. Shared ingestion and aggregation infrastructure is identified separately.",
  "measurement": "Query measurement on a 3M-record reproduction. I built the UI and query/comparison/quota APIs; Kafka ingestion, daily aggregation, and price/FX infrastructure are integration scope."
}
---

## Architecture

![Usage & cost metering back office — architecture](/diagrams/metering.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Built back-office UI, query/comparison/quota APIs, Excel exports, and invoices. Kafka ingestion, daily batches, and price/FX infrastructure are understood and integrated scope.

## Problem · goal (S·T)

- **Situation:** Repeatedly aggregating raw usage slowed queries. New services required coordinated changes to requests, UI, and billing rules.
- **Task:** Connect real-time quota checks and dashboards while preserving historical billing criteria and reducing repetitive comparison requests.

## Solution (A)

1. Connected Redis-based quota checks to quota APIs, while dashboards read daily summaries. Raw detail and summary reads serve separate purposes.
2. Implemented query/comparison filters, pagination, and the `source_usages` response contract. One response supplies current/previous periods and affiliate comparisons.
3. Reused the contract in dashboards, ExcelJS exports, and invoices. Invoice preview and PDF use the same data and amount calculations.

## Results (R)

- **3M-record reproduction:** query time 1,970ms → 2.6ms, approximately 750× improvement in the recorded comparison.
- **Affiliate comparison requests:** approximately 34 → 1. Preview, Excel, and PDF follow the same query and calculation criteria.

### Verification conditions · current limits

750× is a reproduced query result, not an improvement across all production requests. A separate 1M-record local comparison measured summary-query medians of 228.665ms → 0.383ms; aggregation runs of 26.924 seconds and 60.052 seconds verified stable counts and costs on rerun. Different data sets and operations are not combined into one metric.

My query/quota/UI contracts are distinguished from integration with the shared ingestion and aggregation pipeline.
