"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AframeMark } from "@/components/ui/AframeMark";
import { site } from "@/data/site";
import { SECTION_IDS } from "@/lib/constants";

interface Ember {
  readonly left: string;
  readonly delay: string;
  readonly duration: string;
  readonly drift: string;
  readonly size: string;
}

function shouldReduce(): boolean {
  if (typeof globalThis.window === "undefined") return false;
  return globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Deterministic-ish ember placement so SSR/CSR match.
function makeEmbers(n: number): ReadonlyArray<Ember> {
  const out: Ember[] = [];
  for (let i = 0; i < n; i++) {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const r2 = ((i + 1) * 7853) % 100 / 100;
    const r3 = ((i + 2) * 6379) % 100 / 100;
    out.push({
      left: `${(r * 96 + 2).toFixed(2)}%`,
      delay: `${(r2 * 14).toFixed(2)}s`,
      duration: `${(14 + r3 * 12).toFixed(2)}s`,
      drift: `${(r2 * 14 - 7).toFixed(2)}vw`,
      size: `${(1.6 + r * 1.6).toFixed(2)}px`,
    });
  }
  return out;
}

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const bg = useRef<HTMLDivElement | null>(null);
  const glow = useRef<HTMLDivElement | null>(null);
  const embers = useMemo(() => makeEmbers(22), []);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = shouldReduce();
    const isFinePointer =
      typeof globalThis.window !== "undefined" &&
      globalThis.matchMedia("(pointer: fine)").matches;

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
      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power3.out" },
      });
      tl.fromTo(
        "[data-hero-eyebrow]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      )
        .fromTo(
          "[data-hero-title] .word",
          { y: 120, opacity: 0, rotateX: 18 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.35,
            stagger: 0.09,
            ease: "expo.out",
          },
          "-=0.6",
        )
        .fromTo(
          "[data-hero-lede]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.85",
        )
        .fromTo(
          "[data-hero-status]",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.7",
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-mark]",
          { opacity: 0 },
          { opacity: 1, duration: 1.4 },
          "-=0.8",
        )
        .fromTo(
          "[data-hero-foot] > *",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          "-=1",
        );

      if (bg.current) {
        // Initial zoom-out on enter
        gsap.fromTo(
          bg.current,
          { scale: 1.18 },
          { scale: 1.04, duration: 2.8, ease: "power2.out" },
        );

        // Scroll-driven parallax: drift the background down/up while
        // the hero is in view.
        gsap.to(bg.current, {
          yPercent: 18,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        // Foreground content drifts up subtly for depth
        gsap.to("[data-hero-fg]", {
          yPercent: -10,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
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
          src="/images/cabana/IMG_0152.jpeg"
          alt="The Dreamers Den A-frame cabin at dusk with fairy lights tracing its silhouette"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[var(--color-midnight-deep)]/65 via-[var(--color-midnight)]/30 to-[var(--color-midnight-deep)]/95" />
        {/* amber edge glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 60%, rgba(232,161,75,0.12), transparent 70%)",
          }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(6,8,15,0.55) 100%)",
          }}
        />
      </div>

      {/* Ambient embers drifting upward — fine-grained motion that reads as "alive". */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none motion-reduce:hidden"
      >
        {embers.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: e.left,
              bottom: "-10px",
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              animationDuration: e.duration,
              ["--dx" as string]: e.drift,
            }}
          />
        ))}
      </div>

      {/* cursor-follow amber halo (fine pointer only; opacity controlled by JS) */}
      <div
        ref={glow}
        aria-hidden
        className="hero-glow pointer-events-none absolute left-0 top-0 z-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(246,184,99,0.36), rgba(232,161,75,0.16) 38%, transparent 70%)",
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
        <div data-hero-fg className="max-w-[1100px] will-change-transform">
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
            style={{ perspective: "1000px" }}
          >
            {words.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.18em] last:mr-0"
              >
                <span className="word inline-block will-change-transform">
                  {i === 0 ? (
                    w
                  ) : (
                    <em className="font-light italic text-[var(--color-amber)]">
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

          <div
            data-hero
            data-hero-status
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[var(--color-cream)]/15 bg-[var(--color-midnight)]/55 px-4 py-2 backdrop-blur-sm"
          >
            <span
              aria-hidden
              className="status-dot inline-block h-2 w-2 rounded-full bg-[#A7D382]"
            />
            <span className="eyebrow text-[var(--color-cream)]/85">
              Open this season
            </span>
            <span aria-hidden className="text-[var(--color-cream)]/30">
              ·
            </span>
            <span className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.18em] uppercase text-[var(--color-amber)]/85">
              Seasonal rates · message us
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
          data-hero-foot
          className="mt-20 flex items-end justify-between text-[var(--color-cream)]/65"
        >
          <a
            href={`#${SECTION_IDS.about}`}
            className="group flex items-center gap-3 text-[var(--color-cream)]/65 hover:text-[var(--color-amber)] transition-colors"
            aria-label="Scroll to next section"
          >
            <span className="relative block h-10 w-5 rounded-full border border-[var(--color-amber)]/40 overflow-hidden">
              <span
                aria-hidden
                className="scroll-cue absolute left-1/2 top-2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[var(--color-amber)]"
              />
            </span>
            <span className="eyebrow">Scroll to wander</span>
          </a>
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
