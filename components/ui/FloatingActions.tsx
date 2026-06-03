"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof globalThis.window === "undefined") return;
    const threshold = () => globalThis.innerHeight * 0.8;
    const onScroll = () => setShow(globalThis.scrollY > threshold());
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);
    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed right-4 bottom-24 lg:right-6 lg:bottom-6 z-[55] flex flex-col gap-3 transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Dreamers Den on WhatsApp"
        className="group relative flex h-12 w-12 lg:h-13 lg:w-13 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-midnight)] shadow-[0_18px_40px_-14px_rgba(232,161,75,0.65)] hover:bg-[var(--color-amber-bright)] transition-all duration-300 hover:-translate-y-[2px]"
      >
        <span
          aria-hidden
          className="absolute -inset-1 rounded-full bg-[var(--color-amber)]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden
          className="relative"
        >
          <path d="M16.04 4C9.97 4 5.06 8.92 5.06 14.98c0 2.13.62 4.1 1.7 5.78L5 28l7.46-1.7a10.94 10.94 0 0 0 3.58.62h.01c6.06 0 10.98-4.91 10.98-10.98 0-2.93-1.14-5.69-3.22-7.76A10.92 10.92 0 0 0 16.04 4Zm0 19.97h-.01a9.06 9.06 0 0 1-4.62-1.27l-.33-.2-3.94.9.84-3.84-.22-.34a9.05 9.05 0 0 1-1.39-4.84c0-5 4.07-9.07 9.08-9.07 2.42 0 4.7.95 6.41 2.66a9.02 9.02 0 0 1 2.66 6.42c0 5-4.07 9.08-9.08 9.08Zm5.2-6.78c-.28-.14-1.67-.83-1.93-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.62.07-.28-.14-1.19-.44-2.27-1.4-.84-.74-1.41-1.66-1.57-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.53-.87-2.1-.23-.55-.47-.48-.64-.49-.16-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.02.14.19 2.02 3.08 4.89 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.67-.68 1.91-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.33Z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={() =>
          globalThis.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label="Back to top"
        className="group flex h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-[var(--color-cream)]/25 text-[var(--color-cream)]/80 bg-[var(--color-midnight)]/70 backdrop-blur transition-all duration-300 hover:border-[var(--color-amber)]/60 hover:text-[var(--color-amber)] hover:-translate-y-[2px]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-y-[1px]"
        >
          <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" />
        </svg>
      </button>
    </div>
  );
}
