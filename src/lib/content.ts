import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ---------- projects ---------- */

export const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  note: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  category: z.enum(["fullstack", "frontend", "infra"]),
  badge: z.string(),
  stack: z.array(z.string()),
  metrics: z.array(metricSchema),
  summary: z.string(),
});

export type ProjectMeta = z.infer<typeof projectSchema>;
export type Metric = z.infer<typeof metricSchema>;

export interface Project extends ProjectMeta {
  body: string;
}

export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      const meta = projectSchema.parse(data);
      return { ...meta, body: content.trim() };
    })
    .sort((a, b) => a.order - b.order);
}

/* ---------- profile ---------- */

const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  github: z.string(),
  website: z.string().optional(),
  tagline: z.string(),
  subtagline: z.string().optional(),
  resumePdf: z.string().optional(),
});

export interface HeroStat {
  label: string;
  value: string;
  note: string;
}

export interface Profile extends z.infer<typeof profileSchema> {
  intro: string;
  stats: HeroStat[];
  heroStats: HeroStat[];
  stack: string;
  strengths: string;
}

/** Extract the body of a `## heading` section (until the next `##` or end). */
function extractSection(body: string, heading: string): string {
  const re = new RegExp(`^##\\s+${heading}[^\\n]*\\n([\\s\\S]*?)(?=^##\\s|$(?![\\s\\S]))`, "m");
  return re.exec(body)?.[1]?.trim() ?? "";
}

/** Parse a GFM table into rows of cell arrays (header excluded). */
function parseTableRows(md: string): string[][] {
  return md
    .split("\n")
    .filter((l) => l.trim().startsWith("|"))
    .slice(2) // header + separator
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((c) => c.trim().replace(/\*\*/g, ""))
    );
}

// The four headline stats shown as Hero counters (label match against profile.md table)
// Full-stack first: metering API speedup → scale → render → docker image
const HERO_STAT_LABELS = ["조회 속도", "서비스 규모", "리렌더", "도커 이미지"];

export function getProfile(): Profile {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "sections", "profile.md"), "utf8");
  const { data, content } = matter(raw);
  const meta = profileSchema.parse(data);

  const intro = content
    .split(/^##\s/m)[0]
    .replace(/^#\s+[^\n]+\n/m, "")
    .trim();

  const stats: HeroStat[] = parseTableRows(extractSection(content, "핵심 지표")).map(
    ([label, value, note]) => ({ label, value, note: note ?? "" })
  );

  const heroStats = HERO_STAT_LABELS.map((l) => stats.find((s) => s.label === l)).filter(
    (s): s is HeroStat => Boolean(s)
  );

  return {
    ...meta,
    intro,
    stats,
    heroStats: heroStats.length === 4 ? heroStats : stats.slice(0, 4),
    stack: extractSection(content, "Tech Stack"),
    strengths: extractSection(content, "강점 & 협업 역량"),
  };
}

/* ---------- experience ---------- */

export interface ExperienceContent {
  jobs: string[]; // markdown blocks, one per position
  extra: string; // 학력 · 동아리
}

export function getExperience(): ExperienceContent {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "sections", "experience.md"), "utf8");
  const { content } = matter(raw);
  const blocks = content
    .replace(/^#\s+[^\n]+\n/m, "")
    .split(/^---$/m)
    .map((b) => b.trim())
    .filter(Boolean);
  return { jobs: blocks.slice(0, -1), extra: blocks.at(-1) ?? "" };
}

/* ---------- side projects ---------- */

export interface SideProjectsContent {
  cards: string[]; // one markdown block per side project
  awards: string; // 수상 내역 markdown
  aiExperience: string; // AI 활용 경험 markdown
}

export function getSideProjects(): SideProjectsContent {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "sections", "side-projects.md"), "utf8");
  const { content } = matter(raw);

  // top-level `# ` sections
  const sections = content.split(/^#\s+/m).filter(Boolean);
  const find = (title: string) =>
    sections.find((s) => s.startsWith(title))?.replace(/^[^\n]+\n/, "").trim() ?? "";

  const projectsSection = find("오픈소스 & 사이드 프로젝트").split(/^---$/m)[0];
  const cards = projectsSection
    .split(/^##\s+/m)
    .filter((s) => s.trim())
    .map((s) => `## ${s.trim()}`);

  return {
    cards,
    awards: find("수상 내역").split(/^---$/m)[0].trim(),
    aiExperience: find("AI 활용 경험").trim(),
  };
}
