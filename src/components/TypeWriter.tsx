"use client";

import { useEffect, useState } from "react";

const TITLES = [
  "풀스택 개발자",
  "백오피스 어드민 빌더",
  "AI / LLM 애플리케이션 개발자",
  "측정으로 증명하는 엔지니어",
];

/** Looping typewriter (ported from the old portfolio). SSR shows the first
 *  title so crawlers/no-JS still see meaningful text; reduced-motion keeps
 *  it static. */
export default function TypeWriter() {
  const [text, setText] = useState(TITLES[0]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    let index = 0;
    let pos = TITLES[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const title = TITLES[index];
      if (deleting) {
        pos -= 1;
        setText(title.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          index = (index + 1) % TITLES.length;
        }
        timer = setTimeout(tick, 40);
      } else {
        pos += 1;
        setText(TITLES[index].slice(0, pos));
        if (pos === TITLES[index].length) {
          deleting = true;
          timer = setTimeout(tick, 2000);
          return;
        }
        timer = setTimeout(tick, 90);
      }
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="grad-text font-bold">
      {text}
      {enabled && <span className="tw-caret" aria-hidden />}
    </span>
  );
}
