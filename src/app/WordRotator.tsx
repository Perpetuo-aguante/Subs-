"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 2600;

/** Cycles through a list of words in place. */
export function WordRotator({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [words.length]);

  const previous = (index - 1 + words.length) % words.length;

  return (
    <>
      {/* The live word is announced once; the animated siblings stay silent. */}
      <span className="sr-only" aria-live="polite">
        {words[index]}
      </span>
      <span className="rotator" aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={word}
            className="rotator__item"
            data-state={i === index ? "current" : i === previous ? "leaving" : "waiting"}
          >
            {word}
          </span>
        ))}
      </span>
    </>
  );
}
