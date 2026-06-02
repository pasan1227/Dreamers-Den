interface AframeMarkProps {
  readonly size?: number;
  readonly tone?: "amber" | "cream" | "midnight";
  readonly glow?: boolean;
  readonly className?: string;
}

const TONE: Record<NonNullable<AframeMarkProps["tone"]>, string> = {
  amber: "text-[var(--color-amber)]",
  cream: "text-[var(--color-cream)]",
  midnight: "text-[var(--color-midnight)]",
};

export function AframeMark({
  size = 28,
  tone = "amber",
  glow = false,
  className = "",
}: AframeMarkProps) {
  const filter = glow
    ? "drop-shadow(0 0 6px rgba(232,161,75,0.55)) drop-shadow(0 0 14px rgba(232,161,75,0.25))"
    : undefined;
  const style = filter ? { filter } : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={`${TONE[tone]} ${className}`}
      style={style}
    >
      {/* A-frame outer */}
      <path d="M16 4 L28 28 L4 28 Z" />
      {/* glazed facade */}
      <path d="M16 11 L23 25 L9 25 Z" opacity="0.55" />
      {/* floor line */}
      <line x1="11" y1="20" x2="21" y2="20" opacity="0.7" />
    </svg>
  );
}
