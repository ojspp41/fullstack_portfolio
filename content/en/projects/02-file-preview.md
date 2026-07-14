---
id: file-preview
order: 2
title: In-App File Preview — Split Paths & 3-Layer Defense
category: fullstack
badge: Full-Stack Flagship · Security
stack: [Go, Gin, MinIO, DRM, Next.js 15, React 19, DOMPurify, iframe sandbox]
metrics:
  - { label: "Original file exposure", value: "0", note: "locked in by BE tests" }
  - { label: "Malicious content defense", value: "3 layers", note: "1 server layer + 2 client layers" }
  - { label: "Object URL leaks", value: "0", note: "locked in by FE tests" }
  - { label: "Supported formats", value: "6 formats, single pipeline", note: "new format = one mapper line" }
layers: ["FE direct", "BE endpoints direct", "Security design"]
summary: A pipeline for previewing confidential internal files in-app without exposing originals or executing malicious content. The server splits the download and preview paths and serves only the DRM copy, with isolation policies enforced.
---

# In-App File Preview — Full-Stack · Security

> Leave the original untouched and show **only the DRM-processed copy**. Built the FE render stack's 3 layers (decide → transform → present) hands-on, plus the **BE preview endpoints and path separation hands-on**. The existing download flow was left alone — **zero breaking changes**.

## BE — Path Separation & Server-Enforced Isolation (built hands-on)

- **Symmetric split of download/preview endpoints** — download serves the original as attachment; preview serves only the DRM copy inline
- The preview path is **designed to never even reference the original store** → "originals never leak through preview" is locked in by tests
- **Streaming delivery** that never loads a whole file into memory, with download-permission re-verification and path-traversal blocking on every access
- For active content (HTML·SVG·XML), the server **enforces an isolation policy (CSP sandbox + MIME-sniffing prevention)** → the effective trust boundary

## FE — Single Pipeline & Resource Cleanup (built hands-on)

- After format detection (extension → MIME fallback), **all 6 formats flow through one rendering pipeline**; unsupported formats get a download prompt automatically
- Temporary preview data and in-flight requests are **cleaned up on every exit path (zero leaks)**
- Active content gets **a second line of defense**: sanitization (DOMPurify) + an isolated frame (iframe sandbox); PDFs render with toolbar and download hidden
- The preview module loads only when a preview is actually opened (code splitting)

## Key Results

| Result | Evidence |
|---|---|
| Zero original exposure | Locked in by BE tests |
| Zero temporary data leaks | Locked in by FE tests |
| 3-layer malicious content defense | 1 server isolation layer + 2 client layers (sanitize · sandbox) |
| Cost of adding a new format | One mapper line — no per-format bespoke builds |

## Anticipated Questions

- **Q. What is the effective trust boundary?** The server-enforced CSP sandbox plus DRM-copy serving. Client-side sanitization is defense in depth, not the boundary.
- **Q. If format detection is extension-based, can it be bypassed?** Format detection only picks the renderer; it is not a security decision. Content goes through isolation and sanitization regardless.
- **Q. When is the DRM copy created?** Previews must open instantly, so generating at upload time wins. If storage costs grow, the structure allows switching to on-request conversion.

> BE splits the original/copy paths and the server enforces isolation; FE renders only safe copies through a single 6-format pipeline and cleans up its resources — applying **"protect the original, serve only safe copies, without mistakes, and lightweight"** consistently across the whole flow.
