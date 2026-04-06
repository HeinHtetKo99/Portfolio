"use client";

import type { RefObject } from "react";

import { useEffect, useState } from "react";

export function useInView<T extends Element>({
  ref,
  enabled = true,
  threshold = 0,
  rootMargin = "0px",
}: {
  ref: RefObject<T | null>;
  enabled?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, ref, rootMargin, threshold]);

  return enabled ? inView : true;
}
