---
id: markdown-parser
order: 7
title: Streaming Markdown Parser — Safe Even When Incomplete
category: frontend
badge: AI / LLM · Designed From Scratch
stack: [Progressive Markdown Parser, TypeScript, 60fps budget]
metrics:
  - { label: "1,000-line table parse", value: "1.07ms", note: "within the 16.67ms 60fps frame budget" }
  - { label: "UI flicker", value: "eliminated", note: "hide-incomplete-blocks strategy" }
layers: ["FE direct", "Streaming protocol understanding"]
summary: When the AI streams text character by character, incomplete tables, code blocks, and lists are briefly hidden and revealed once confirmed — a parser I designed from scratch to eliminate UI flicker.
---

# Streaming Markdown Parser — Safe Even When Incomplete

## Problem

LLMs emit markdown **shredded into tokens**. Mid-stream, the document is in a **perpetually incomplete state** — table rows half-arrived, code-block backticks unpaired. Rendering it as it arrives means:

- The instant a single backtick opens, everything after it renders as a code block, then snaps back → flicker
- An incomplete table oscillates between plain text ↔ table, making the layout lurch

## Design — Don't Fake-Close; Briefly Hide

- **Code blocks**: when backticks are unpaired, **truncate past the last confirmed point** and render only what is settled — never append a fake closing backtick
- **Tables**: headers and incomplete rows are **hidden** — rows appear only once confirmed complete
- **Lists**: rendering is deferred until item boundaries are confirmed
- The moment content is confirmed, it appears all at once → a flicker-free, natural streaming typing experience

## Performance

- **A 1,000-line table parses in 1.07ms** — comfortably within the 60fps single-frame budget (16.67ms)
- Incremental processing avoids re-parsing the whole document on every token

## Why Build It Myself

Existing markdown libraries assume a **complete document**. They have no policy for mid-stream states (unpaired backticks, half a table), so the UX decision — "how should incomplete regions be shown?" — could not be made at the parser level at all. I needed a parser where the policy (truncate vs hide vs fake-close) is selectable per block type.
