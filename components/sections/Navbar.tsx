"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AframeMark } from "@/components/ui/AframeMark";
import { useScrolled } from "@/lib/hooks/useScrolled";
import { site } from "@/data/site";

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  const bgClass = scrolled
    ? "bg-[var(--color-midnight)]/95 border-b border-[var(--color-amber)]/15"
    : "bg-transparent border-b border-transparent";

  const linkColor =
    "text-[var(--color-cream)]/85 hover:text-[var(--color-amber)] transition-colors duration-300";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-out ${bgClass}`}
    >
      <Container as="div" className="flex items-center justify-between py-4 lg:py-5">
        <a
          href="#top"
          className="group flex items-center gap-3 text-[var(--color-cream)]"
          aria-label="Dreamers Den — home"
        >
          <AframeMark size={26} tone="amber" glow />
          <span className="flex items-baseline gap-3">
            <span className="display text-2xl lg:text-[1.6rem] leading-none">
              Dreamers Den
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href} className={`eyebrow ${linkColor}`}>
              {link.label}
            </a>
          ))}
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
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)]"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden>{open ? "✕" : "☰"}</span>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        } bg-[var(--color-midnight)] border-t border-[var(--color-amber)]/15`}
      >
        <Container as="div" className="flex flex-col gap-6 py-8">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="display text-3xl text-[var(--color-cream)] hover:text-[var(--color-amber)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            as="a"
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="lg"
          >
            Book the Cabana
          </Button>
        </Container>
      </div>
    </header>
  );
}
