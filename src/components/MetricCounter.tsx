"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Metric value with a count-up as progressive enhancement.
 *
 * The server-rendered HTML always contains the FINAL value (crawlers, link
 * previews, and no-JS visitors see "750배↑", never "0"). Only after the
 * component mounts — i.e. JS is actually running — does the number animate
 * 0 → target on viewport entry. prefers-reduced-motion skips the animation.
 *
 * Mixed values like "1만 명" are split so only the numeric part animates;
 * prefix/suffix stay as fixed text.
 */
export default function MetricCounter({ value }: { value: string }) {
  const match = value.match(/([0-9][\d,]*\.?\d*)/);
  const ref = useRef<HTMLSpanElement>(null);
  // SSR + first client render: final number. Animation replaces it after mount.
  const [displayNum, setDisplayNum] = useState(match ? match[1] : null);

  const prefix = match ? value.slice(0, match.index) : value;
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : "";

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const finalText = match[1];
    const target = parseFloat(finalText.replace(/,/g, ""));
    const decimals = finalText.includes(".") ? finalText.split(".")[1].length : 0;
    const format = (v: number) =>
      v.toLocaleString("ko-KR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplayNum(t < 1 ? format(target * eased) : finalText);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {displayNum !== null && <span>{displayNum}</span>}
      {suffix}
    </span>
  );
}
