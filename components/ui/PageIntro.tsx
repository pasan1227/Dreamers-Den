"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AframeMark } from "./AframeMark";

const STORAGE_KEY = "dd-intro-seen-v1";

export function PageIntro() {
  const root = useRef<HTMLDivElement | null>(null);
  const mark = useRef<HTMLDivElement | null>(null);
  const word = useRef<HTMLSpanElement | null>(null);
  const sub = useRef<HTMLSpanElement | null>(null);
  const slabTop = useRef<HTMLDivElement | null>(null);
  const slabBot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    let skip = false;
    try {
      skip =
        sessionStorage.getItem(STORAGE_KEY) === "1" ||
        globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // ignore — sessionStorage may be blocked
    }

    if (skip) {
      rootEl.style.display = "none";
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            // ignore
          }
          document.documentElement.style.overflow = "";
          rootEl.style.display = "none";
        },
      });

      tl.set([mark.current, word.current, sub.current], { opacity: 0 })
        .to(mark.current, { opacity: 1, duration: 0.7 }, 0.05)
        .fromTo(
          word.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out" },
          0.25,
        )
        .fromTo(
          sub.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9 },
          0.45,
        )
        .to({}, { duration: 0.5 })
        .to(
          [word.current, sub.current, mark.current],
          { opacity: 0, y: -12, duration: 0.55, ease: "power2.in" },
          "+=0.1",
        )
        .to(
          slabTop.current,
          { yPercent: -100, duration: 1.1, ease: "expo.inOut" },
          "<",
        )
        .to(
          slabBot.current,
          { yPercent: 100, duration: 1.1, ease: "expo.inOut" },
          "<",
        );
    }, root);

    return () => {
      document.documentElement.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="page-intro fixed inset-0 z-[100] pointer-events-none"
    >
      <div
        ref={slabTop}
        className="absolute inset-x-0 top-0 h-[50vh] bg-[var(--color-midnight-deep)] will-change-transform"
      />
      <div
        ref={slabBot}
        className="absolute inset-x-0 bottom-0 h-[50vh] bg-[var(--color-midnight-deep)] will-change-transform"
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-5 text-[var(--color-cream)]">
          <div ref={mark} className="will-change-transform opacity-0">
            <AframeMark size={44} tone="amber" glow />
          </div>
          <div className="overflow-hidden">
            <span
              ref={word}
              className="display block text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-[var(--color-cream)] opacity-0"
            >
              Dreamers{" "}
              <em className="font-light italic text-[var(--color-amber)]">
                Den.
              </em>
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={sub}
              className="block eyebrow text-[var(--color-amber)]/80 opacity-0"
            >
              <span className="rule mr-3" aria-hidden /> Nuwara Eliya · 1,868 m
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
