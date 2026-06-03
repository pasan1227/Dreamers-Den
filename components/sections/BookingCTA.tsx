"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FairyLights } from "@/components/ui/FairyLights";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { site } from "@/data/site";
import { SECTION_IDS } from "@/lib/constants";

export function BookingCTA() {
  const ref = useGsapReveal<HTMLElement>({ y: 36 });

  return (
    <section
      ref={ref}
      id={SECTION_IDS.book}
      className="relative isolate overflow-hidden bg-[var(--color-midnight-deep)] text-[var(--color-cream)] grain py-28 lg:py-40"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cabana/dreamers-den-nuwara-eliya-pic-17.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(6,8,15,0.92) 0%, rgba(14,16,24,0.75) 45%, rgba(42,31,56,0.6) 100%)",
          }}
        />
      </div>

      <Container className="relative flex flex-col gap-12 lg:gap-16 items-start">
        <div
          className="absolute right-4 lg:right-12 -top-6 lg:-top-10 pointer-events-none opacity-90"
          aria-hidden
          data-reveal
        >
          <FairyLights width={300} height={210} tone="amber" density={14} />
        </div>

        <p
          className="eyebrow text-[var(--color-amber)]/85 flex items-center gap-4"
          data-reveal
        >
          <span className="rule" aria-hidden /> The invitation
        </p>
        <h2
          className="display text-[clamp(3rem,10vw,9rem)] text-[var(--color-cream)] max-w-[14ch]"
          data-reveal
        >
          Stay{" "}
          <em className="not-italic font-light italic text-[var(--color-amber)]">
            awhile.
          </em>
        </h2>
        <p
          className="lede text-[clamp(1.1rem,1.5vw,1.5rem)] text-[var(--color-cream)]/80 max-w-[48ch]"
          data-reveal
        >
          One A-frame, three bedrooms, six adult guests at most. We answer
          messages within the day — usually with a recommendation for the next
          morning&rsquo;s walk.
        </p>

        <div className="flex flex-wrap items-center gap-4" data-reveal>
          <Button
            as="a"
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="lg"
          >
            Book the Cabana <span aria-hidden>→</span>
          </Button>
          <Button
            as="a"
            href={site.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            size="lg"
          >
            WhatsApp Us
          </Button>
        </div>

        <dl
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 w-full border-t border-[var(--color-cream)]/15 pt-12 mt-4"
          data-reveal
        >
          <div>
            <dt className="eyebrow text-[var(--color-amber)]/75">Phone</dt>
            <dd className="font-[var(--font-display)] text-[1.2rem] mt-2 text-[var(--color-cream)]">
              {site.phone}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-[var(--color-amber)]/75">WhatsApp</dt>
            <dd className="font-[var(--font-display)] text-[1.2rem] mt-2 text-[var(--color-cream)]">
              {site.whatsapp}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-[var(--color-amber)]/75">Email</dt>
            <dd className="font-[var(--font-display)] text-[1.2rem] mt-2 text-[var(--color-cream)]">
              {site.email}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-[var(--color-amber)]/75">Rates</dt>
            <dd className="font-[var(--font-display)] text-[1.2rem] mt-2 text-[var(--color-cream)]">
              Seasonal — message for a quote
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
