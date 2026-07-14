---
id: pdf-invoice
order: 3
title: Server-Side PDF Invoices (Headless Chromium)
category: fullstack
badge: Full-Stack · Server-Side Rendering
stack: [Puppeteer, Headless Chromium, Next.js internal route, Docker(musl), print CSS]
metrics:
  - { label: "Fidelity guarantee", value: "DOM 1:1 capture", note: "preview = PDF, guaranteed structurally" }
  - { label: "Bottleneck identified", value: "startup 60%", note: "4.4s of 7.4s per document" }
  - { label: "Improvement headroom", value: "66%↓", note: "7.4 → 2.5s with browser reuse (measured)" }
layers: ["FE direct", "BE capture server direct", "Infra (musl·fonts)"]
summary: Per-affiliate token settlement invoices downloaded as PDF. Capturing the exact same DOM as the preview structurally rules out content mismatches.
---

# Server-Side PDF Invoices — A Settlement Document Where Preview and PDF Must Never Diverge

## S — Situation

- **Settlement trust**: per-affiliate token usage settlement invoices — the preview and the actual PDF cannot differ by a single character
- **Broken Korean text** is unacceptable; **tables cut off at page boundaries** are unacceptable
- Ultimately, "the content is identical" had to be **proven structurally**, not by human eyes

## T — Task

1. Guarantee preview–PDF fidelity by construction
2. Secure print quality — Korean fonts, logos, page breaks — in an **air-gapped container (musl) environment**
3. Decompose "it's heavy" through measurement and pin the next optimization target to a number

## A — Action

### 1. Technology choice — evaluated every candidate, landed on Chromium

| Rejected candidate | Reason |
|---|---|
| jsPDF | Draws with raw coordinates · burden of embedding Korean fonts |
| html2canvas | Output is an image — text can't be selected |
| @react-pdf | Two codebases, one for screen and one for PDF → they will drift eventually |
| wkhtmltopdf | Aging engine, flex/grid breaks |
| External conversion API | Settlement figures cannot leave the network |

**Choice**: Puppeteer + headless Chromium — if the goal is "exactly what you see," the surest way is to print with the very engine the user is looking at.

### 2. Inverting the structure — removing the server's self-re-entry

Initially, when the server generated a PDF it re-entered its own preview page, re-called the backend, and even injected a token. I inverted this: **the client sends the HTML it has already rendered, and the server only captures it**. The re-entry, backend re-calls, and token injection all disappeared, and since the PDF captures the same DOM the user was viewing, **content and data fidelity is simply guaranteed**.

### 3. Defense in the details

- **XSS**: capture with JS execution disabled — blocked at the source
- **Images**: relative paths (logos, icons) are inlined as base64 + cached (8.9ms → 1.2ms) · filenames restricted to alphanumerics to block path manipulation
- **Timing**: animations set to 0s + capture only after confirming Korean fonts have loaded
- **Print**: A4 margins · no row splitting · repeating table headers via print CSS
- **Environment**: musl compatibility via system Chromium + Korean font installation (→ ties into the Dockerfile hardening project)
- **Routing**: the ingress routes /api to the backend, so the FE internal route lives under /internal

### 4. Bottleneck decomposition (multi-page invoice · 12 repetitions)

| Stage | Per document (p50) | Share |
|---|---|---|
| Browser startup | 4.4s | **60%** |
| HTML injection + fonts | 0.3s | 4% |
| PDF capture | 2.4s | 32% |
| **Total** | **7.4s** | — |

## R — Results

- **Fidelity**: same-DOM capture means preview = PDF content · Korean text, logos, and page breaks all correct (verified with a real container run)
- **Simplification & security**: removed self-reference and token injection; disabling JS execution shrank the attack surface
- **Next move pinned down**: startup dominates at 60% — browser pool reuse takes 7.4 → 2.5s (66% down, measured · not yet applied), or split out a dedicated Gotenberg service

> The biggest win was inverting the direction — instead of re-fetching data and re-rendering, **capture what has already been rendered**. Fidelity, security, and simplicity all followed from that one decision.
