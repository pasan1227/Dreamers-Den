import type { IconName } from "@/lib/types";

const PATHS: Record<IconName, string> = {
  wifi: "M3 9.5a14 14 0 0 1 18 0M6 13a9 9 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0M12 20h.01",
  tea: "M4 8h11v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm11 1h2a3 3 0 0 1 0 6h-2M6 5c0-1 .8-2 1-3M10 5c0-1 .8-2 1-3",
  fire: "M12 3c2 4-1 5 1 8 1.5 2 3 2 3 5a4 4 0 0 1-8 0c0-2 1-3 1-5 0-2-2-3-1-5 .8-1.5 2.5-2 4-3Z",
  leaf: "M5 19c0-9 7-15 15-15 0 9-6 15-15 15ZM5 19l8-8",
  bed: "M3 18V8m0 4h18v6M21 12a4 4 0 0 0-4-4H10v4M7 11a1.5 1.5 0 1 1 3 0",
  view: "M3 17l5-6 4 5 3-4 6 8M3 7h18M3 7v14h18V7",
  key: "M14 10a4 4 0 1 1-3.46 6L4 22l-2-2 2-2-1-1 2-2-1-1 4.54-4.54A4 4 0 0 1 14 10Zm2-1h.01",
  fork: "M8 3v8a3 3 0 0 0 3 3v7M12 3v8a3 3 0 0 1-3 3M16 3c-1 2-1 7 2 8v10",
  car: "M5 16l1.5-5a3 3 0 0 1 3-2.2h5a3 3 0 0 1 3 2.2L19 16M4 16h16v3H4zM7 19v2M17 19v2M7 13h2M15 13h2",
  shower: "M14 3a4 4 0 0 1 4 4v4M6 11h16M7 14v1M11 14v2M15 14v1M19 14v2M7 19v1M11 19v2M15 19v1M19 19v2",
  mountain: "M3 20l6-10 4 6 2-3 6 7H3Zm6-10 1-2M14 9l-1-1",
  water: "M5 14c2-2 5-2 7 0s5 2 7 0M5 18c2-2 5-2 7 0s5 2 7 0M5 10c2-2 5-2 7 0s5 2 7 0",
  lake: "M2 16c3-2 6-2 10 0s7 2 10 0M4 12h16M7 8h10M9 4h6",
  pan: "M3 12h14a3 3 0 0 1 0 6H7l-4-6Zm-1 0h2m17-4c1-1 1-3-1-3m-7 3V4m4 4V4",
};

interface IconProps {
  readonly name: IconName;
  readonly size?: number;
  readonly className?: string;
  readonly stroke?: number;
}

export function Icon({ name, size = 22, className = "", stroke = 1.4 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
