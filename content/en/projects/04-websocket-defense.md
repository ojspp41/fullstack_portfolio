---
{
  "id": "websocket",
  "order": 6,
  "published": true,
  "title": "WebSocket lifecycle & streaming UI stability",
  "category": "frontend",
  "badge": "Implementation · verification",
  "layers": [
    "Connection / response handling implementation"
  ],
  "stack": [
    "React",
    "WebSocket",
    "STOMP",
    "React Profiler"
  ],
  "metrics": [
    {
      "label": "Burst render commits",
      "value": "500 → 2"
    },
    {
      "label": "Profiler measurement",
      "value": "99.6% reduction"
    }
  ],
  "summary": "Controlled duplicate connections, stale-socket events, and hidden-tab teardown. Short batching reduces burst commits while preserving final responses and normal-paced behavior.",
  "measurement": "Render-commit counts from fixed React Profiler patterns. The 99.6% result does not measure network latency or overall service performance."
}
---

## Architecture

![WebSocket lifecycle & streaming UI stability — architecture](/diagrams/websocket.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Built client connection lifecycle, session state, and response application. This does not claim ownership of the complete server transmission protocol.

## Problem · goal

- **Situation:** Duplicate connections, stale-socket events, and hidden-tab teardown interrupted responses. Per-chunk state updates increased rendering load during bursts.
- **Task:** Prevent duplicate sends and streaming loss while reducing unnecessary burst commits without changing normal-paced behavior.

## Solution

1. Apply heartbeat, exponential backoff, and jitter. Connection guards and generation checks reject duplicate connections and stale-socket events; authentication failures stop reconnecting.
2. Close only idle connections after a **five-minute hidden-tab interval**, retaining connections during streaming. Suppress repeated active-session configuration sends.
3. Batch chunks over short 3ms windows and flush the final response. Measure burst, mixed, and normal-paced patterns separately.

## Results

| React Profiler pattern | Before | After |
|---|---|---|
| Burst · 500 chunks | 500 commits | 2 commits · 99.6% reduction |
| Mixed | 200 commits | 100 commits |
| Normal-paced | 60 commits | 60 commits |

### Verification conditions · current limits

99.6% is the render-commit reduction for a fixed burst pattern. Normal-paced commits remain unchanged. Network latency, perceived response time, and overall service throughput were not measured.
