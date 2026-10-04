---
{
  "id": "file-preview",
  "order": 4,
  "published": true,
  "title": "In-app previews with generation isolation",
  "category": "fullstack",
  "badge": "Implementation · verification",
  "layers": [
    "Frontend / preview API implementation",
    "DRM / PDF engine integration"
  ],
  "stack": [
    "Next.js",
    "Go",
    "MinIO",
    "DRM",
    "PDF"
  ],
  "metrics": [
    {
      "label": "10MiB internal processing",
      "value": "1.59ms → 154.5µs"
    },
    {
      "label": "10-worker peak RSS",
      "value": "740.4 → 53.2MiB"
    }
  ],
  "summary": "Separated original downloads from DRM-processed preview copies. The API selects the current PDF generation; the UI handles rendering, origin isolation, and temporary-resource cleanup.",
  "measurement": "Local Apple M5 / Go 1.24.5 measurements cover Gateway processing and memory only. MinIO networking, authentication, PDF conversion, and browser rendering are excluded."
}
---

## Architecture

![In-app previews with generation isolation — architecture](/diagrams/preview.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Built the frontend viewer, Go preview API, read-permission checks, current-generation selection, and streaming. DRM processing and PDF conversion engines are existing-system integrations.

## Problem · goal (S·T)

- **Situation:** Users downloaded files to inspect them. Converting and buffering PDFs on each request increased processing cost; an old PDF could remain after an overwrite.
- **Task:** Separate original downloads from processed previews, select the PDF corresponding to the current source generation, and reduce per-request processing and memory cost.

## Solution (A)

1. Split original-download and DRM-processed-preview API paths, checking file-read permission on the server.
2. PPTX/HWP/HWPX PDFs are generated during parsing. The Gateway selects the object using the current file ID and `processing_attempt_id`, checks the `%PDF` prefix, and streams with `io.Copy`. A pending generation does not fall back to a stale PDF. Completed legacy files retain a limited old-key fallback for rolling-deployment compatibility.
3. Implemented format-specific rendering, sanitization, iframe origin isolation, request cancellation, and Blob/temporary-resource cleanup.

## Results (R)

| Local measurement | Before | After |
|---|---|---|
| 10MiB PDF internal processing | 1.59ms | 154.5µs |
| Cumulative allocation per request | 49.84MiB | 229B |
| Ten-worker peak RSS | 740.4MiB | 53.2MiB |

Streaming with a small reusable buffer reduced internal processing and memory pressure. Selecting the current generation prevents serving a stale-generation PDF.

### Verification conditions · current limits

Median of three runs per path using identical PDF bytes on Apple M5 / Go 1.24.5. MinIO networking, permission queries, and PDF generation are excluded; this is not a 10× end-to-end preview speedup.

The UI still reports PDF preparation, conversion failure, and network errors as a general preview failure and offers no automatic retry. State-specific feedback remains a separate improvement.
