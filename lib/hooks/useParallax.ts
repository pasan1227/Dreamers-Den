"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxOptions {
  readonly speed?: number;
  readonly scale?: number;
}

function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const speed = options.speed ?? 0.35;
    const scale = options.scale ?? 1.12;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 50, scale },
        {
          yPercent: speed * 50,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [options.speed, options.scale]);

  return ref;
}
