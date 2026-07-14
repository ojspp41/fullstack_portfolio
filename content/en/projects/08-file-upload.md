---
id: file-upload
order: 8
title: File Upload System — Shared Component Design
category: frontend
badge: Architecture Decisions
stack: [React, AbortController, axios interceptor, state machine]
metrics:
  - { label: "Contexts unified", value: "3 → 1 component", note: "agent registration · chat attachment · document management" }
  - { label: "Duplicate handling", value: "4 branches", note: "HTTP 409 reinterpreted as a normal flow" }
  - { label: "State machine", value: "6 states", note: "partial-failure recovery" }
layers: ["FE direct", "API contract (409) design perspective"]
summary: One dialog, three contexts unified into a single upload screen — with only upload timing, duplicate policy, and session dependency branching per mode by design.
---

# File Upload System — One UI, Policies Injected

## S/T — Why a Shared Component

The same dialog, but a different policy in every context.

| Mode | Upload timing | Characteristic |
|---|---|---|
| Agent registration | Batched at form save (deferred) | Bound to the form lifecycle |
| Chat attachment | Create the session if none exists, then start | Session dependency |
| Document management | Duplicate check → immediate, after user confirmation | Duplicate policy |

A single upload function couldn't cover it — **upload timing, duplicate policy, and session dependency** differed per mode, while the UI had to stay one dialog. The core problem was satisfying UI consistency and domain branching at the same time.

## A — Two Key Design Decisions

**1. Shared component + externally injected policy**
The dialog, tabs, footer, and status display live in one component. The parts that vary per mode (endpoint, duplicate handling, upload timing) are **injected by the parent as a mode and callbacks**. Responsibilities split across 5 layers: types · utils · manager · UI · service.

**2. Per-mode upload timing (immediate / deferred / confirm)**
The same "Upload" button, but pressing it does different things. → Upload timing is **a function of data lifecycle + the user's cognitive load**.

### End-to-End Flow

```
1. File select/drop (extension · size · MIME-corrected validation)
2. Mode branch (immediate / deferred / confirm)
3. Duplicate-check API — 4 branches (HTTP 409 as a normal response)
4. Sequential upload loop — Queued → Uploading → Completed/Skipped/Error
5. Result aggregation — all succeeded / partial failure / all failed
6. Partial-failure handling — keep the modal open → review Error items, then retry
```

## Notable Troubleshooting

**1. HTTP 409 → reinterpreted as a normal business response**
A duplicate check is not an error — it is **the result of a fact lookup**. The 409 rejected by the axios interceptor is recovered in the catch and returned to the normal flow. The combination of duplicate status × overwritability × name collision is handled in 4 branches. → Separating HTTP semantics from business semantics.

**2. Closing the dialog mid-upload**
In-flight requests are canceled via AbortController, and the upload queue and state are cleaned up. Guards ensure callbacks arriving after close never touch a screen that no longer exists. → **Early exit treated as a normal flow**.

## R — Results

3 contexts → 1 component · 4-branch duplicate handling · 6-state machine with partial-failure recovery
