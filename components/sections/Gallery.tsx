"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { gallery } from "@/data/gallery";
import { SECTION_IDS } from "@/lib/constants";
import type { GalleryImage } from "@/lib/types";

type Column = "left" | "middle" | "right";
type CaptionSide = "left" | "right";

interface Layout {
  readonly column: Column;
  readonly aspect: string;            // tailwind aspect class
  readonly rotateDeg: number;         // applied via inline style
  readonly offsetPx: number;          // top offset (desktop)
  readonly captionSide: CaptionSide;
  readonly tape?: "top-left" | "top-right";
  readonly tag: string;               // small mono index (e.g. "01 — Twilight")
}

// Curated layout — each image gets its own slot, rotation, offset, and caption side.
// Order in this array matches the gallery data order.
const LAYOUTS: ReadonlyArray<Layout> = [
  { column: "left",   aspect: "aspect-[3/4]",   rotateDeg: -1.6, offsetPx: 0,   captionSide: "right", tape: "top-right", tag: "I.  twilight" },
  { column: "middle", aspect: "aspect-[16/11]", rotateDeg:  1.2, offsetPx: 88,  captionSide: "left",                          tag: "II. living" },
  { column: "right",  aspect: "aspect-square",  rotateDeg: -2.0, offsetPx: 24,  captionSide: "left",  tape: "top-left",  tag: "III.ceiling" },
  { column: "left",   aspect: "aspect-[16/10]", rotateDeg:  0.8, offsetPx: 60,  captionSide: "right",                          tag: "IV. inside" },
  { column: "middle", aspect: "aspect-[3/4]",   rotateDeg:  1.5, offsetPx: 48,  captionSide: "right", tape: "top-right", tag: "V.  apex"   },
  { column: "right",  aspect: "aspect-square",  rotateDeg: -0.7, offsetPx: 56,  captionSide: "right",                          tag: "VI. bedroom" },
  { column: "left",   aspect: "aspect-square",  rotateDeg:  1.3, offsetPx: 56,  captionSide: "left",                          tag: "VII.bath"   },
  { column: "right",  aspect: "aspect-[3/4]",   rotateDeg: -1.1, offsetPx: 48,  captionSide: "right", tape: "top-left",  tag: "VIII.stair" },
];

const SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

interface CardProps {
  readonly image: GalleryImage;
  readonly index: number;
  readonly layout: Layout;
  readonly mobileIndex: number;
  readonly onOpen: (i: number) => void;
}

