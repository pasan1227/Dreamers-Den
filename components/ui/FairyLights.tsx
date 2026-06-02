interface FairyLightsProps {
  readonly className?: string;
  readonly width?: number;
  readonly height?: number;
  readonly tone?: "amber" | "cream";
  readonly density?: number; // dots per side (default 12)
}

// Triangle geometry (SVG units). Apex at top centre.
const APEX_X = 100;
const APEX_Y = 12;
const LEFT_X = 18;
const RIGHT_X = 182;
const BASE_Y = 130;

function dotsAlong(side: "left" | "right", density: number) {
  const baseX = side === "left" ? LEFT_X : RIGHT_X;
  // skip endpoints (start at 0.04, end at 0.96)
  const out: Array<{ cx: number; cy: number; t: number }> = [];
  for (let i = 0; i < density; i++) {
    const t = 0.04 + (i * 0.92) / Math.max(density - 1, 1);
    const cx = APEX_X + t * (baseX - APEX_X);
    const cy = APEX_Y + t * (BASE_Y - APEX_Y);
    out.push({ cx, cy, t });
  }
  return out;
}

export function FairyLights({
  className = "",
  width = 220,
  height = 150,
  tone = "amber",
  density = 12,
}: FairyLightsProps) {
  const stroke = tone === "amber" ? "rgba(232,161,75,0.45)" : "rgba(244,238,222,0.55)";
  const fill = tone === "amber" ? "var(--color-amber-bright)" : "var(--color-cream)";

  const leftDots = dotsAlong("left", density);
  const rightDots = dotsAlong("right", density);
  const allDots = [...leftDots, ...rightDots];

  return (
    <svg
      className={`fairy-lights ${className}`}
      width={width}
      height={height}
      viewBox="0 0 200 140"
      role="img"
      aria-label="A string of fairy lights tracing the A-frame silhouette"
      fill="none"
    >
      <defs>
        <filter id="fl-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Strings — subtle catenary-ish path. Two straight lines is fine for the silhouette read. */}
      <path
        d={`M ${APEX_X} ${APEX_Y} L ${LEFT_X} ${BASE_Y}`}
        stroke={stroke}
        strokeWidth="0.6"
        strokeLinecap="round"
        className="fairy-strand fairy-strand-left"
      />
      <path
        d={`M ${APEX_X} ${APEX_Y} L ${RIGHT_X} ${BASE_Y}`}
        stroke={stroke}
        strokeWidth="0.6"
        strokeLinecap="round"
        className="fairy-strand fairy-strand-right"
      />

      <g filter="url(#fl-glow)">
        {allDots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r="1.6"
            fill={fill}
            className="fairy-bulb"
            style={{ animationDelay: `${(i % 7) * 0.35 + (i * 0.07)}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
