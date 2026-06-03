type LogoTone = "cream" | "amber" | "midnight";

interface LogoProps {
  readonly size?: number;
  readonly tone?: LogoTone;
  readonly className?: string;
  readonly ariaLabel?: string;
}

const TONE_VAR: Record<LogoTone, string> = {
  cream: "var(--color-cream)",
  amber: "var(--color-amber)",
  midnight: "var(--color-midnight)",
};

export function Logo({
  size = 120,
  tone = "cream",
  className = "",
  ariaLabel = "Dreamer's Den",
}: LogoProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: TONE_VAR[tone],
        WebkitMaskImage: "url(/images/logo.svg)",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
        maskImage: "url(/images/logo.svg)",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
      }}
    />
  );
}
