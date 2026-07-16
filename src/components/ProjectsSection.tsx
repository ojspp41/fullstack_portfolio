"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale, Project } from "@/lib/content";
import { UI } from "@/lib/i18n";
import Markdown from "./Markdown";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const FILTERS = [
  { key: "all" },
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

// same 2-color rule as the architecture diagram:
// direct build → accent, integration/understanding → sub (both locales)
function layerChipClass(layer: string): string {
  return /연동|이해|관점|협업|integration|understanding|perspective|collaboration/i.test(layer)
    ? "bg-sub/10 text-sub"
    : "bg-accent/10 text-accent";
}

function LayerChips({ layers, size = "sm" }: { layers: string[]; size?: "sm" | "md" }) {
  if (layers.length === 0) return null;
  const pad = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";
  return (
    <div className="flex flex-wrap gap-1.5">
      {layers.map((l) => (
        <span key={l} className={`rounded-full font-medium leading-snug ${pad} ${layerChipClass(l)}`}>
          {l}
        </span>
      ))}
    </div>
  );
}

export default function ProjectsSection({
  projects,
  locale = "ko",
}: {
  projects: Project[];
  locale?: Locale;
}) {
  const t = UI[locale].projects;
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

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

  // deep link: ?p=<id> opens the project on load…
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("p");
    if (id && projects.some((p) => p.id === id)) {
      setOpenId(id);
      document.getElementById("projects")?.scrollIntoView({ block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // …and the open modal is reflected back into the URL (shareable)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (openId) url.searchParams.set("p", openId);
    else url.searchParams.delete("p");
    window.history.replaceState(null, "", url);
  }, [openId]);

  // modal: ESC close + scroll lock + focus trap
  useEffect(() => {
    if (!openProject) return;
    openerRef.current = document.activeElement;
    panelRef.current?.querySelector<HTMLElement>("button[data-modal-close]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), summary, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [openProject, close]);

  return (
    <div>
      {/* filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={t.filterAria}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium shadow-sm transition-all duration-300 ${
              filter === f.key
                ? "grad-bg text-white shadow-indigo-500/30"
                : "border border-line bg-panel text-mute hover:scale-105 hover:text-ink"
            }`}
          >
            {"label" in f ? f.label : t.filterAll}
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
          <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
            <TiltCard>
            <button
              type="button"
              id={`project-${p.id}`}
              onClick={() => setOpenId(p.id)}
              className="group flex h-full w-full flex-col rounded-2xl border border-line bg-panel/85 p-5 text-left shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-semibold tracking-wide text-mute">
                  {String(p.order).padStart(2, "0")} · {CATEGORY_LABEL[p.category]}
                </span>
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-800 dark:bg-purple-500/20 dark:text-purple-200">
                  {p.badge}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold leading-snug">{p.title}</h3>
              <div className="mt-2.5">
                <LayerChips layers={p.layers} />
              </div>
              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-mute">{p.summary}</p>

              {/* metric chips — highlighted on hover */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.metrics.map((m) => (
                  <span
                    key={m.label}
                    title={m.note}
                    className="rounded-lg bg-panel2 px-2 py-1 text-[11px] text-mute transition-colors group-hover:text-ink"
                  >
                    <span className="opacity-70">{m.label}</span>{" "}
                    <span className="font-mono font-semibold text-accent">{m.value}</span>
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
                {p.stack.slice(0, 5).map((s) => (
                  <span key={s} className="rounded-md bg-bg/70 px-1.5 py-0.5 font-mono text-[10px] text-mute/90">
                    {s}
                  </span>
                ))}
                {p.stack.length > 5 && (
                  <span className="font-mono text-[10px] text-mute/50">+{p.stack.length - 5}</span>
                )}
                <span className="ml-auto text-[11px] font-medium text-accent/70 transition-colors group-hover:text-accent">
                  {t.cardHint}
                </span>
              </div>
            </button>
            </TiltCard>
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
            ref={panelRef}
            className="my-4 w-full max-w-3xl rounded-2xl border border-line bg-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 rounded-t-2xl border-b border-line bg-panel px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold tracking-wide text-accent">
                  {String(openProject.order).padStart(2, "0")} ·{" "}
                  {CATEGORY_LABEL[openProject.category]} · {openProject.badge}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-snug">{openProject.title}</h3>
                <div className="mt-2">
                  <LayerChips layers={openProject.layers} size="md" />
                </div>
              </div>
              <button
                type="button"
                data-modal-close
                onClick={close}
                aria-label={t.close}
                className="rounded-full border border-line px-3 py-1 text-sm text-mute transition-all hover:scale-105 hover:text-ink"
              >
                ESC
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {openProject.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-panel2 p-3">
                    <p className="text-[10px] font-semibold tracking-wide text-mute">{m.label}</p>
                    <p className="mt-1 font-mono text-sm font-bold text-accent">{m.value}</p>
                    {m.note && <p className="mt-1 text-[11px] text-mute">{m.note}</p>}
                  </div>
                ))}
              </div>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {openProject.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-medium text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200"
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
