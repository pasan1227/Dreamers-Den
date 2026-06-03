"use client";

import { useEffect, useState } from "react";

interface RailItem {
  readonly id: string;
  readonly label: string;
  readonly index: string;
}

const ITEMS: ReadonlyArray<RailItem> = [
  { id: "top",         label: "Arrival",     index: "00" },
  { id: "about",       label: "Story",       index: "01" },
  { id: "rooms",       label: "The Cabana",  index: "02" },
  { id: "gallery",     label: "Gallery",     index: "03" },
  { id: "experiences", label: "Wander",      index: "04" },
  { id: "reviews",     label: "Notes",       index: "05" },
  { id: "location",    label: "Find Us",     index: "06" },
  { id: "book",        label: "Book",        index: "07" },
];

export function SectionRail() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = ITEMS
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger when a section's midline crosses screen midline.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigator"
      className="hidden lg:flex fixed right-6 xl:right-8 top-1/2 -translate-y-1/2 z-[55] flex-col gap-3 pointer-events-none"
    >
      {ITEMS.map((it) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-label={`Jump to ${it.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group pointer-events-auto flex items-center gap-3 justify-end"
          >
            <span
              className={`font-[var(--font-mono)] text-[0.62rem] tracking-[0.28em] uppercase transition-all duration-500 ${
                isActive
                  ? "opacity-100 translate-x-0 text-[var(--color-amber)]"
                  : "opacity-0 -translate-x-2 text-[var(--color-cream)]/70 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              <span className="mr-2 text-[var(--color-cream)]/45">
                {it.index}
              </span>
              {it.label}
            </span>
            <span
              aria-hidden
              className={`relative block h-[1.5px] transition-all duration-500 ease-out ${
                isActive
                  ? "w-7 bg-[var(--color-amber)]"
                  : "w-3 bg-[var(--color-cream)]/35 group-hover:w-5 group-hover:bg-[var(--color-amber)]/70"
              }`}
            >
              {isActive ? (
                <span className="absolute inset-0 blur-[3px] bg-[var(--color-amber)]/60" />
              ) : null}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
