"use client";

import type { ReactNode } from "react";

import { useMemo, useRef } from "react";

import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const enabled = useMemo(() => !reduced && id !== "home", [id, reduced]);
  const inView = useInViewOnce({ ref, enabled });
  const visible = reduced || id === "home" || inView;

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "py-16 sm:py-24 scroll-mt-[96px] sm:scroll-mt-[112px]",
        enabled && "transition-[transform,opacity,filter] duration-700 ease-out",
        enabled && !visible && "will-change-[transform,opacity,filter]",
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:filter-none",
        visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm",
        className,
      )}
    >
      {children}
    </section>
  );
}
