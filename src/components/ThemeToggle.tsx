"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark toggle. The initial theme is applied by an inline script in
 * layout.tsx before paint (localStorage > system preference > dark), so this
 * component only reads the resulting class after mount and flips it.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    if (dark === null) return;
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode 등 저장 불가 환경은 무시 */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-lg shadow-md transition-all duration-300 hover:scale-110 hover:border-accent/50"
    >
      <span aria-hidden>{dark === null ? "✨" : dark ? "🌙" : "☀️"}</span>
    </button>
  );
}
