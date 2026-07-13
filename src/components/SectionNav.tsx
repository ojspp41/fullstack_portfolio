"use client";

import { useEffect, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
}

export default function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
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
    for (const s of sections) {
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
  }, [sections]);

  return (
    <>
      {/* scroll progress indicator */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-line/50">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* right fixed dot navigation */}
      <nav
        aria-label="섹션 내비게이션"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-2"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-widest transition-opacity ${
                  isActive ? "text-accent opacity-100" : "text-mute opacity-0 group-hover:opacity-100"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block h-2 w-2 rounded-full border transition-colors ${
                  isActive ? "border-accent bg-accent" : "border-mute bg-transparent group-hover:border-ink"
                }`}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
