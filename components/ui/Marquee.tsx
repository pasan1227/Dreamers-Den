import type { ReactNode } from "react";

interface MarqueeProps {
  readonly items: ReadonlyArray<ReactNode>;
  readonly speed?: "slow" | "med" | "fast";
  readonly tone?: "dark" | "cream";
  readonly ariaLabel?: string;
}

const SPEED_CLASS: Record<NonNullable<MarqueeProps["speed"]>, string> = {
  slow: "marquee-slow",
  med: "marquee-med",
  fast: "marquee-fast",
};

export function Marquee({
  items,
  speed = "med",
  tone = "dark",
  ariaLabel = "Notes from the cabana",
}: MarqueeProps) {
  const bg =
    tone === "dark"
      ? "bg-[var(--color-midnight-deep)] text-[var(--color-cream)]/80"
      : "bg-[var(--color-cream)] text-[var(--color-midnight)]/80";
  const border =
    tone === "dark"
      ? "border-y border-[var(--color-amber)]/15"
      : "border-y border-[var(--color-midnight)]/10";

  const track = (
    <ul
      className={`flex items-center gap-12 px-6 marquee-track ${SPEED_CLASS[speed]}`}
      aria-hidden="true"
    >
      {items.map((it, i) => (
        <li
          key={i}
          className="flex items-center gap-12 shrink-0 font-[var(--font-mono)] text-[0.72rem] tracking-[0.28em] uppercase whitespace-nowrap"
        >
          <span>{it}</span>
          <span aria-hidden className="text-[var(--color-amber)]/70">
            ✶
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`relative overflow-hidden py-4 ${bg} ${border} marquee-mask`}
    >
      <div className="flex w-max marquee-pause">
        {track}
        {track}
      </div>
    </div>
  );
}
