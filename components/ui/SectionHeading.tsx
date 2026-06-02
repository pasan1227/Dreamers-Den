import type { ReactNode } from "react";
import { AframeMark } from "./AframeMark";

interface SectionHeadingProps {
  readonly index: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly lede?: ReactNode;
  readonly align?: "left" | "center";
  readonly tone?: "dark" | "light";
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const isDark = tone === "dark";
  const titleColor = isDark
    ? "text-[var(--color-cream)]"
    : "text-[var(--color-midnight)]";
  const metaColor = isDark
    ? "text-[var(--color-cream)]/70"
    : "text-[var(--color-midnight)]/65";
  const ledeColor = isDark
    ? "text-[var(--color-cream)]/70"
    : "text-[var(--color-midnight)]/65";

  return (
    <header className={`flex flex-col gap-6 ${alignClass}`}>
      <div className={`flex items-center gap-4 ${metaColor}`} data-reveal>
        <AframeMark
          size={18}
          tone={isDark ? "amber" : "midnight"}
          glow={isDark}
        />
        <span className="font-[var(--font-mono)] text-[0.72rem] tabular-nums tracking-[0.22em]">
          {index}
        </span>
        <span className="rule" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2
        className={`headline ${titleColor} text-[clamp(2rem,4.6vw,4.5rem)] max-w-[22ch]`}
        data-reveal
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`lede text-[clamp(1.05rem,1.4vw,1.4rem)] max-w-[46ch] ${ledeColor}`}
          data-reveal
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
