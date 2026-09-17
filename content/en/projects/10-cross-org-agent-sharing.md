---
{
  "id": "cross-org-sharing",
  "order": 2,
  "published": true,
  "title": "Cross-Org Agent Sharing — Approval, Execution & Revocation",
  "category": "fullstack",
  "badge": "Frontend + backend built directly · authorization",
  "stack": [
    "Next.js",
    "React",
    "TypeScript",
    "Go",
    "MongoDB",
    "Outbox"
  ],
  "metrics": [
    {
      "label": "Related tests",
      "value": "50/50 passed",
      "note": "28 unit · 22 integration-build tests"
    },
    {
      "label": "Cross-org grants before approval",
      "value": "0",
      "note": "Authorization correctness"
    },
    {
      "label": "Existing-session convergence",
      "value": "101 → 100+1",
      "note": "No duplicate work or stale-version overwrite"
    }
  ],
  "layers": [
    "Frontend built directly",
    "Backend sharing & authorization built directly",
    "Outbox convergence design"
  ],
  "summary": "Identified grants by user, target organization, and sharer. Revalidated approval and five execution paths, then converged existing sessions in bounded Outbox batches.",
  "measurement": "Tests establish authorization correctness, idempotent re-execution, and latest-version protection. Production p50/p95 and large-scale convergence time are unmeasured."
}
---

# Organization-Scoped Agent Sharing

## Situation

A user could receive the same Agent as a member of multiple organizations, but storing only the user ID collapsed those grants into one. Approval, selective revocation, ownership, and execution could not identify the exact organization path.

## Task and ownership

Preserve immediate same-org sharing while requiring system-admin approval for cross-org access. I directly built organization-aware selection and pending/immediate states on the frontend, plus the backend path model, approval revalidation, exact revocation, execution authorization, and convergence logic.

## Decisions

| Model | Remaining problem |
|---|---|
| User only | Cannot distinguish multiple organization memberships |
| User + target organization | Cannot identify who created the path for ownership and revocation |
| User + target organization + sharer | Independently identifies approval, execution, and revocation paths |

Same-org requests immediately create Share and Permission records. Cross-org requests create only a pending approval request; `read` and `execute` are granted after approval, without a reshare grant.

### Frontend state

Search filters determine candidates, not the chosen user's actual organization scope. Each selected membership becomes a separate request. `shares` and `pending_requests` stay distinct; stale asynchronous responses are discarded. Existing access is retained until a replacement path is approved.

### Approval and execution

Approval checks the current Agent owner organization, requester's active membership and share permission, recipient's target membership, active inter-org relationship, resource type, and allowed read/execute scope.

Authorization is checked again at five paths: session creation, chat, streaming, API-key connection, and Hantalk execution. Each verifies the current organization relationship, exact sharing path, and execute grant.

### Outbox convergence

During a pending change, the last approved configuration remains usable. New sessions immediately use the new approved version; existing sessions are updated in ID-ordered batches of 100.

Outbox jobs persist the cursor and Agent modification time. Obsolete jobs finish as no-ops. Session updates and the completion marker commit in one transaction so stale work cannot overwrite a newer approval. Only recoverable failures are retried.

## Verification — September 2, 2026

Go 1.26.5, MongoDB 7.0, Testcontainers.

| Scenario | Result |
|---|---|
| Related tests | 50/50 passed: 28 unit, 22 integration-build tests, including 21 MongoDB-path tests |
| Mixed Agent share request | One immediate same-org grant + one pending cross-org request |
| Mixed Session sharing rejected | Zero approval, Share, or Permission writes |
| 101 existing sessions | 100 + 1 batches, zero duplicate follow-up jobs |
| Repeated identical job | Zero configuration timestamp changes |
| Re-run V1 after V2 approval | V2 retained; zero stale overwrite |
| Duplicate Agent configuration | Zero session changes or completion markers |
| Organization lookup failure | Missing resource: 404; transient failure: 5xx, access blocked |

## Boundaries

These results measure correctness and repeated-execution safety, not production latency. Production p50/p95 and convergence for 1,000+ recipients need representative data, network conditions, and concurrent load before being claimed.
