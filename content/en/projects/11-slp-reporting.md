---
{
  "id": "slp-reporting",
  "order": 1,
  "published": true,
  "title": "SLP · MES production-reporting Agent",
  "category": "fullstack",
  "badge": "Implementation · verification",
  "layers": [
    "Agent implementation",
    "MES / sLLM integration"
  ],
  "stack": [
    "Qwen sLLM",
    "MCP",
    "MS-SQL",
    "HTML Report"
  ],
  "metrics": [
    {
      "label": "Data domains",
      "value": "4 domains"
    },
    {
      "label": "Scenarios",
      "value": "3 pass · 1 conditional · 1 blocked"
    }
  ],
  "summary": "Connected natural-language requests to read-only MES queries, period comparisons, anomaly checks, and HTML reports. Source values remain separate from AI interpretations.",
  "measurement": "Evidence from five recorded scenarios across production, quality, equipment, and LOT data. No measured operating-time reduction is claimed."
}
---

## Architecture

![SLP · MES production-reporting Agent — architecture](/diagrams/slp.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Built purpose-specific MES MCP tools and Agent behavior, integrating the existing MES/MS-SQL system and on-premise sLLM. This is application development, not model training or full MES construction.

## Problem · goal (S·T)

- **Situation:** Production reports required repeated SQL queries, Excel consolidation, and document editing.
- **Task:** Connect natural-language requests to MES queries, period comparisons, and evidence-based reporting without allowing the model to invent values.

## Solution (A)

1. Connected read-only, purpose-specific MCP tools accepting period, line, and LOT parameters rather than arbitrary SQL.
2. Compared the current period with the previous equivalent period and queried unusual changes again. Tool-returned facts stay separate from AI interpretations.
3. Connected results to on-screen summaries and HTML reports. Tool retries, missing results, and report-file failures were checked separately from the normal path.

## Results (R)

- Connected querying, comparison, summaries, and HTML reporting across **four domains: production, quality, equipment, and LOT**.
- **Five scenarios:** three passed, one conditional success, one infrastructure-blocked. Identified five quality improvements.

### Verification conditions · current limits

Infrastructure failures are distinguished from Agent failures. Eight follow-up retest items were defined; they are not eight completed passes. Operating-time savings and manufacturing-quality improvements were not measured.
