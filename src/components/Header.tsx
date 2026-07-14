"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export interface NavItem {
  id: string;
  label: string;
}

/**
 * Sticky header: section links with scroll-spy, always-visible conversion
 * CTAs (PDF / email), theme toggle, and the scroll progress bar.
 */
export default function Header({
  items,
  email,
  resumePdf,
}: {
  items: NavItem[];
  email: string;
  resumePdf?: string;
}) {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const s of items) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-panel/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <a href="#hero" className="shrink-0 text-base font-extrabold tracking-tight">
          오준석<span className="grad-text">.</span>
        </a>

        <nav
          aria-label="섹션 내비게이션"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                active === s.id
                  ? "bg-accent/10 font-semibold text-accent"
                  : "text-mute hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {resumePdf && (
            <a
              href={resumePdf}
              download
              className="grad-bg rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-500/30 transition-shadow hover:shadow-md hover:shadow-indigo-500/40"
            >
              PDF ↓
            </a>
          )}
          <a
            href={`mailto:${email}`}
            className="hidden rounded-lg border border-line bg-panel px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent md:block"
          >
            이메일
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* scroll progress */}
      <div
        className="grad-bg absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </header>
  );
}
