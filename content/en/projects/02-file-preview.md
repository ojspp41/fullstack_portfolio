---
{
  "id": "file-preview",
  "order": 3,
  "published": true,
  "title": "In-App File Previews — Separate Paths & Execution Defenses",
  "category": "fullstack",
  "badge": "Full-stack · security",
  "stack": [
    "Go",
    "Gin",
    "MinIO",
    "DRM",
    "Next.js 15",
    "React 19",
    "DOMPurify",
    "iframe sandbox"
  ],
  "metrics": [
    {
      "label": "Execution defenses",
      "value": "3 stages",
      "note": "One server + two frontend active-content defenses"
    },
    {
      "label": "10 MiB allocation/request",
      "value": "~49.84 MiB → 229B",
      "note": "Local Gateway processing benchmark"
    },
    {
      "label": "Concurrent peak RSS",
      "value": "~92.8%↓",
      "note": "10 workers · local process 740.4 → 53.2 MiB"
    },
    {
      "label": "Supported formats",
      "value": "6",
      "note": "Single pipeline · zero object-URL leaks"
    }
  ],
  "layers": [
    "Frontend built directly",
    "Backend endpoint built directly",
    "Security design"
  ],
  "summary": "Separated original downloads from DRM-copy previews. The Gateway validates and streams pre-generated PDFs while a single frontend pipeline renders and cleans up resources.",
  "measurement": "Memory results compare local processes on the same machine. MinIO networking, permission lookup, and PDF generation are excluded; these are not production Pod or user-latency results."
}
---

# In-App File Previews

## Server boundary — built directly

Downloads serve originals as attachments; preview endpoints serve only DRM-processed copies inline. The preview path does not reference original storage, and tests pin this boundary. The Gateway rechecks file read permissions, blocks path traversal, and streams bytes instead of buffering entire files.

For HTML, SVG, and XML, server-enforced CSP sandbox and MIME-sniffing protection form the trust boundary. Client-side sanitization is defense in depth, not a replacement.

## Frontend pipeline — built directly

Format selection uses extension then MIME fallback. Six formats share a decide → transform → present pipeline. Unsupported files receive a download fallback. Temporary object URLs and pending requests are cleaned up on every exit path. DOMPurify and iframe sandbox provide two additional active-content defenses. PDF toolbar/download UI is hidden, and preview code loads only when opened.

Original exposure and temporary-resource leaks were zero in tests; existing download behavior was preserved without breaking changes.

## Office-document flow and current limitations

PPTX, HWP, and HWPX conversion does not happen at preview-request time. The parsing engine pre-generates `{ObjectName}.pdf` in MinIO; the Gateway checks permissions and the four-byte `%PDF` signature before streaming it.

On overwrite, failure to remove an old derived PDF logs an error but does not fail a valid original upload. This cleanup failure is not currently persisted to a retry queue. If new parsing also fails, the old PDF can remain at the same key and be shown because the Gateway does not yet verify its processing generation.

The frontend selects preview entry by supported format and permission, not processing state. A missing PDF falls back to download; a surviving old PDF may display stale content. Manual retry exists, but no current client is connected.

### Proposed hardening — not shipped results

Connect processing/failed/PDF-ready states to frontend availability and retry actions. Persist derived-PDF cleanup as an Outbox job and compare processing-attempt IDs at the worker and Gateway. Generation-specific object keys and confirmed-ready selection would prevent old work from deleting or exposing newer output. This is a follow-up design, not a claim about existing implementation.

## Local Gateway benchmark

Apple M5, Go 1.24.5; medians of three runs using identical PDF bytes.

| PDF size | Old full buffering | Validation + streaming |
|---|---|---|
| 1 MiB | 300µs · 5,241,208B allocated | 15.1µs · 228B |
| 10 MiB | 1.59ms · 52,263,356B allocated | 154.5µs · 229B |
| 50 MiB | 8.31ms · 314,628,741B allocated | 813.9µs · 234B |

The current path restores the four inspected bytes using `io.MultiReader` and streams the object. Additional allocation remains approximately 228–234B rather than growing with PDF size.

With a 10 MiB PDF, ten workers, ten seconds, and 50ms RSS sampling, old peak process RSS was **740.4 MiB**, compared with **53.2 MiB** for streaming (~92.8% reduction). Per-request allocation was approximately 49.84 MiB vs. 228B.

## Measurement boundary

RSS includes Go runtime, test code, and the shared input buffer. It is not an operational Pod metric. MinIO network time, authorization queries, and parsing-engine conversion are excluded. Browser p50/p95, object-store TTFB, PDF readiness, production RSS deltas, and seven-day error rates remain to be measured.
