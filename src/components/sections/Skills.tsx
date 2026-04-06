"use client";

import dynamic from "next/dynamic";

import { useMemo, useRef } from "react";

import { portfolio } from "@/content/portfolio";
import type { SkillName } from "@/components/skills/skillIcons";
import type { SkillsGlobeProps } from "@/components/skills/SkillsGlobe";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SkillsGlobe = dynamic<SkillsGlobeProps>(
  () => import("@/components/skills/SkillsGlobe").then((m) => m.SkillsGlobe),
  {
    ssr: false,
    loading: () => <div className="aspect-square w-full max-w-140" />,
  },
);

export function Skills() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const globeMountRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInViewOnce({ ref: rootRef, enabled: !reduced, threshold: 0.15 });
  const visible = reduced || inView;

  const globeActive = useInView({
    ref: globeMountRef,
    enabled: !reduced,
    threshold: 0,
    rootMargin: "220px 0px",
  });

  const skills = useMemo(() => portfolio.skills as unknown as SkillName[], []);

  return (
    <Section id="skills">
      <Container>
        <div ref={rootRef} className="flex flex-col gap-10">
          <div
            className={cn(
              "space-y-3 transition-all duration-700",
              "motion-reduce:transition-none motion-reduce:transform-none",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            )}
          >
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              TECH STACK
            </p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              My{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              A focused set of technologies I use to build fast, reliable, and
              scalable web products.
            </p>
          </div>

          <div
            className={cn(
              "transition-all duration-700",
              "motion-reduce:transition-none motion-reduce:transform-none",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
            style={{
              transitionDelay: visible ? "140ms" : "0ms",
            }}
          >
            <div ref={globeMountRef}>
              <SkillsGlobe skills={skills} active={reduced ? false : globeActive} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
