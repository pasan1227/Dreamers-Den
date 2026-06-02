"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { site } from "@/data/site";
import { SECTION_IDS } from "@/lib/constants";

const DISTANCES: ReadonlyArray<{ place: string; dist: string; time: string }> = [
  { place: "Gregory Lake", dist: "1.6 km", time: "5 min" },
  { place: "Magasthota Junction", dist: "0.5 km", time: "6 min walk" },
  { place: "Holy Trinity Church", dist: "3.1 km", time: "10 min" },
  { place: "Mackwoods Tea Museum", dist: "3.6 km", time: "10 min" },
  { place: "Hakgala Botanical Garden", dist: "5.5 km", time: "15 min" },
  { place: "Lover's Leap Waterfall", dist: "~5 km", time: "15 min" },
  { place: "Horton Plains · World's End", dist: "33 km", time: "1 hr 30" },
  { place: "Kandy (nearest hub)", dist: "75 km", time: "2 hr 30" },
];

export function Location() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={SECTION_IDS.location}
      className="relative py-28 lg:py-40 bg-[var(--color-midnight)] text-[var(--color-cream)]"
    >
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="06"
            eyebrow="Where to point the tuk-tuk"
            title={
              <>
                Tucked into the{" "}
                <em className="not-italic font-light italic text-[var(--color-amber)]">
                  hills above town.
                </em>
              </>
            }
            lede="Three kilometres from Nuwara Eliya proper, just above Gregory Lake on Badulla Road."
            tone="dark"
          />

          <div
            className="mt-10 flex flex-col gap-4 border-t border-[var(--color-cream)]/15 pt-8"
            data-reveal
          >
            <p className="eyebrow text-[var(--color-amber)]/75">Address</p>
            <p className="font-[var(--font-display)] text-[1.45rem] leading-tight text-[var(--color-cream)]">
              {site.address}
            </p>
            <p className="font-[var(--font-mono)] text-[0.78rem] tabular-nums tracking-[0.18em] uppercase text-[var(--color-cream)]/55">
              {site.coords.lat.toFixed(4)}° N · {site.coords.lng.toFixed(4)}° E
            </p>
          </div>

          <dl
            className="mt-10 grid grid-cols-1 gap-3 border-t border-[var(--color-cream)]/15 pt-8"
            data-reveal
          >
            {DISTANCES.map((d) => (
              <div
                key={d.place}
                className="flex items-baseline justify-between gap-4 py-2 border-b border-dashed border-[var(--color-cream)]/12 last:border-none"
              >
                <dt className="text-[0.95rem] text-[var(--color-cream)]/85">
                  {d.place}
                </dt>
                <dd className="flex items-baseline gap-4 font-[var(--font-mono)] text-[0.78rem] tabular-nums tracking-[0.18em] uppercase text-[var(--color-amber)]/80">
                  <span>{d.dist}</span>
                  <span aria-hidden>·</span>
                  <span>{d.time}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <div className="relative aspect-[5/6] overflow-hidden bg-[var(--color-midnight-deep)]">
            <iframe
              title="Map showing Dreamers Den on Badulla Road, Nuwara Eliya"
              src={site.mapEmbed}
              className="absolute inset-0 h-full w-full"
              style={{ filter: "invert(0.92) hue-rotate(180deg) contrast(0.85)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
