---
id: websocket
order: 4
title: 6-Layer Real-Time Communication Defense (WebSocket)
category: frontend
badge: Real-Time Reliability
stack: [WebSocket, STOMP, React Profiler, useRef, Debounce]
metrics:
  - { label: "Extreme burst (1ms interval)", value: "re-renders 99.6%↓", note: "500 → 2 commits" }
  - { label: "Real-world pattern", value: "UI updates 50%↓", note: "normal → burst → normal" }
  - { label: "Normal responses", value: "0% overhead", note: "no change, by design" }
layers: ["FE direct", "Protocol/server contract understanding"]
summary: Solved response interleaving, background-tab disconnects, and UI jank during long AI responses with a 6-layer client-side defense structure — no server changes.
---

# 6-Layer Real-Time Communication Defense — Chat Where the AI Response Never Breaks

## Background

As the internal AI chatbot expanded to multiple organizations and multiple concurrent sessions, three problems kept recurring during responses that stream for tens of seconds — **response interleaving · background-tab disconnects · UI jank when responses pile up**. Leaving the server untouched, I designed and built a 6-layer defense structure on the client.

## The 6-Layer Defense Structure

1. **Connection liveness signal (heartbeat)** — signal exchange every 30 seconds; immediate reconnect on no response
2. **Exponential backoff + jitter** — 1s → 2s → 4s → 8s → 16s plus random jitter to prevent a reconnect stampede (thundering herd)
3. **Duplicate connection blocking** — three stages: duplicate detection → ownership lock → auth key verification
4. **Tab state awareness (Page Visibility)** — hidden tabs pause receiving; immediate reconnect on return
5. **Automatic auth key renewal (token refresh)** — on expiry detection, reconnect with no interruption
6. **Per-close-code handling** — 1000 normal / 1006 network drop / 1011 server error / 4001 policy violation (re-login)

## Race Condition — Problem → Attempts → Fix

```
New LLM session starts → a late response from the previous request arrives, interleaving characters

Attempt 1 (failed)  Cancel the request with abort → responses already in flight keep arriving
Attempt 2 (failed)  Compare session IDs via state → stale closure reads the old value
Final fix           Track the current session ID in useRef; compare on every response and discard stale ones
```

## Batching UI Updates — 3ms Debounce

| Arrival pattern | Chunks | Before | After | Reduction |
|---|---|---|---|---|
| Burst (1ms interval) | 500 | 500 | **2** | 99.6% |
| Mixed (normal → burst → normal) | 200 | 200 | **100** | 50.0% |
| Normal (30 chunks/sec) | 60 | 60 | 60 | 0% (by design) |

**Measurement method**: commit counts collected via the React `<Profiler>` onRender callback. Identical input with fixed arrival timestamps was replayed with and without the debounce for comparison.

**Key insight**: for normal responses, chunk gaps exceed 3ms, so batching never kicks in. The design intent is to **batch only under load and pass through untouched when traffic is normal**.

## Results and Lessons

- Response interleaving eliminated · no more disconnects on background-tab return · no more jank when responses pile up
- Internalized React's stale closure limitation and the pattern of moving state outside React (useRef)
