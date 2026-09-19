---
id: operation-report
order: 4
eyebrow: D · Weekly Operations Report Automation
title: Code verifies the numbers; AI explains the changes
summary: Normalize, aggregate, and cross-validate operational REST API metrics, then connect charts and explanations into a weekly report.
metrics:
  - label: Weekly operations report
    value: ~2–3 hours → within 10 minutes
    note: Duration of this reporting task
steps: [REST API, DAU / Token / Top Agent / Model Usage, Normalize, Cross Validation, Chart, AI Explanation, Report]
decision: AI does not calculate the figures. Code handles collection, normalization, aggregation, period checks, and total checks.
---

Collect DAU, tokens, top Agents, and model usage through APIs. Cross-validate periods and totals before creating charts. AI uses verified metrics to describe major changes and unusual observations.

Code and rules settle reproducible calculations and decisions; AI supports analysis and explanations people can check. Task durations are limited to this automation scope. Whether the timing includes API waiting, writing, and review needs confirmation against the original records.
