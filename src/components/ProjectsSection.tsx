"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/content";
import Markdown from "./Markdown";
import Reveal from "./Reveal";

const FILTERS = [
  { key: "all", label: "전체" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "frontend", label: "Frontend" },
  { key: "infra", label: "Infra" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const CATEGORY_LABEL: Record<Project["category"], string> = {
  fullstack: "FULL-STACK",
  frontend: "FRONTEND",
  infra: "INFRA",
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  // architecture diagram → open project modal
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setFilter("all");
      setOpenId(id);
      document.getElementById("projects")?.scrollIntoView({ block: "start" });
    };
    document.addEventListener("open-project", onOpen);
    return () => document.removeEventListener("open-project", onOpen);
  }, []);

  // modal: ESC close + scroll lock
  useEffect(() => {
    if (!openProject) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openProject, close]);

  return (
    <div>
      {/* filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="프로젝트 카테고리 필터">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-md border px-4 py-1.5 font-mono text-sm transition-colors ${
              filter === f.key
                ? "border-amber bg-amber/10 text-amber"
                : "border-line text-mute hover:border-mute hover:text-ink"
            }`}
          >
            {f.label}
            <span className="ml-2 text-xs opacity-60">
              {f.key === "all"
                ? projects.length
                : projects.filter((p) => p.category === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 80}>
            <button
              type="button"
              id={`project-${p.id}`}
              onClick={() => setOpenId(p.id)}
              className="group flex h-full w-full flex-col rounded-lg border border-line bg-panel p-5 text-left transition-colors hover:border-amber/60"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-mute">
                  {String(p.order).padStart(2, "0")} · {CATEGORY_LABEL[p.category]}
                </span>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-mute group-hover:border-amber/50 group-hover:text-amber">
                  {p.badge}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mute">{p.summary}</p>

              {/* metric chips — highlighted on hover */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.metrics.map((m) => (
                  <span
                    key={m.label}
                    title={m.note}
                    className="rounded border border-line bg-bg/60 px-2 py-1 font-mono text-[11px] text-mute transition-colors group-hover:border-amber/40 group-hover:text-ink"
                  >
                    <span className="opacity-70">{m.label}</span>{" "}
                    <span className="font-semibold text-amber">{m.value}</span>
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {p.stack.slice(0, 5).map((s) => (
                  <span key={s} className="font-mono text-[10px] text-mute/80">
                    {s}
                  </span>
                ))}
                {p.stack.length > 5 && (
                  <span className="font-mono text-[10px] text-mute/50">+{p.stack.length - 5}</span>
                )}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* detail modal */}
      {openProject && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={openProject.title}
          onClick={close}
        >
          <div
            className="my-4 w-full max-w-3xl rounded-lg border border-line bg-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-lg border-b border-line bg-panel px-6 py-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-amber">
                  {String(openProject.order).padStart(2, "0")} ·{" "}
                  {CATEGORY_LABEL[openProject.category]} · {openProject.badge}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-snug">{openProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="닫기"
                className="rounded-md border border-line px-2.5 py-1 font-mono text-sm text-mute transition-colors hover:border-mute hover:text-ink"
              >
                ESC
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
                {openProject.metrics.map((m) => (
                  <div key={m.label} className="bg-panel2 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
                      {m.label}
                    </p>
                    <p className="mt-1 font-mono text-sm font-bold text-amber">{m.value}</p>
                    {m.note && <p className="mt-1 text-[11px] text-mute">{m.note}</p>}
                  </div>
                ))}
              </div>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {openProject.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line bg-bg/60 px-2 py-0.5 font-mono text-[11px] text-mute"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Markdown>{openProject.body}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
