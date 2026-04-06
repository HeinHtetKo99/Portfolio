"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { getScrollOffsetPx, scrollToId } from "@/lib/scrollToId";
import { sectionFromPath } from "@/lib/sectionRoutes";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function pickBehavior({
  reduced,
  nextTop,
}: {
  reduced: boolean;
  nextTop: number;
}): ScrollBehavior {
  if (reduced) return "auto";
  const distance = Math.abs(window.scrollY - nextTop);
  return distance > window.innerHeight * 1.25 ? "auto" : "smooth";
}

export function PathScrollHandler() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const id = sectionFromPath(pathname);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    const offsetPx = getScrollOffsetPx();
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offsetPx);
    const behavior = pickBehavior({ reduced, nextTop: top });
    scrollToId(id, { behavior, offsetPx, updateHash: false });
  }, [pathname, reduced]);

  return null;
}
