"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { SECTION_IDS } from "@/lib/constants";

const HIGHLIGHTS: ReadonlyArray<{ k: string; v: string }> = [
  { k: "Architecture", v: "Modern A-frame · two storeys" },
  { k: "Climate", v: "12 – 22 °C · year round" },
  { k: "Guests", v: "Up to 6 adults · 3 bedrooms" },
  { k: "Booked as", v: "The whole cabana" },
];

export function About() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={SECTION_IDS.about}
      className="relative py-28 lg:py-40 bg-[var(--color-midnight)] text-[var(--color-cream)] grain overflow-hidden"
    >
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="01"
            eyebrow="A triangle on the hillside"
            title={
              <>
                A sharp roof <em className="not-italic font-light italic text-[var(--color-amber)]">against the mist.</em>
              </>
            }
            lede="A black-clad A-frame above Badulla Road. Glass facade to the morning, soaring honey-timber to the ceiling, polished concrete underfoot."
            tone="dark"
          />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-10">
          <div
            className="relative aspect-[3/4] overflow-hidden bg-[var(--color-midnight-deep)]"
            data-reveal
          >
            <Image
              src="/images/cabana/dreamers-den-nuwara-eliya-pic-13.jpeg"
              alt="The Dreamers Den A-frame cabin in daylight, glass facade reflecting the sky"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between text-[var(--color-cream)]">
              <span className="eyebrow">85 Badulla Road · morning</span>
              <span className="font-[var(--font-mono)] text-[0.7rem] tabular-nums tracking-[0.2em]">
                06° 56′ N
              </span>
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(14,16,24,0.6), transparent)",
              }}
            />
          </div>

          <div
            className="relative space-y-7 max-w-[58ch] text-[1.05rem] leading-[1.78] text-[var(--color-cream)]/75"
            data-reveal
          >
            {/* gutter marginalia — desktop only */}
            <aside
              aria-hidden
              className="hidden xl:flex absolute -left-16 top-2 flex-col items-center gap-3 text-[var(--color-amber)]/65"
            >
              <span className="block h-12 w-px bg-[var(--color-amber)]/35" />
              <span className="vertical-mark text-[var(--color-cream)]/70">
                Est · 2020
              </span>
            </aside>
            <aside
              aria-hidden
              className="hidden xl:flex absolute -left-16 top-[44%] flex-col items-center gap-3 text-[var(--color-amber)]/65"
            >
              <span className="block h-12 w-px bg-[var(--color-amber)]/35" />
              <span className="vertical-mark text-[var(--color-cream)]/70">
                Elev · 1,868 m
              </span>
            </aside>

            <p>
              <span className="dropcap" aria-hidden>D</span>
              <span className="sr-only">D</span>reamers Den is a contemporary
              A-frame on Badulla Road, just above Gregory Lake. Three bedrooms,
              one cabin — taken as a whole, so the place is yours from the
              moment the key turns.
            </p>
            <p>
              The cabin reads like a single sculpted gesture: a triangle in
              dark-stained timber, a glass front looking down the valley, and a
              honey-warm interior that lights up like a lantern after the sun
              drops behind the hills. Polished concrete floors, microcement
              bathroom, a small kitchen, a balcony that tucks under the apex.
            </p>
            <p className="lede text-[1.5rem] leading-[1.3] text-[var(--color-cream)] pl-6 border-l border-[var(--color-amber)]/50">
              &ldquo;Stay a little longer than you planned. The hills will hold.&rdquo;
              <span className="block mt-3 eyebrow text-[var(--color-amber)]/80">
                — Your host, Dreamers Den
              </span>
            </p>
          </div>

          <dl
            className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--color-cream)]/15 pt-10"
            data-reveal
          >
            {HIGHLIGHTS.map((h) => (
              <div key={h.k} className="flex flex-col gap-1">
                <dt className="eyebrow text-[var(--color-amber)]/75">{h.k}</dt>
                <dd className="font-[var(--font-display)] text-[1.45rem] leading-tight text-[var(--color-cream)]">
                  {h.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
