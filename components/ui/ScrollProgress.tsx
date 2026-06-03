"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bar.current) return;
    const el = bar.current;
    const setX = gsap.quickTo(el, "scaleX", {
      duration: 0.25,
      ease: "power3.out",
    });

    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setX(p);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-amber-bright)] to-[var(--color-honey)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
