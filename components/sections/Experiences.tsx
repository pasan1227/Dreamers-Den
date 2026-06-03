"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { experiences } from "@/data/experiences";
import { SECTION_IDS } from "@/lib/constants";
import type { Experience } from "@/lib/types";

interface CardProps {
  readonly exp: Experience;
  readonly index: number;
  readonly horizontal?: boolean;
}

function ExperienceCard({ exp, index, horizontal = false }: CardProps) {
  const widthClass = horizontal
    ? "w-[min(82vw,440px)] shrink-0"
    : "";
  return (
    <article
      data-reveal={horizontal ? undefined : ""}
      className={`group relative flex flex-col bg-[var(--color-midnight)] text-[var(--color-cream)] border border-[var(--color-cream)]/8 overflow-hidden ${widthClass}`}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[var(--color-midnight-deep)]">
        <Image
          src={exp.image}
          alt={exp.imageAlt}
          fill
          sizes={
            horizontal
              ? "(max-width: 1024px) 100vw, 440px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 font-[var(--font-mono)] text-[0.7rem] tracking-[0.22em] uppercase text-[var(--color-cream)] bg-[var(--color-midnight-deep)]/65 backdrop-blur px-2.5 py-1 rounded-full">
          {String(index + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
        </span>
        <span className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-midnight)]">
          <Icon name={exp.icon} size={16} />
        </span>
      </div>

      <div className="p-6 lg:p-7 flex flex-col gap-3 flex-1">
        <p className="eyebrow text-[var(--color-amber)]/80">{exp.distance}</p>
        <h3 className="display text-[1.8rem] leading-tight text-[var(--color-cream)]">
          {exp.title}
        </h3>
        <p className="text-[0.95rem] leading-[1.75] text-[var(--color-cream)]/70">
          {exp.summary}
        </p>
      </div>
    </article>
  );
}

function HorizontalRail() {
  const stage = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!stage.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stageEl = stage.current;
        const trackEl = track.current;
        if (!stageEl || !trackEl) return;

        const getDistance = () =>
          Math.max(0, trackEl.scrollWidth - window.innerWidth);

        const tween = gsap.to(trackEl, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: stageEl,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={stage}
      className="exp-rail h-screen items-center overflow-hidden"
      aria-label="Experiences rail"
    >
      <div ref={track} className="flex items-stretch gap-10 xl:gap-14 pl-[6vw] pr-[6vw] will-change-transform">
        {/* Leading title panel travels with the cards */}
        <div className="w-[min(80vw,560px)] shrink-0 flex flex-col justify-center pr-6">
          <SectionHeading
            index="04"
            eyebrow="Things to do, gently"
            title={
              <>
                Wander.{" "}
                <em className="not-italic font-light italic text-[var(--color-amber)]">
                  Linger.
                </em>
              </>
            }
            lede="A handful of things to do nearby — tea trails, dawn hikes, lake walks, sleepy cafés. Pick what calls to you, or stay on the balcony."
            tone="dark"
          />
          <p className="mt-8 font-[var(--font-mono)] text-[0.72rem] tracking-[0.28em] uppercase text-[var(--color-amber)]/75 flex items-center gap-3">
            <span aria-hidden className="block h-px w-10 bg-[var(--color-amber)]/60" />
            Scroll →
          </p>
        </div>

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} horizontal />
        ))}

        {/* Trailing breathing room so the last card can land centred */}
        <div className="w-[6vw] shrink-0" aria-hidden />
      </div>
    </div>
  );
}

function GridFallback() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08, y: 36 });

  return (
    <Container className="flex flex-col gap-16">
      <div className="flex flex-wrap items-end justify-between gap-10">
        <SectionHeading
          index="04"
          eyebrow="Things to do, gently"
          title={
            <>
              Wander.{" "}
              <em className="not-italic font-light italic text-[var(--color-amber)]">
                Linger.
              </em>
            </>
          }
          tone="dark"
        />
        <p
          className="lede text-[clamp(1rem,1.2vw,1.2rem)] text-[var(--color-cream)]/65 max-w-[36ch]"
          data-reveal
        >
          We&rsquo;ll plan as little or as much as you like — driver, picnic basket,
          cooking class, dawn alarm. Or skip it all and stay on the balcony.
        </p>
      </div>

      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </Container>
  );
}

export function Experiences() {
  return (
    <section
      id={SECTION_IDS.experiences}
      className="relative bg-[var(--color-midnight)] text-[var(--color-cream)] grain overflow-hidden"
    >
      {/* Mobile + reduced-motion fallback (CSS-toggled via .exp-grid) */}
      <div className="exp-grid py-28">
        <GridFallback />
      </div>

      {/* Desktop pinned rail (CSS-toggled via .exp-rail) */}
      <HorizontalRail />
    </section>
  );
}
