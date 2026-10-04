---
{
  "id": "generative-ui",
  "order": 5,
  "published": true,
  "title": "Malformed AI response recovery & widget isolation",
  "category": "frontend",
  "badge": "Implementation · verification",
  "layers": [
    "Parser / error isolation implementation"
  ],
  "stack": [
    "TypeScript",
    "JSON",
    "React Error Boundary",
    "Jest"
  ],
  "metrics": [
    {
      "label": "40 fixed inputs",
      "value": "24/40 → 39/40"
    },
    {
      "label": "Recovery rate",
      "value": "60% → 97.5%"
    }
  ],
  "summary": "Parsed original responses first and repaired only failed inputs. Synchronous and asynchronous widget errors are isolated to preserve the chat screen.",
  "measurement": "Before/after comparison on the same 40 fixed inputs. This does not establish a success rate across all model responses or a production-incident reduction."
}
---

## Architecture

![Malformed AI response recovery & widget isolation — architecture](/diagrams/genui.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Built original-first parsing, failed-input repair, structure checks, widget-error isolation, and regression tests.

## Problem · goal (S·T)

- **Situation:** Malformed AI JSON prevented widgets from appearing, and widget failures affected the chat screen.
- **Task:** Preserve valid input, recover malformed responses where possible, and keep chat usable when a widget cannot recover.

## Solution (A)

1. Parse the original response first. Apply six repair steps for code fences, quotation marks, commas, and related defects only after parsing fails.
2. Check structure and bracket balance after character-level repair, then parse again. Parsing recovery and widget rendering are separate failure boundaries.
3. Use Error Boundary for synchronous rendering failures and explicit guards for asynchronous operations. Compare the same 40 fixtures before/after and retain failures as regression cases.

## Results (R)

- **Successful inputs:** 24/40 → 39/40; recovery rate 60% → 97.5%.
- **Parsing failures:** 16 → 1. Widget failures do not take down the chat screen.

### Verification conditions · current limits

Results cover the same 40 fixed fixtures. They verify valid-JSON preservation and repair-rule regressions, not universal recovery across models or malformed JSON. The remaining failed input retains an error fallback.