function ScrapbookCard({ image, index, layout, mobileIndex, onOpen }: CardProps) {
  // Mobile: small alternating tilt, no offset, single column.
  // Desktop: full editorial layout.
  const mobileTilt = mobileIndex % 2 === 0 ? -0.8 : 0.8;
  const captionAlign =
    layout.captionSide === "left" ? "items-start text-left" : "items-end text-right ml-auto";
  const tapeClass =
    layout.tape === "top-left"
      ? "left-3 -top-2 -rotate-[8deg]"
      : layout.tape === "top-right"
        ? "right-3 -top-2 rotate-[6deg]"
        : "";

  return (
    <figure
      data-reveal
      className="scrapbook-figure relative flex flex-col gap-3 will-change-transform"
      style={
        {
          ["--card-rotate" as string]: `${layout.rotateDeg}deg`,
          ["--mobile-rotate" as string]: `${mobileTilt}deg`,
          ["--card-offset" as string]: `${layout.offsetPx}px`,
        } as CSSProperties
      }
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open image: ${image.alt}`}
        className={`group scrapbook-card relative block w-full overflow-hidden bg-[var(--color-midnight-deep)] cursor-zoom-in ${layout.aspect}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={SIZES}
          className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.05]"
        />
        {/* warm vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 100%, rgba(0,0,0,0.35), transparent 60%)",
          }}
        />
        {/* hover wipe — slides up from below instead of fading */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[var(--color-midnight-deep)]/90 via-[var(--color-midnight-deep)]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
        <span className="absolute left-4 bottom-4 right-4 flex items-center justify-between text-[var(--color-cream)] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-[600ms] delay-[120ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
          <span className="eyebrow text-[var(--color-amber)]">↗ open</span>
          <span className="font-[var(--font-mono)] text-[0.68rem] tracking-[0.22em] uppercase">
            {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </span>
        </span>

        {layout.tape ? (
          <span
            aria-hidden
            className={`absolute ${tapeClass} h-5 w-16 bg-[var(--color-amber)]/35 mix-blend-screen shadow-[0_2px_6px_rgba(0,0,0,0.35)]`}
          />
        ) : null}
      </button>

      <figcaption className={`flex flex-col gap-1 px-1 ${captionAlign}`}>
        <span className="font-[var(--font-mono)] text-[0.65rem] tracking-[0.28em] uppercase text-[var(--color-amber)]/70">
          {layout.tag}
        </span>
        <span className="font-[var(--font-display)] italic text-[1rem] leading-tight text-[var(--color-cream)]/85 max-w-[24ch]">
          {image.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.06, y: 32 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const indexed = gallery.map((img, i) => ({ img, i, layout: LAYOUTS[i] }));
  const cols = {
    left: indexed.filter(({ layout }) => layout?.column === "left"),
    middle: indexed.filter(({ layout }) => layout?.column === "middle"),
    right: indexed.filter(({ layout }) => layout?.column === "right"),
  };

  // For mobile single-column ordering we just use the original sequence.
  // mobileIndex helps alternate tilt left/right.
  const mobileIndexById = new Map(indexed.map(({ img }, idx) => [img.id, idx]));

  const renderColumn = (
    list: typeof indexed,
    columnOffset: number,
  ) => (
    <div className="flex flex-col gap-12 lg:gap-16" style={{ marginTop: columnOffset }}>
      {list.map(({ img, i, layout }) =>
        layout ? (
          <ScrapbookCard
            key={img.id}
            image={img}
            index={i}
            layout={layout}
            mobileIndex={mobileIndexById.get(img.id) ?? i}
            onOpen={setOpenIndex}
          />
        ) : null,
      )}
    </div>
  );

  return (
    <section
      ref={ref}
      id={SECTION_IDS.gallery}
      className="relative py-28 lg:py-40 bg-[var(--color-midnight-deep)] text-[var(--color-cream)] overflow-hidden"
    >
      <Container className="flex flex-col gap-20">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <SectionHeading
            index="03"
            eyebrow="Through the glass"
            title={
              <>
                Look{" "}
                <em className="not-italic font-light italic text-[var(--color-amber)]">
                  closely.
                </em>
              </>
            }
            tone="dark"
          />
          <p
            className="lede text-[clamp(1rem,1.2vw,1.2rem)] text-[var(--color-cream)]/65 max-w-[36ch]"
            data-reveal
          >
            Pinned to the wall, mostly out of order. Twilight outside,
            honey-warm inside — the cabin reads differently at every hour.
          </p>
        </div>

        {/* Mobile / tablet: single column, gentle alternating tilt */}
        <div className="flex flex-col gap-10 lg:hidden">
          {indexed.map(({ img, i, layout }) =>
            layout ? (
              <ScrapbookCard
                key={`m-${img.id}`}
                image={img}
                index={i}
                layout={layout}
                mobileIndex={mobileIndexById.get(img.id) ?? i}
                onOpen={setOpenIndex}
              />
            ) : null,
          )}
        </div>

        {/* Desktop: three columns, staggered offsets */}
        <div className="hidden lg:grid grid-cols-3 gap-x-12 xl:gap-x-16 items-start scrapbook-desktop">
          {renderColumn(cols.left, 0)}
          {renderColumn(cols.middle, 96)}
          {renderColumn(cols.right, 32)}
        </div>
      </Container>

      <Lightbox
        images={gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
