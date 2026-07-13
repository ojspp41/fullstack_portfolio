"use client";

import { useEffect, useRef } from "react";

/**
 * Soft indigo glow that trails the cursor and swells over interactive
 * elements (ported from Portfolio_nextjs CursorGlow). Skipped on touch
 * devices and under prefers-reduced-motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = -400;
    let targetY = -400;
    let x = targetX;
    let y = targetY;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
    };
    const onOver = (e: MouseEvent) => {
      hovering = Boolean((e.target as Element | null)?.closest?.("a,button,summary"));
    };
    const onLeaveDoc = () => {
      el.style.opacity = "0";
    };

    const loop = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden />;
}
