"use client";

import type { RefObject } from "react";

import { useEffect, useState } from "react";

export function useInViewOnce<T extends Element>({
  ref,
  enabled = true,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: {
  ref: RefObject<T | null>;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (inView) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, inView, ref, rootMargin, threshold]);

  return enabled ? inView : true;
}
