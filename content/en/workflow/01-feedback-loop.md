---
{
  "id": "development-loop",
  "order": 1,
  "eyebrow": "01 · AI & automation",
  "title": "Development quality · loop & harness engineering",
  "summary": "Used AI for analysis, implementation, and test authoring, then checked actual screens, reviews, and deployments. Reusable procedures fix inputs, completion criteria, and verification rules; failures feed the next iteration.",
  "steps": [
    "Requirement",
    "State Modeling",
    "Implementation",
    "Unit Test",
    "Browser Validation",
    "MR",
    "Deploy",
    "Smoke Test",
    "Feedback Loop"
  ],
  "metrics": [],
  "decision": "Completion is checked with tests, actual screens, reviews, and deployment evidence."
}
---

Loop engineering connects implementation, verification, observed failure, and revision. Harness engineering provides the inputs, tools, completion criteria, and checking procedures for AI-assisted work.

After defining states and impact, I used AI for implementation and test authoring, then checked unit tests, screen QA, GitLab MR, deployment pipelines, and smoke behavior. Failures became regression tests and updated checking rules. This does not claim every stage runs automatically for every task.
