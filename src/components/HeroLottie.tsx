"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

/**
 * Developer Lottie animation from the old portfolio hero.
 * The JSON (~300KB) and the lottie runtime load lazily after idle so the
 * initial bundle and LCP are untouched; skipped under reduced motion.
 */
export default function HeroLottie() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const load = () =>
      fetch("/animation.json")
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load);
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(load, 800);
    return () => clearTimeout(t);
  }, []);

  if (!data) return null;

  return (
    <Lottie
      loop
      play
      animationData={data}
      className="pointer-events-none h-full w-full"
      aria-hidden
    />
  );
}
