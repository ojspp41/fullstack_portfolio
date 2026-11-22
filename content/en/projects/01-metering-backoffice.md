---
{
  "id": "metering",
  "order": 2,
  "published": true,
  "title": "Usage & cost metering back office",
  "category": "fullstack",
  "badge": "AI Atlas",
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
      "label": "Local user summary · 95th percentile",
      "value": "228.665ms → 0.383ms"
    },
    {
      "label": "Comparison requests",
      "value": "~34 → 1"
    }
  ],
  "summary": "Separated real-time quota checks from daily-summary reads, connecting query APIs to dashboards, Excel, and invoices. Shared ingestion and aggregation infrastructure is identified separately.",
  "measurement": "One day of synthetic usage, 100 users and one million records. The timing covers the server query for one user’s summary over 50 sequential reads after warm-up."
}
---

> **My scope:** I designed how usage events flow through daily aggregation, billing, quota checks, and dashboard queries. I built the query, comparison and quota APIs, dashboard, Excel export, and invoices on the shared ingestion and aggregation infrastructure.

## Architecture

![Usage & cost metering back office — architecture](/diagrams/metering.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

## Problem · goal

- **Situation:** Repeatedly aggregating raw usage slowed queries. New services required coordinated changes to requests, UI, and billing rules.
- **Task:** Connect real-time quota checks and dashboards while preserving historical billing criteria and reducing repetitive comparison requests.

## Solution

1. **Check the limit before the call.** My quota API checks the organization’s and employee’s accumulated spend when a question is sent. It blocks calls that have reached a limit.
2. **Record usage and calculate cost.** After the call, the shared system records usage and calculates daily totals using the prices and exchange rates in effect at the time. I connected those totals to the query API.
3. **Compare affiliates.** My query API returns affiliate totals for the selected and preceding periods in a single request. The dashboard and Excel export use the same results.

## Results

- **User summary query p95:** 228.665ms reading 10,000 raw records for one user, versus 0.383ms reading one daily summary.
- **Affiliate comparison requests:** approximately 34 → 1. Preview, Excel, and PDF follow the same query and calculation criteria.

### Verification conditions · current limits

Generating and storing the daily summaries took 26.924 seconds in one run. A separate observation saw the counter in MongoDB 60.052 seconds after the flush timer started. The query benchmark excludes batch generation, HTTP and authentication.

### Follow-up work

The dashboard compares token usage for new and existing agents by organization and period, and retains both filters in the detail view. If Redis lacks a usable total, the quota check reads MongoDB. When neither store can establish spend, enforced mode stops the call.

For selected text requests, a separate path reserves the maximum cost before execution and settles actual spend after streaming. At the time of the record, reservations were disabled by default. Integration test execution and production rollout were unconfirmed.

An invoice branch moved the billing document and its version to the server and rechecked permissions at download. Reusing Chromium with a fresh context per request reduced median warm conversion time from 1.53s to 0.66s for a synthetic nine-page invoice locally. This measures PDF conversion and excludes authentication and network time.
