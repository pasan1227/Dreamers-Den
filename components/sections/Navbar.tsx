"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { useScrolled } from "@/lib/hooks/useScrolled";
import { site } from "@/data/site";

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    if (typeof globalThis.window === "undefined") return;
    const ids = ["top", ...site.nav.map((n) => n.href.replace("#", "")), "book"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const bgClass = scrolled
    ? "frosted border-b border-[var(--color-amber)]/15"
    : "bg-transparent border-b border-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[58] transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${bgClass}`}
    >
      <Container as="div" className="flex items-center justify-between py-4 lg:py-5">
        <a
          href="#top"
          className="group flex items-center gap-3 text-[var(--color-cream)]"
          aria-label="Dreamers Den — home"
        >
          <span className="block transition-transform duration-500 group-hover:scale-[1.04]">
            <Logo size={48} tone="cream" className="lg:!w-[56px] lg:!h-[56px]" />
          </span>
           <span className="flex items-baseline gap-3">
            <span className="display text-2xl lg:text-[1.6rem] leading-none">
              Dreamers Den
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {site.nav.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className="relative eyebrow text-[var(--color-cream)]/85 hover:text-[var(--color-amber)] transition-colors duration-300 py-1"
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px bg-[var(--color-amber)] transition-[width,opacity] duration-500 ease-out ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            as="a"
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="md"
          >
            Book the Cabana
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)] z-[61]"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-full bg-[var(--color-cream)] origin-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-px w-full bg-[var(--color-cream)] origin-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </Container>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`lg:hidden fixed inset-0 z-[60] transition-[opacity,visibility] duration-500 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[var(--color-midnight-deep)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 grain pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(232,161,75,0.10), transparent 70%)",
          }}
        />
        <Container
          as="div"
          className="relative h-full flex flex-col gap-10 pt-28 pb-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[var(--color-cream)]">
              <Logo size={56} tone="cream" />
              <span className="display text-2xl">Dreamers Den</span>
            </div>
          </div>

          <p className="eyebrow text-[var(--color-amber)]/80">
            <span className="rule mr-3" aria-hidden /> Wander where you like
          </p>

          <nav
            aria-label="Primary mobile"
            className="flex flex-col gap-1"
          >
            {site.nav.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                }}
                className={`group flex items-baseline justify-between border-b border-[var(--color-cream)]/10 py-5 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="display text-[clamp(2rem,8vw,3rem)] text-[var(--color-cream)] group-hover:text-[var(--color-amber)] transition-colors">
                  {link.label}
                </span>
                <span className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.22em] uppercase text-[var(--color-amber)]/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>

          <div
            style={{ transitionDelay: open ? "440ms" : "0ms" }}
            className={`mt-auto flex flex-col gap-4 transition-all duration-700 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              as="a"
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              size="lg"
              className="justify-center"
            >
              Book the Cabana
            </Button>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border border-[var(--color-cream)]/20 rounded-full px-5 py-3 text-[var(--color-cream)]/85"
            >
              <span className="eyebrow">WhatsApp</span>
              <span className="font-[var(--font-display)] text-base">
                {site.whatsapp}
              </span>
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
