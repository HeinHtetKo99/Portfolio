"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type Theme = "dark" | "light";

function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
}

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        const current = getTheme();
        const next: Theme = current === "dark" ? "light" : "dark";
        applyTheme(next);
      }}
      className={cn(
        "group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/50 text-foreground/90 backdrop-blur-sm",
        "transition-[transform,background-color,border-color,box-shadow,color] duration-200 motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:bg-surface/70 hover:text-foreground hover:shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_10%,transparent)] motion-reduce:hover:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className="theme-icon-sun">
        <Icon name="sun" className="h-5 w-5" />
      </span>
      <span className="theme-icon-moon">
        <Icon name="moon" className="h-5 w-5" />
      </span>
    </button>
  );
}
