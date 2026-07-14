---
id: dockerfile
order: 9
title: Dockerfile Hardening — Catching a Hidden 1.56GB Regression
category: infra
badge: Infrastructure · Operations
stack: [Docker Multi-stage, Next.js standalone, Non-root, K8s, smoke tests]
metrics:
  - { label: "Image (uncompressed)", value: "3.63GB → 1.82GB", note: "50%↓ measured" }
  - { label: "Hidden regression", value: "1.56GB caught", note: "per-layer contribution measurement" }
  - { label: "Cold pull", value: "24s → 13s", note: "seconds are estimated" }
layers: ["Infra direct", "K8s ops collaboration"]
summary: I slimmed an image the ops team had rejected twice — then, as features landed, 1.56GB quietly crept back. Per-layer measurement caught it, restoring the 50% reduction.
---

# Dockerfile Hardening — The Image I Slimmed Down Grew Back in Production

## S — "We can't accept this image," Twice

- **Size**: the initial image was bloated, making K8s startup slow
- **Security**: the non-root policy collided with the APM agent's (WhaTap) log write permission (EACCES) → the agent failed to boot
- **Stability**: missing required environment variables (NEXT_PUBLIC_*) only surfaced at runtime

The first slimming pass shipped to production. The problem came after — once the invoice PDF feature landed, remeasuring showed **3.63GB**. Far too big to wave off with "well, we added Chromium."

## T — Answer "Why Is It This Size," Not Just "It Works"

1. Measure each layer's contribution separately to **separate legitimate cost from defects**
2. Make "why did the reduction come back" **explainable in one sentence**
3. Block failure modes at **the cheapest place: build time**

## A — Measurement Caught the Hidden Regression

**1. Foundation · first slimming pass**
Multi-stage separation (base · deps · builder · runner) excludes build-only dependencies; Next standalone keeps only true runtime dependencies. The non-root × WhaTap conflict was resolved by handing log-folder ownership to the agent user. Missing required environment variables now **fail the build itself** — fail-fast.

**2. Detection · per-layer contribution measurement**

| Size | Cause | Verdict |
|---|---|---|
| **1.56GB** | Monitoring agent installed at runtime — its npm install resurrected the entire set of dev dependencies (typescript, etc.) that standalone had stripped out | **Defect** |
| 0.89GB | Chromium + Korean fonts (required for PDF rendering) | Legitimate |
| Remainder | The app and runtime itself | Normal |

Nobody inflated it deliberately — it was **a regression that accumulated while nobody was measuring**. (The puppeteer library is 9MB — the heavy part is the Chromium it drives, not the library.)

**3. Fix · cleanup**
Isolating the agent install and copying in only the artifacts broke container boot — the custom server.js required the full Next package, which the slim tree no longer had. **The smoke test caught it before merge.** On inspection, that server did nothing but delegate to the default handler, so I replaced it with the standard Next server and attached the agent via a launch option.

## R — Results

| Metric | Before | After | Δ |
|---|---|---|---|
| Image (uncompressed) | 3.63GB | 1.82GB | **50%↓** |
| Image (compressed) | 901MB | 540MB | 40%↓ |
| Cold pull | 24s | 13s | 10s↓ |
| Hidden 1.56GB regression | Latent | Caught & removed | — |
| non-root × APM boot failure | — | Resolved inside the image | — |

Verified with a real container run: boot · HTTP 200 · Korean PDF output · monitoring initialization. Sizes are measured; cold-pull seconds are estimates based on bandwidth and disk assumptions.

## Insights / Next Time

- Everyone uses standalone and alpine. **The differentiator is catching, through measurement, when the reduction grows back.**
- "It runs" isn't done — **it's done when the ops team can accept it**.
- Block failures at the cheapest place — one second at build time, not at runtime.
- Next: split Chromium into a sidecar; switching PDF from launch → connect puts the app image under 1GB. But since that doesn't reduce total Pod resources, it's a call to make together with the ops team — backlogged.
