import type { ReactNode } from "react";

interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "section" | "header" | "footer" | "main" | "article";
  readonly id?: string;
  readonly bleed?: boolean;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
  bleed = false,
}: ContainerProps) {
  const max = bleed ? "max-w-[1680px]" : "max-w-[1280px]";
  return (
    <Tag id={id} className={`mx-auto w-full ${max} px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
}
