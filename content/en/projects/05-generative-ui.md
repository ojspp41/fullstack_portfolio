---
{
  "id": "generative-ui",
  "order": 4,
  "published": true,
  "title": "Generative UI — Recovering Broken JSON",
  "category": "frontend",
  "badge": "AI / LLM",
  "stack": [
    "TypeScript",
    "JSON sanitize",
    "Error Boundary",
    "EventBus",
    "fixture benchmark"
  ],
  "metrics": [
    {
      "label": "JSON recovery",
      "value": "60% → 97.5%",
      "note": "40-fixture benchmark"
    },
    {
      "label": "Parse failures",
      "value": "16 → 1",
      "note": "~94% reduction · not render-failure count"
    },
    {
      "label": "Failure scope",
      "value": "Whole session → one widget",
      "note": "Error Boundary isolation"
    }
  ],
  "layers": [
    "Frontend built directly",
    "Model-output contract design"
  ],
  "summary": "Built six cleanup stages and two-pass parsing for untrusted model output. Per-widget Error Boundaries isolate render failures, and EventBus avoids rerendering unrelated messages.",
  "measurement": "Recovery is measured on 40 parsing fixtures. Render errors are isolated separately; async and event-handler exceptions require try/catch."
}
---

# Recovering Broken Model Output

## Problem and solution

LLM output is not trusted JSON. I implemented two-pass parsing: try `JSON.parse`, then sanitize and retry on failure. Unrecoverable input is rejected.

Cleanup order is important:

1. Remove code fences.
2. Repair malformed boolean quotes.
3. Remove trailing commas.
4. Insert missing separators.
5. Normalize special characters.
6. Check structural balance.

An early balance check misclassified malformed quotes and rejected repairable input. Moving normalization ahead of validation fixed this, with regression fixtures pinning the order.

## Widget isolation and interactions

Invalid widget data could unmount the entire chat tree. A per-widget `GenUIErrorBoundary` now renders a local fallback while retaining the conversation.

Interactions use typed EventBus pub/sub instead of changing React Context values for every message. `EventMap` prevents event-name mistakes, and `useBusEvent` cleans up subscriptions. Unrelated message rerenders were zero in this interaction path.

Error Boundaries do not catch asynchronous or event-handler exceptions; those paths use explicit try/catch handling.

## Streaming UX

Partial JSON stays in a skeleton/typing-dots state instead of repeatedly mounting incomplete widgets. A complete validated payload mounts the real widget once; unrecoverable output shows a fallback.

## Measurement

| Metric | Before | After |
|---|---|---|
| Parsing success | 60% | 97.5% |
| Failed payloads | 16 | 1 |

Forty fixtures cover fences, malformed boolean quotes, trailing commas, unbalanced braces, and combined defects. Parse failures decreased by **~94%**. These are parsing results, not a 47-to-1 render-failure measurement. Widget render exceptions are a separate isolation concern.
