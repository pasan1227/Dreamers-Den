"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { SECTION_IDS } from "@/lib/constants";
import type { Review, ReviewSummary } from "@/lib/types";

function StarRow({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-amber"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 1.6l2.62 5.31 5.86.85-4.24 4.13 1 5.84L10 14.98l-5.24 2.75 1-5.84L1.52 7.76l5.86-.85L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const meta = [r.location, r.type].filter(Boolean).join(" · ");
  return (
    <figure
      className="group relative flex h-full flex-col gap-6 border border-cream/10 bg-midnight p-8 lg:p-9 transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-amber/30 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(232,161,75,0.18)]"
    >
      {/* warm corner glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 0%, rgba(232,161,75,0.10), transparent 60%)",
        }}
      />
      {/* oversized opening quote mark */}
      <span
        aria-hidden
        className="absolute top-4 right-5 font-(--font-display) text-[5.5rem] leading-none text-amber/15 group-hover:text-amber/30 transition-colors duration-700 select-none"
      >
        &ldquo;
      </span>

      <StarRow count={r.rating} />
      <blockquote className="relative lede text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.45] text-cream">
        {r.quote}
      </blockquote>
      <figcaption className="relative mt-auto flex items-center gap-4 border-t border-cream/15 pt-5">
        {r.avatarUrl ? (
          <Image
            src={r.avatarUrl}
            alt=""
            width={40}
            height={40}
            unoptimized
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-amber/40 group-hover:shadow-[0_0_20px_rgba(232,161,75,0.6)] transition-shadow duration-500"
          />
        ) : (
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber font-(--font-display) text-[1.05rem] text-midnight group-hover:shadow-[0_0_20px_rgba(232,161,75,0.6)] transition-shadow duration-500"
          >
            {r.initial}
          </span>
        )}
        <div className="flex flex-col leading-tight">
          <span className="font-(--font-display) text-[1.05rem] text-cream">
            {r.author}
          </span>
          {meta && (
            <span className="font-(--font-mono) text-[0.72rem] uppercase tracking-[0.18em] text-cream/55">
              {meta}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

interface ReviewsViewProps {
  readonly reviews: ReadonlyArray<Review>;
  readonly summary: ReviewSummary;
}

export function ReviewsView({ reviews, summary }: ReviewsViewProps) {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.07, y: 32 });

  return (
    <section
      ref={ref}
      id={SECTION_IDS.reviews}
      className="relative py-28 lg:py-40 bg-[var(--color-midnight-deep)] text-cream"
    >
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Notes left behind"
            title={
              <>
                They came for a night.{" "}
                <em className="font-light italic text-amber">
                  Most stayed two.
                </em>
              </>
            }
            tone="dark"
          />

          <div
            data-reveal
            className="flex items-start gap-5 lg:pl-10"
            aria-label={`Overall rating ${summary.score} out of 5, ${summary.label}`}
          >
            <p className="display text-[clamp(3rem,5vw,4.5rem)] leading-none text-cream">
              {summary.score}
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="font-(--font-display) text-[1.05rem] text-amber">
                {summary.label}
              </span>
              <StarRow count={5} />
              <span className="font-(--font-mono) text-[0.72rem] uppercase tracking-[0.18em] text-cream/55">
                {summary.source} · {summary.count} reviews
              </span>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="marquee-mask relative mt-16 overflow-hidden"
        role="region"
        aria-label="Guest reviews"
      >
        <div className="marquee-track marquee-reviews flex w-max">
          <ul className="flex shrink-0 items-stretch gap-5 px-2.5">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="shrink-0 w-[min(85vw,26rem)]"
              >
                <ReviewCard r={r} />
              </li>
            ))}
          </ul>
          <ul
            className="flex shrink-0 items-stretch gap-5 px-2.5"
            aria-hidden="true"
          >
            {reviews.map((r) => (
              <li
                key={`dup-${r.id}`}
                className="shrink-0 w-[min(85vw,26rem)]"
              >
                <ReviewCard r={r} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
