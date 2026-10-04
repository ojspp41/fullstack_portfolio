---
{
  "id": "cross-org-sharing",
  "order": 3,
  "published": true,
  "title": "Organization-scoped Agent sharing",
  "category": "fullstack",
  "badge": "Implementation · verification",
  "layers": [
    "Frontend / approval API implementation",
    "Permission / execution checks"
  ],
  "stack": [
    "Next.js",
    "Go",
    "MongoDB",
    "Outbox"
  ],
  "metrics": [
    {
      "label": "Execution reauthorization",
      "value": "5 paths"
    },
    {
      "label": "Permission scope",
      "value": "User × organization × sharer"
    }
  ],
  "summary": "Aligned sharing UI with approval, execution, and revocation APIs. Multi-organization permissions stay separate, and stale updates cannot overwrite newer settings.",
  "measurement": "Validated approval gating, organization-scoped revocation, execution reauthorization, and Outbox update scenarios. This is not a claim of error-free production behavior."
}
---

## Architecture

![Organization-scoped Agent sharing — architecture](/diagrams/sharing.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Built organization selection and approval-waiting UI, Go approval/permission/execution/revocation logic, and configuration propagation.

## Problem · goal (S·T)

- **Situation:** User-ID-only permissions mixed approval and revocation paths for users belonging to multiple organizations.
- **Task:** Block access before approval, preserve legitimate access in another organization after revocation, and update existing sessions consistently.

## Solution (A)

1. Separated target-organization selection and approval state in the UI. Permission-grant paths are scoped by **user × target organization × sharer**.
2. Rechecked current organization relationships and sharing state at approval. Revalidated `execute` permission across five execution paths instead of relying on visible UI state.
3. Updated existing sessions in batches through Outbox jobs. Stale jobs with outdated modification timestamps cannot overwrite newer settings.

## Results (R)

- Checked pre-approval access blocking, execution after approval, and organization-scoped revocation scenarios.
- Verified preservation of the user's other-organization permissions and rejection of stale configuration updates.

### Verification conditions · current limits

These are selected approval, execution, revocation, and propagation scenarios, not proof of error-free permissions in all production environments. Persisted jobs and revalidation maintain consistency across DB changes and external propagation.
