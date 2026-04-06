import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface/40 px-3 py-1 text-sm text-foreground/90 transition-colors",
        "hover:bg-surface/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
