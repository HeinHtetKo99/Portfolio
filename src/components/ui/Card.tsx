import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  style,
  interactive = true,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-surface/70 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm",
        "transition-[transform,background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none",
        interactive
          ? "hover:-translate-y-1 hover:bg-surface/85 hover:shadow-[var(--shadow-card-hover)] motion-reduce:hover:translate-y-0"
          : "hover:bg-surface/70",
        className,
      )}
      style={style}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity motion-reduce:transition-none",
          interactive
            ? "group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_50%_0%,color-mix(in_oklab,var(--accent)_38%,transparent),transparent_55%)]"
            : "bg-transparent",
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
