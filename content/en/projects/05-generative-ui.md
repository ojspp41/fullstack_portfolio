---
id: generative-ui
order: 5
title: Generative UI Pipeline — Recovering Broken JSON
category: frontend
badge: AI / LLM
stack: [TypeScript, JSON sanitize, Error Boundary, EventBus(pub/sub), bench fixture]
metrics:
  - { label: "JSON recovery rate", value: "60% → 97.5%", note: "measured on a 40-fixture bench" }
  - { label: "Widget failures", value: "~95%↓", note: "render-failing payloads 47 → 1" }
  - { label: "Failure blast radius", value: "whole session → 1 widget", note: "Error Boundary isolation" }
layers: ["FE direct", "Model output contract design"]
summary: Built on the premise that model output cannot be trusted — a 6-step sanitize + 2-pass parse recovers broken JSON so widgets still render. Recovery rate is measured in code, so regressions are caught automatically.
---

# Generative UI Pipeline — Never Trust Model Output

## Multi-Stage Recovery Flow

Valid input passes through; broken input goes through recovery steps 1–6 → if it still fails, reject.

| # | Rule | Broken → Fixed |
|---|---|---|
| 1 | Strip fences | ` ```json{…}``` ` → `{…}` |
| 2 | Boolean repair | `true"` → `true` |
| 3 | Trailing commas | `["a",]` → `["a"]` |
| 4 | Comma insertion | `}{` → `},{` |
| 5 | Special characters | `"line ⏎ break"` → `"line \n break"` |
| 6 | Balance check | `{"a":[1,2}` → ✗ reject |

**2-pass parsing**: if the first `JSON.parse` fails, sanitize and try a second time.

### Why this order — sanitize first, validate last

- **Problem**: with step 6 (bracket balance check) placed before sanitization, JSON with broken quotes (`true"`) was discarded before recovery ever got a chance.
- **Cause**: a broken quote flips the "inside/outside a string" state, which throws off the bracket count.
- **Fix**: normalize characters first with steps 2–5, then validate in step 6. Locked in with fixture tests to prevent regression.

## Widget Isolation — Keep the Chat Alive Even When a Widget Breaks

**Problem definition** When a chart widget rendered with bad data, the entire chat screen unmounted and the accumulated conversation was lost.
**Hypothesis** Without an Error Boundary, React unmounts the whole tree.
**Verification** Injected a deliberately broken fixture (unbalanced brackets) to reproduce — the version without a Boundary lost the entire session; with a per-widget Boundary, only the widget fell back.

```tsx
<GenUIErrorBoundary>
  <CardSelectionWidget … />
</GenUIErrorBoundary>
```

**Fix 2 — an event bus (pub/sub) instead of Context**: with Context, every value change re-rendered all N chat messages. Switching to a global event bus takes interactions out of the React tree entirely (zero re-renders of unrelated messages). Event-name typos and missed unsubscribes are blocked by an `EventMap` type and a `useBusEvent` hook (with cleanup).

**Retrospective**: discovered that Error Boundaries can't catch async or handler exceptions, so I added try/catch convergence logic. Known breakage patterns are now caught automatically by the regression bench.

## Removing Flicker During Streaming — skeleton / dots

Widget JSON streaming in token by token is perpetually incomplete. Rendering on arrival makes half-built widgets mount and unmount repeatedly. I separated three states — **streaming → skeleton·typing-dots / broken → fallback / complete → the real widget** — to stabilize the first paint.

## Measured Results (genui-parse.bench)

| Metric | Before | After |
|---|---|---|
| Parse success rate | 60% | **97.5%** |
| Render-failing payloads | 47 | **1** |
| Widget failures | — | **~95%↓** |

Widget catalog: form widget (8 field types) · card selection (single/multi) · chart widget (data visualization)
