"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up a numeric metric value on viewport entry.
 * Handles values like "1만 명", "99.6%↓", "750배↑"; values without a
 * number ("장관상") simply fade in via the parent Reveal.
 */
export default function MetricCounter({ value }: { value: string }) {
  const match = value.match(/([0-9][\d,]*\.?\d*)/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(match ? "0" : value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const target = parseFloat(match[1].replace(/,/g, ""));
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[1].length);
    const format = (v: number) =>
      prefix +
      v.toLocaleString("ko-KR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

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
          setDisplay(t < 1 ? format(target * eased) : value);
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
      {display}
    </span>
  );
}
