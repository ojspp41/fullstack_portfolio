---
{
  "id": "dockerfile",
  "order": 7,
  "published": true,
  "title": "Smaller Docker image with runtime functions preserved",
  "category": "infra",
  "badge": "Implementation · verification",
  "layers": [
    "Docker / boot verification implementation",
    "Kubernetes operations collaboration"
  ],
  "stack": [
    "Docker Multi-stage",
    "Next.js standalone",
    "WhaTap",
    "Non-root"
  ],
  "metrics": [
    {
      "label": "Uncompressed image",
      "value": "3.63GB → 1.82GB"
    },
    {
      "label": "Local cold pull",
      "value": "8.13s → 3.93s"
    }
  ],
  "summary": "Layer analysis exposed development dependencies reintroduced by APM installation. Chromium, Korean fonts, APM, and non-root execution were retained and checked through actual startup.",
  "measurement": "Uncompressed build sizes and local cold-pull medians on Docker 29.7.0 / Colima Linux arm64, three runs per variant. This is not production deployment time."
}
---

## Architecture

![Smaller Docker image with runtime functions preserved — architecture](/diagrams/docker.png)

*Reconstructed diagram from the portfolio PDF; labels are in Korean. The implementation scope and steps are described below.*

> **My scope:** Updated the Dockerfile, startup path, APM log permissions, and build/boot smoke checks. Shared Kubernetes operations are a collaboration scope.

## Problem · goal (S·T)

- **Situation:** Adding PDF support grew the image to 3.63GB. APM installation reintroduced development dependencies even after adopting multi-stage builds.
- **Task:** Reduce image size while preserving PDF, APM, and non-root operation, then verify the actual runtime.

## Solution (A)

1. Apply standalone/multi-stage packaging and measure individual layers. Find **1.56GB** of development dependencies recreated by APM installation.
2. Isolate WhaTap installation and copy only necessary artifacts. Retain Chromium and Korean fonts required for PDFs.
3. Use the standard Next.js server. Check non-root log permissions, configuration, actual boot, HTTP/PDF/APM smoke behavior, and local cold pulls.

## Results (R)

- **Uncompressed image:** 3.63GB → 1.82GB, approximately 50% smaller. Compressed size: 901MB → 540MB.
- **Local cold-pull median:** 8.13s → 3.93s, approximately 51.7% shorter.

### Verification conditions · current limits

Sizes come from direct builds. Cold pulls used Docker 29.7.0 / Colima Linux arm64, cleared caches, and three alternating runs per variant. They are distinct from production deployment time with different registry/network conditions. Build success was followed by actual startup and function checks.
