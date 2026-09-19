---
id: slp-manufacturing
order: 3
eyebrow: Enterprise Integration · Manufacturing AX
title: SLP Manufacturing AX — On-Prem sLLM × MES MCP Reporting Agent
summary: An Agent connecting an on-premise sLLM to MES through MCP to query and compare production data and generate reports in an enterprise environment with restricted external SaaS use.
stack: [On-Premise sLLM, MCP, MES, MS-SQL, AI Agent, HTML Report]
metrics:
  - label: Query scope
    value: Production · Quality · Equipment · LOT
  - label: Output
    value: Summary + HTML Report
decision: The Agent selects purpose-defined, read-only MCP query tools.
steps: [Natural-language request, On-Prem sLLM, Select MES MCP tool, Production / Quality / Equipment / LOT queries, Current vs previous equivalent period, Follow up on unusual changes, Summarize key findings, On-screen response + HTML report]
---

### Apply a model to an enterprise system

The Agent interprets the request and selects purpose-defined MCP tools. It queries production, quality/defects, equipment, and LOT history; compares the current period with the previous equivalent period; and queries additional data for unusual changes before producing a summary and HTML report.

This is experience applying an on-premise model to an Agent and MCP—not training or building the model, or developing the entire MES.

### Separate observed facts from interpretations

- Restrict numerical claims to MCP query results.
- Separate observed facts from possible causes and bound query ranges.
- Verify MCP tool error retries and defenses against requests to fabricate production figures.
- Distinguish model, prompt, MCP, and infrastructure failures during diagnosis.
- Include normal requests, out-of-scope queries, fabricated-data requests, and infrastructure failures in normal, exceptional, and adversarial QA.
