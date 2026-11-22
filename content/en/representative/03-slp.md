---
id: slp-manufacturing
order: 3
eyebrow: Enterprise Integration · Manufacturing AX
title: SLP Manufacturing AX — Production Reporting Agent
summary: I built an agent that answers production staff’s questions by comparing two reporting periods. I also developed read-only tools for retrieving the figures from the existing manufacturing execution system (MES).
stack: [On-Premise sLLM, MCP, MES, MS-SQL, AI Agent, HTML Report]
metrics:
  - label: Query scope
    value: Production · Quality · Equipment · LOT
  - label: Output
    value: Summary + HTML Report
---

The agent runs on the on-premise language model. In each report, it shows the figures returned by the MES tools separately from the model’s explanation of possible causes.
