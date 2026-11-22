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
      "label": "First-message recovery · local",
      "value": "60/60 trials"
    },
    {
      "label": "Duplicate executions",
      "value": "0 in 60 trials"
    }
  ],
  "summary": "An open socket revalidates the user after a token refresh. After reconnect, the client reconciles stored replies. A follow-up branch uses a request ID to check whether the first question was accepted.",
  "measurement": "Follow-up branch with two local Gateways and a fixed-response model. Lost acknowledgements, concurrent sends, and termination just after receipt were tested 20 times each."
}
---

> **My scope:** I implemented token refresh on the open socket in the frontend and Gateway. I connected the team’s server-side recovery records to the UI so it could reconcile reply order with the current session history after reconnect.

## Architecture

![WebSocket lifecycle & streaming UI stability — architecture](/diagrams/websocket.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

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

The historical Profiler replay recorded 99.6% fewer render commits for a fixed burst. The original trace has not been matched to the current implementation. Normal-paced commits remain unchanged. Network latency, perceived response time, and overall service throughput were not measured.

### Recovering a first message after reconnect

A restored connection leaves one question open: did the server accept the first message? A follow-up branch keeps an ID for each send and looks up its status if the acknowledgement (ACK) is lost. The Gateway stores the receipt and pending work together before acknowledging the request.

I tested a lost ACK, simultaneous sends of the same ID, and a process exit just after storage, 20 times each across two local Gateways. Each of the 60 trials recorded one user message, one execution start, and one saved answer. The model returned a fixed response.

A separate local UI experiment sent 500 chunks at 1ms intervals. A 16ms buffer reduced store writes from 500 to 24, while the 95th percentile from receipt to content commit rose from 19.7ms to 33.9ms.
