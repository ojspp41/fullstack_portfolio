---
{
  "id": "websocket",
  "order": 5,
  "published": true,
  "title": "Six-Stage WebSocket Defense",
  "category": "frontend",
  "badge": "Client-side real-time reliability",
  "stack": [
    "WebSocket",
    "STOMP",
    "React Profiler",
    "useRef",
    "Debounce"
  ],
  "metrics": [
    {
      "label": "Extreme bursts · 1ms",
      "value": "99.6% fewer commits",
      "note": "500 → 2"
    },
    {
      "label": "Mixed pattern",
      "value": "50% fewer updates",
      "note": "200 → 100"
    },
    {
      "label": "Normal pattern",
      "value": "0% commit-count change",
      "note": "60 → 60 · not CPU overhead"
    }
  ],
  "layers": [
    "Frontend built directly",
    "Client defenses without server changes"
  ],
  "summary": "Discarded late responses using the current session ID and batched bursts with 3ms debounce. Hidden tabs keep connections for five minutes; active generation is never closed by the idle rule.",
  "measurement": "Fixed-timestamp inputs were replayed before/after debounce and counted with React Profiler. Zero percent refers to normal-pattern commit counts, not measured CPU cost."
}
---

# Reliable Streaming Chat Without Server Changes

## Problem

Long LLM responses caused mixed sessions, hidden-tab disconnects, and UI stutter under bursts. The defense was implemented in the browser without changing the server.

## Six connection defenses

1. Heartbeats every 30 seconds detect loss.
2. Exponential reconnect backoff (1, 2, 4, 8, 16 seconds) with jitter reduces synchronized retries.
3. Duplicate detection, ownership locks, and token validation prevent duplicate connections.
4. Hidden tabs receive a five-minute grace period. Only idle connections close after it; active generation remains connected. Returning to the visible tab reconnects immediately.
5. Expired tokens are refreshed automatically.
6. Close codes receive distinct handling: 1000 normal, 1006 network loss, 1011 server error, 4001 policy violation/re-login.

## Late-response race

Aborting a request did not remove responses already in flight. React state comparisons suffered stale closures. The current session ID is tracked with `useRef`, and every incoming response is compared and discarded if obsolete.

## Burst-only batching

A 3ms debounce combines closely arriving fragments into one UI update. Normal fragments arrive farther apart and pass through unchanged.

| Pattern | Fragments | Before commits | After commits | Reduction |
|---|---:|---:|---:|---:|
| Burst, approximately 1ms intervals | 500 | 500 | 2 | 99.6% |
| Normal → burst → normal | 200 | 200 | 100 | 50% |
| Normal, 30 fragments/s | 60 | 60 | 60 | 0% |

React Profiler `onRender` counted commits while identical timestamped inputs were replayed before and after debounce. These are render-commit results; no claim of zero CPU cost or whole-system throughput improvement is made.
