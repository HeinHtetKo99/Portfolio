"use client";

import { cn } from "@/lib/cn";
import { getScrollOffsetPx, scrollToId } from "@/lib/scrollToId";

export function SkipToContent({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const id = "home";
        const target = document.getElementById(id);
        if (!target) return;

        const offsetPx = getScrollOffsetPx();
        scrollToId(id, { behavior: "auto", offsetPx, updateHash: false });
      }}
      className={cn(
        "fixed left-4 top-4 z-[60] -translate-y-20 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm",
        "transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      Skip to content
    </button>
  );
}

