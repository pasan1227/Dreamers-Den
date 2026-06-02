"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_DEFAULTS } from "@/lib/constants";

interface RevealOptions {
  readonly selector?: string;
  readonly y?: number;
  readonly duration?: number;
  readonly stagger?: number;
  readonly start?: string;
  readonly once?: boolean;
}

const DEFAULT_SELECTOR = "[data-reveal]";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useGsapReveal<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) {
      const targets = root.querySelectorAll<HTMLElement>(
        options.selector ?? DEFAULT_SELECTOR,
      );
      targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const selector = options.selector ?? DEFAULT_SELECTOR;
    const y = options.y ?? REVEAL_DEFAULTS.yOffset;
    const duration = options.duration ?? REVEAL_DEFAULTS.duration;
    const stagger = options.stagger ?? REVEAL_DEFAULTS.stagger;
    const start = options.start ?? "top 82%";
    const once = options.once ?? true;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            ease: REVEAL_DEFAULTS.ease,
            delay: stagger * i,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: once
                ? "play none none none"
                : "play reverse play reverse",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [
    options.selector,
    options.y,
    options.duration,
    options.stagger,
    options.start,
    options.once,
  ]);

  return ref;
}
