"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function StickyBookingDock() {
  const [show, setShow] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    if (typeof globalThis.window === "undefined") return;
    const onScroll = () => {
      const h = globalThis.innerHeight;
      setShow(globalThis.scrollY > h * 0.85);

      // Hide when the BookingCTA / Footer enters view (avoid double-CTA).
      const bookEl = document.getElementById("book");
      if (bookEl) {
        const rect = bookEl.getBoundingClientRect();
        setAtFooter(rect.top < h * 0.6);
      }
    };
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);
    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
    };
  }, []);

  const visible = show && !atFooter;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-3 bottom-3 z-[54] lg:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="frosted flex items-center gap-3 rounded-full border border-[var(--color-amber)]/30 px-3 py-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col leading-tight pl-2">
          <span className="font-[var(--font-mono)] text-[0.6rem] tracking-[0.22em] uppercase text-[var(--color-amber)]/85">
            From {site.pricePerNightUsd}
          </span>
          <span className="font-[var(--font-display)] text-[0.95rem] text-[var(--color-cream)] leading-tight">
            per night · whole cabana
          </span>
        </div>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-amber)] px-4 py-2.5 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-[var(--color-midnight)] shadow-[0_10px_30px_-12px_rgba(232,161,75,0.7)]"
        >
          Book <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
