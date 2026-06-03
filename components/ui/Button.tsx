"use client";

import {
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import gsap from "gsap";

type Variant = "primary" | "ghost" | "outline" | "ink";
type Size = "md" | "lg";

interface BaseProps {
  readonly children: ReactNode;
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
  /** Magnetic pointer pull (fine-pointer only). Defaults to true on primary/ink. */
  readonly magnetic?: boolean;
  /** Shimmer sheen wipe on hover. Defaults to true on primary/ink. */
  readonly shimmer?: boolean;
}

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[var(--color-amber)] text-[var(--color-midnight)] hover:bg-[var(--color-amber-bright)] shadow-[0_10px_30px_-12px_rgba(232,161,75,0.55)] hover:shadow-[0_18px_42px_-12px_rgba(232,161,75,0.7)]",
  ghost:
    "bg-transparent text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/35 backdrop-blur-sm",
  outline:
    "bg-transparent text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-midnight)] border border-[var(--color-amber)]/70",
  ink: "bg-[var(--color-cream)] text-[var(--color-midnight)] hover:bg-[var(--color-cream-soft)] shadow-[0_10px_30px_-12px_rgba(244,238,222,0.45)]",
};

const SIZE: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.78rem]",
  lg: "px-7 py-3.5 text-[0.82rem]",
};

const BASE =
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-[0.18em] uppercase rounded-full overflow-hidden isolate transition-[background-color,color,box-shadow] duration-300 ease-out will-change-transform focus-visible:outline-2 focus-visible:outline-offset-[3px]";

function buildClass(variant: Variant, size: Size, extra: string): string {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${extra}`;
}

function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (
      typeof globalThis.window === "undefined" ||
      !globalThis.matchMedia("(pointer: fine)").matches ||
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const STRENGTH = 0.32;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * STRENGTH);
      yTo(dy * STRENGTH);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return ref;
}

interface InnerProps {
  readonly variant: Variant;
  readonly shimmer: boolean;
  readonly children: ReactNode;
}

function Inner({ variant, shimmer, children }: InnerProps) {
  const isLight = variant === "primary" || variant === "ink";
  const sheen = isLight
    ? "from-transparent via-white/55 to-transparent"
    : "from-transparent via-[var(--color-amber)]/30 to-transparent";

  return (
    <>
      {shimmer ? (
        <span
          aria-hidden
          className={`absolute inset-y-0 left-[-60%] w-[40%] -skew-x-12 bg-linear-to-r ${sheen} opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-[btnSheen_1.1s_ease-out]`}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
}

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    readonly as: "a";
  };

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    readonly as?: "button";
  };

export function Button(props: AnchorProps | ButtonProps) {
  const variant: Variant = props.variant ?? "primary";
  const size: Size = props.size ?? "md";
  const enableMagnetic =
    props.magnetic ?? (variant === "primary" || variant === "ink");
  const enableShimmer =
    props.shimmer ?? (variant === "primary" || variant === "ink");
  const ref = useMagnetic(enableMagnetic);
  const className = buildClass(variant, size, `group ${props.className ?? ""}`);

  if (props.as === "a") {
    const {
      children,
      as: _as,
      variant: _v,
      size: _s,
      className: _c,
      magnetic: _m,
      shimmer: _sh,
      ...rest
    } = props;
    void _as; void _v; void _s; void _c; void _m; void _sh;
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        {...rest}
      >
        <Inner variant={variant} shimmer={enableShimmer}>
          {children}
        </Inner>
      </a>
    );
  }

  const {
    children,
    as: _as,
    variant: _v,
    size: _s,
    className: _c,
    magnetic: _m,
    shimmer: _sh,
    ...rest
  } = props;
  void _as; void _v; void _s; void _c; void _m; void _sh;
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      {...rest}
    >
      <Inner variant={variant} shimmer={enableShimmer}>
        {children}
      </Inner>
    </button>
  );
}
