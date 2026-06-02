"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AframeMark } from "@/components/ui/AframeMark";
import { site } from "@/data/site";
import { SECTION_IDS } from "@/lib/constants";

function shouldReduce(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const bg = useRef<HTMLDivElement | null>(null);
  const glow = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = shouldReduce();
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    const cleanups: Array<() => void> = [];

    // Cursor-follow amber glow, hero-scoped, fine-pointer-only.
    if (!reduce && isFinePointer && glow.current) {
      const section = root.current;
      const el = glow.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };
      const onEnter = () => gsap.to(el, { opacity: 1, duration: 0.5 });
      const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.4 });
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerenter", onEnter);
      section.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerenter", onEnter);
        section.removeEventListener("pointerleave", onLeave);
      });
    }

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-eyebrow]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      )
        .fromTo(
          "[data-hero-title] .word",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 },
          "-=0.6",
        )
        .fromTo(
          "[data-hero-lede]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.7",
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          "-=0.7",
        )
        .fromTo(
          "[data-hero-mark]",
          { opacity: 0 },
          { opacity: 1, duration: 1.4 },
          "-=0.8",
        );

      if (bg.current) {
        gsap.fromTo(
          bg.current,
          { scale: 1.12 },
          { scale: 1, duration: 2.6, ease: "power2.out" },
        );
      }
    }, root);

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  const words = ["Dreamers", "Den."];

  return (
    <section
      ref={root}
      id={SECTION_IDS.hero}
      className="relative isolate grain overflow-hidden bg-[var(--color-midnight-deep)] text-[var(--color-cream)] min-h-[100svh] flex flex-col"
    >
      <div ref={bg} className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/images/cabana/dreamers-den-nuwara-eliya-pic-1.jpeg"
          alt="The Dreamers Den A-frame cabin at dusk with fairy lights tracing its silhouette"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-midnight-deep)]/60 via-[var(--color-midnight)]/30 to-[var(--color-midnight-deep)]/90" />
        {/* amber edge glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 60%, rgba(232,161,75,0.10), transparent 70%)",
          }}
        />
      </div>

      {/* cursor-follow amber halo (fine pointer only; opacity controlled by JS) */}
      <div
        ref={glow}
        aria-hidden
        className="hero-glow pointer-events-none absolute left-0 top-0 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(246,184,99,0.32), rgba(232,161,75,0.14) 38%, transparent 70%)",
        }}
      />

      <div
        data-hero-mark
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 vertical-mark text-[var(--color-amber)]/80"
        aria-hidden
      >
        Est · 2020 · Nuwara&nbsp;Eliya
      </div>
      <div
        data-hero-mark
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 vertical-mark text-[var(--color-amber)]/80"
        aria-hidden
      >
        06° 56′ N · 80° 47′ E
      </div>

      <Container className="relative flex-1 flex flex-col justify-end pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[1100px]">
          <p
            data-hero
            data-hero-eyebrow
            className="eyebrow text-[var(--color-amber)]/90 mb-8 flex items-center gap-4"
          >
            <AframeMark size={16} tone="amber" glow />
            <span className="rule" aria-hidden />
            An A-frame cabin in the mist
          </p>

          <h1
            data-hero
            data-hero-title
            className="display text-[var(--color-cream)] text-[clamp(3.5rem,12vw,12rem)]"
          >
            {words.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.18em] last:mr-0"
              >
                <span className="word inline-block">
                  {i === 0 ? (
                    w
                  ) : (
                    <em className="not-italic font-light italic text-[var(--color-amber)]">
                      {w}
                    </em>
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero
            data-hero-lede
            className="lede mt-10 max-w-[44ch] text-[clamp(1.2rem,1.65vw,1.6rem)] text-[var(--color-cream)]/85"
          >
            A three-bedroom timber A-frame above the lake. Honey-glow ceilings,
            fairy-lit silhouette, hill-country mist by morning. Rented as a
            whole.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button
              data-hero
              data-hero-cta
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
              data-hero
              data-hero-cta
              as="a"
              href={`#${SECTION_IDS.about}`}
              variant="ghost"
              size="lg"
            >
              Our Story
            </Button>
          </div>
        </div>

        <div
          data-hero
          data-hero-cta
          className="mt-20 flex items-end justify-between text-[var(--color-cream)]/65"
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-[var(--color-amber)]/60" />
            <span className="eyebrow">Scroll to wander</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 font-[var(--font-mono)] text-[0.7rem] tracking-[0.25em] uppercase">
            <span>16°C · Mist</span>
            <span aria-hidden>·</span>
            <span>1,868 m</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
