---
{
  "id": "session-list",
  "order": 8,
  "published": true,
  "title": "Chat-list query optimization with permissions preserved",
  "category": "fullstack",
  "badge": "AI Atlas",
  "layers": [
    "Go query / index implementation",
    "Frontend loading-state implementation"
  ],
  "stack": [
    "Go",
    "MongoDB",
    "Next.js",
    "Compound Index"
  ],
  "metrics": [
    {
      "label": "Local query + filter",
      "value": "378.36ms → 18.72ms"
    },
    {
      "label": "Response comparisons",
      "value": "200 matching responses"
    }
  ],
  "summary": "Reduced full permission and message-body reads before displaying eight list items. Preserved authorization and response contracts, while fixing premature empty-state messages.",
  "measurement": "Local synthetic ~14K records, sequential concurrency 1, covering list + filter queries. HTTP, authentication, networking, frontend time, and index creation cost are excluded."
}
---

> **My scope:** I defined equivalence checks for authorization and returned results. With AI assistance I revised Go queries, compound indexes, and loading states, then compared the responses before and after the change.

## Architecture

![Chat-list query optimization with permissions preserved — architecture](/diagrams/query.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

## Problem · goal

- **Situation:** Rendering eight items required reading all allowed IDs and message bodies first. The UI could show an empty state before the request completed.
- **Task:** Preserve permissions and returned results while lowering query cost and delaying empty-state feedback until the current request finishes.

## Solution

1. Project only fields needed by the list, excluding message bodies. Replace collecting every allowed ID with effective-permission rechecks for read-exclusion candidates.
2. Add compound indexes for user/organization/latest-first reads and exclusion-candidate queries. Include a same-index control to separate query-structure changes from index changes.
3. Separate owned/shared-chat loading and show empty results only after the current request completes. Compare returned IDs, totals, and filter outputs independently of latency.

## Results

- **~14K local records, list + filter p95:** 378.36ms → 18.72ms, approximately 95.1% lower.
- **200 response comparisons:** identical result digests and unchanged fixture documents.

### Verification conditions · current limits

Warmed local Apple M5 / MongoDB 8.0.28 / Go 1.24.5, AB/BA order, concurrency one, default first-page sorting, synthetic data for one organization/user/agent. HTTP, authentication, networking, frontend rendering, and index creation are excluded. This is neither a full permission regression suite nor a production-latency measurement.

### Document lists and attachment lookups

The document query now selects the final page in the database and reuses upload records it already read. In a separate local synthetic experiment, 10 documents reached detail processing, down from 463. The attachment dialog checks whether a file is linked before fetching its details. Across 10,000 synthetic chats, the link check and first detail lookup took two requests, down from 100.
