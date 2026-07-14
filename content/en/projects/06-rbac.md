---
id: rbac
order: 6
title: RBAC Permission Boundaries — Splitting the FE/BE Boundary
category: frontend
badge: Permission Design · FE Built Hands-On + BE Integration
stack: [can() abstraction, 3-state rendering, permission.go (integration), shares SSOT]
metrics:
  - { label: "Bypass paths", value: "2 removed", note: "authentication ≠ authorization, separated" }
  - { label: "Flicker", value: "eliminated at the source", note: "3-state · closed-until-verified guarantee" }
  - { label: "Role scaling", value: "zero FE changes", note: "6 roles → N roles absorbed as-is" }
layers: ["FE direct", "BE permission.go integration", "Server contract boundary design"]
summary: The FE decides what to ask permission about; the BE decides how to enforce it. A can() abstraction isolates the FE from a role spec that was still in flux.
---

# RBAC Permission Boundaries — FE Decides What to Ask, BE Decides How to Enforce

> 10 resources × 12 actions (a subset) · 6 roles · `shares.shared_with[]` is the SSOT.
> **FE built hands-on** — can() abstraction · 3-state rendering / **BE design understanding & integration** — permission.go (multi-source SSOT · cascade); ownership-first consumption is the FE·BE contact point.

## Problem — Two Places Asking the Wrong Question

**Server · real-time connection**: the paths for stopping a conversation response or switching sessions **checked only that you were logged in**, never whether that session was yours → someone without permission could stop or hijack another person's in-flight response.

**UI · sidebar**: visibility of the agent info sidebar was decided by "can you modify the conversation" (session.update). What's shown is the agent, but what's asked is the conversation — a mismatched criterion meant unauthorized information could leak, or things you were allowed to see got hidden.

**Diagnosis**: in both places, "which thing to gate on" had drifted from what was actually being shown. And the evaluation order had to be identical in both places — **owner passes immediately; otherwise check permission**.

## Action — Where the Design Weight Went

1. **Added authorization to the real-time paths (server)** — at the 2 entry points that only checked login, added "is this the session owner → if not, do they have permission to act on it", closing the bypass paths.
2. **Aligned the UI criterion with what is shown** — `session.update` → `agent.read`. Even if you own the conversation, no agent read permission means no sidebar.
3. **Permission check first → fetch data only on pass** — data you have no permission for is never even requested.
4. **3-state model** — `null (not yet checked) / false (denied) / true (granted)`. The sidebar opens only when `canReadAgent === true` → it stays closed during verification, so flicker is impossible by construction.
5. **Race prevention** — when agents are switched in quick succession, late responses from earlier requests are discarded so they never overwrite the latest view.

```ts
// Ask about permissions, not roles — isolates the FE from an unsettled role spec
role === 'admin'          // ✗ hardcoded role
can('agent.delete')       // ✓ roles can grow, FE stays unchanged
```

## BE — The Server Makes the Final Block (design understanding & integration)

However well the UI hides things, a direct request beats it — so the final block belongs to the server. The server judges in the same order as the UI — **owner passes immediately; otherwise check the share list** (for owners, the share list is never even read).

- **Unified criterion**: permissions are judged from one place only — the share list (SSOT)
- **Org isolation**: cross-company shares are blocked before they are ever stored
- **Consistency**: permission changes apply in full or roll back in full (transaction)
- **Cascading revocation**: revoking permission upstream cancels down the re-share chain (cascade)

## Results

- Removed the **2 paths** that let unauthorized users control someone else's conversation stream
- Sidebar shown only to users with read permission — **information leak closed**; no permission means no popup, simply not shown
- Closed-until-verified guarantee → **initial flicker eliminated**
- Roles can grow beyond 6 and **the UI stays untouched** (it only consumes the server-provided list of allowed actions)

## Limitations, and If I Did It Again

| Current limitation | If I did it again |
|---|---|
| Permission changes require a refresh | Push instantly over the existing WebSocket |
| "Why can't I see this?" is hard to debug | A dev panel showing is_owner / actions / final verdict |
| The same permission is re-fetched every time | Cache keyed by resource+id once call volume grows |
| Team-level roles not yet defined | The permission-level query structure absorbs them as-is |

> The three places (real-time connection · UI · data) do not look at the same permission. What they share is not the target but **the order: owner passes first, otherwise verify**. The server enforces permissions, but deciding which thing to gate on was the frontend's call — the one building the screen.
