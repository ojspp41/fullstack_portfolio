---
{
  "id": "voc",
  "order": 9,
  "published": true,
  "title": "Employee error reports and Jira attachment recovery",
  "category": "fullstack",
  "badge": "AI Atlas",
  "layers": [
    "Report form and admin board",
    "Go API and Jira integration"
  ],
  "stack": [
    "React",
    "Go",
    "MongoDB",
    "MinIO",
    "Atlassian MCP"
  ],
  "metrics": [],
  "summary": "Employees report problems without a Jira account. Admins send selected reports to engineering and can recover failed screenshots on the same issue.",
  "measurement": "With an isolated database and private file storage, I verified that linking an existing issue preserved the original report and its images."
}
---

> **My scope** — I built the employee report form, admin review board, and Go API for intake, Jira registration, and attachment recovery.

## Architecture

![The report form and admin board share a Go API. Selected reports and images go to Jira through Atlassian MCP.](/diagrams/voc.png)

## Problem · goal

Employees needed to report the page where an error occurred and include screenshots. Only some reports needed engineering work, so the service accepts reports first and lets an administrator decide which belong in Jira.

## Solution

1. **Intake.** The Go API stores the report and page link in MongoDB and the images in private MinIO storage. Administrators review them together on the board.
2. **Issue creation.** An administrator sends a selected report through Atlassian MCP. The API saves the Jira issue key before uploading screenshots. If the creation response is lost, the administrator checks Jira and links the existing issue.
3. **Attachment recovery.** The service retries a screenshot on the same issue when it can confirm the upload never ran. If the outcome is unclear, it checks Jira’s attachment list and holds the retry while the result is unknown.

## Results

- **Admin board.** Using an isolated database and local MinIO, I linked an existing ticket and retrieved the original report and images afterward.
- **Separate reporting agent.** I tested the Generative UI form using the development chat service and a local transfer API. A test user without a personal Jira connection created one real issue with two image attachments.
