import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "ink";
type Size = "md" | "lg";

interface BaseProps {
  readonly children: ReactNode;
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
}

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[var(--color-amber)] text-[var(--color-midnight)] hover:bg-[var(--color-amber-bright)] hover:shadow-[0_0_24px_rgba(232,161,75,0.35)]",
  ghost:
    "bg-transparent text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/35",
  outline:
    "bg-transparent text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-midnight)] border border-[var(--color-amber)]/70",
  ink: "bg-[var(--color-cream)] text-[var(--color-midnight)] hover:bg-[var(--color-cream-soft)]",
};

const SIZE: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.78rem]",
  lg: "px-7 py-3.5 text-[0.82rem]",
};

const BASE =
  "inline-flex items-center gap-2 font-medium tracking-[0.18em] uppercase rounded-full transition-all duration-300 ease-out will-change-transform hover:-translate-y-[1px] focus-visible:outline-2 focus-visible:outline-offset-[3px]";

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    readonly as: "a";
  };

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    readonly as?: "button";
  };

function buildClass(variant: Variant, size: Size, extra: string): string {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${extra}`;
}

export function Button(props: AnchorProps | ButtonProps) {
  if (props.as === "a") {
    const { children, variant = "primary", size = "md", className = "", as: _as, ...rest } = props;
    void _as;
    return (
      <a className={buildClass(variant, size, className)} {...rest}>
        {children}
      </a>
    );
  }
  const { children, variant = "primary", size = "md", className = "", as: _as, ...rest } = props;
  void _as;
  return (
    <button className={buildClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
