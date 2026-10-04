---
{
  "id": "operation-report",
  "order": 2,
  "eyebrow": "02 · AI & automation",
  "title": "Weekly-report automation",
  "summary": "Validated periods, totals, and metric continuity in code before AI drafted the report. Separating calculations from explanations reduced the recorded generation and validation time.",
  "steps": [
    "REST API",
    "Normalize",
    "Period / Total Validation",
    "Chart",
    "AI Explanation",
    "Review"
  ],
  "metrics": [
    {
      "label": "Weekly report",
      "value": "~2–3 hours → under 10 min",
      "note": "Generation and validation"
    }
  ],
  "decision": "AI does not calculate the numbers. Code handles collection, aggregation, periods, and totals."
}
---

Collected DAU, tokens, top Agents, and model usage from APIs, then checked periods, totals, and week-to-week continuity. AI explained verified changes and unusual items; a person reviewed the final report.

Recorded generation and validation for one weekly report went from approximately 2–3 hours to under 10 minutes. This applies to that task, not every operational activity.
