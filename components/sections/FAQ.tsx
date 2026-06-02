"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { faqs } from "@/data/faqs";
import { SECTION_IDS } from "@/lib/constants";
import type { Faq } from "@/lib/types";

interface FaqItemProps {
  readonly faq: Faq;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

function FaqItem({ faq, isOpen, onToggle }: FaqItemProps) {
  const panelId = `faq-panel-${faq.id}`;
  const buttonId = `faq-trigger-${faq.id}`;

  return (
    <div
      data-reveal
      className="border-b border-[var(--color-cream)]/15"
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-300 hover:text-[var(--color-amber)]"
      >
        <span className="font-[var(--font-display)] text-[clamp(1.15rem,1.6vw,1.5rem)] leading-tight text-[var(--color-cream)] transition-colors duration-300 group-hover:text-[var(--color-amber)]">
          {faq.question}
        </span>
        <span
          aria-hidden
          className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-cream)]/25 text-[var(--color-amber)] transition-all duration-500 ease-out group-hover:border-[var(--color-amber)]/70 ${
            isOpen ? "rotate-45 bg-[var(--color-amber)] text-[var(--color-midnight)]" : ""
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M7 1.5v11M1.5 7h11" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[60ch] pr-12 pb-7 text-[1rem] leading-[1.75] text-[var(--color-cream)]/70">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.06, y: 24 });
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id={SECTION_IDS.faq}
      className="relative py-28 lg:py-40 bg-[var(--color-midnight)] text-[var(--color-cream)]"
    >
      <Container className="flex flex-col gap-16">
        <header className="flex flex-col items-center gap-6 text-center">
          <div
            data-reveal
            className="flex items-center justify-center gap-4 text-[var(--color-amber)]"
          >
            <span
              aria-hidden
              className="block h-px w-12 bg-[var(--color-amber)]/60"
            />
            <span className="eyebrow text-[var(--color-amber)]">Things people ask</span>
            <span
              aria-hidden
              className="block h-px w-12 bg-[var(--color-amber)]/60"
            />
          </div>
          <h2
            data-reveal
            className="headline max-w-[20ch] text-[clamp(2.25rem,5vw,4.25rem)] text-[var(--color-cream)]"
          >
            Before you turn{" "}
            <em className="not-italic font-light italic text-[var(--color-amber)]">
              up the hill
            </em>
          </h2>
        </header>

        <div className="mx-auto w-full max-w-[820px]">
          {faqs.map((f) => (
            <FaqItem
              key={f.id}
              faq={f}
              isOpen={openId === f.id}
              onToggle={() => setOpenId(openId === f.id ? null : f.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
