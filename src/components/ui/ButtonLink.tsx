import type { MouseEvent, ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/cn";

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  download,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  download?: string | boolean;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/92 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_12%,transparent)] motion-reduce:hover:translate-y-0"
      : variant === "secondary"
        ? "border border-border bg-surface/40 text-foreground hover:bg-surface/70 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_color-mix(in_oklab,var(--foreground)_10%,transparent)] motion-reduce:hover:translate-y-0"
        : "text-foreground/90 hover:text-foreground hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

  const isExternal = /^https?:\/\//.test(href);
  const isMail = /^mailto:/.test(href);
  const isInternal = href.startsWith("/") && !isExternal;
  const rel = isExternal ? "noopener noreferrer" : undefined;
  const target = isExternal ? "_blank" : undefined;

  if (isInternal && !download) {
    return (
      <Link
        href={href}
        prefetch
        scroll={false}
        className={cn(base, styles, className)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cn(base, styles, className)}
      rel={isMail ? undefined : rel}
      target={isMail ? undefined : target}
      onClick={onClick}
      download={download}
    >
      {children}
    </a>
  );
}
