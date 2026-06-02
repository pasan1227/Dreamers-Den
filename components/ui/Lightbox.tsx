"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { GalleryImage } from "@/lib/types";

interface LightboxProps {
  readonly images: ReadonlyArray<GalleryImage>;
  readonly index: number | null;
  readonly onClose: () => void;
  readonly onIndexChange: (next: number) => void;
}

function wrap(i: number, len: number): number {
  return (i + len) % len;
}

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const len = images.length;
  const isOpen = index !== null;

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange(wrap(index + 1, len));
  }, [index, len, onIndexChange]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange(wrap(index - 1, len));
  }, [index, len, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen) return null;
  const current = images[index];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${len}: ${current.alt}`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-midnight-deep)]/96 p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-6 right-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close gallery"
      >
        <span aria-hidden>×</span>
      </button>
      <button
        type="button"
        className="absolute left-4 sm:left-10 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
      >
        <span aria-hidden>‹</span>
      </button>
      <button
        type="button"
        className="absolute right-4 sm:right-10 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
      >
        <span aria-hidden>›</span>
      </button>
      <figure
        className="relative h-full max-h-[82vh] w-full max-w-[1100px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 1100px) 100vw, 1100px"
          className="object-contain"
          priority
        />
        <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 pt-4 text-[var(--color-cream)]/80">
          <span className="eyebrow">{current.caption}</span>
          <span className="font-[var(--font-mono)] text-[0.7rem] tabular-nums tracking-[0.2em]">
            {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
