---
{
  "id": "dockerfile",
  "order": 6,
  "published": true,
  "title": "Dockerfile Optimization — Catching a Hidden 1.56GB Regression",
  "category": "infra",
  "badge": "Infrastructure · operations",
  "stack": [
    "Docker Multi-stage",
    "Next.js standalone",
    "Non-root",
    "WhaTap",
    "스모크 테스트"
  ],
  "metrics": [
    {
      "label": "Uncompressed image",
      "value": "3.63GB → 1.82GB",
      "note": "50% reduction · built and measured"
    },
    {
      "label": "Hidden regression",
      "value": "1.56GB removed",
      "note": "APM installation revived dev dependencies"
    },
    {
      "label": "Local cold-pull median",
      "value": "8.13s → 3.93s",
      "note": "~51.7% reduction · three runs per image"
    }
  ],
  "layers": [
    "Infrastructure built directly",
    "Kubernetes operations collaboration"
  ],
  "summary": "Measured layers to find dev dependencies revived after standalone slimming. Fixed non-root APM permissions in the image and caught boot regressions with smoke tests.",
  "measurement": "Docker 29.7.0 + Colima/Linux arm64, caches removed, three interleaved runs per image. These are not internal-registry or production Kubernetes deployment times."
}
---

# A Slimmed Image Grew Back

## Situation

Operations rejected the image twice: it was too large, non-root policy conflicted with WhaTap log-write permissions, and missing public environment variables failed only at runtime. After initial slimming, invoice PDF support was added and the image measured 3.63GB again.

## Decisions and implementation

Multi-stage base/deps/builder/runner separation and Next.js standalone kept build-only dependencies out of runtime. Log-directory ownership resolved the APM/non-root conflict, and missing required environment variables fail at build time.

Layer measurements separated legitimate costs from regressions:

| Layer | Size | Judgment |
|---|---|---|
| APM runtime installation | 1.56GB | Defect: npm install revived stripped dev dependencies |
| Chromium + Korean fonts | 0.89GB | Required PDF rendering cost |
| App/runtime | Remaining size | Expected |

Isolating APM installation exposed a boot failure: the custom server required the full Next package, absent from the slim tree. A smoke test caught it. Since that server only delegated to the default handler, I replaced it with the standard Next server and loaded APM through execution options.

## Measurements

| Metric | Before | After | Change |
|---|---|---|---|
| Uncompressed image | 3.63GB | 1.82GB | -50% |
| Compressed image | 901MB | 540MB | -40% |
| Local cold-pull median | 8.13s | 3.93s | -4.20s / -51.7% |
| Hidden dev-dependency regression | 1.56GB | Removed | — |

Cold pulls were measured with Docker 29.7.0 and Colima/Linux arm64. Images and caches were removed; old/new runs were interleaved, three per image. These are local results, not production registry, network, or Kubernetes-node deployment times.

## Next step, not an implemented result

Moving Chromium to a sidecar and switching PDF capture from launch to connect could reduce the app image below 1GB. It would not necessarily reduce total Pod resources and remains a backlog decision with operations.
