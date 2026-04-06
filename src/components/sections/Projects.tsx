"use client";

import Image from "next/image";

import { useRef } from "react";

import { portfolio } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

export function Projects() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInViewOnce({ ref: gridRef, enabled: !reduced, threshold: 0.12 });

  return (
    <Section id="projects">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="space-y-3">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Portfolio
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <p className="max-w-2xl text-pretty text-muted-foreground">
              A curated selection of projects that highlight how I design user
              flows, structure code, and deliver real product features.
            </p>
          </div>

          <div ref={gridRef} className="grid gap-5 md:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <Card
                key={project.title}
                className={cn(
                  "flex flex-col gap-0 overflow-hidden p-0",
                  "transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none",
                  reduced || inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
                style={{
                  transitionDelay: reduced || inView ? `${80 + index * 90}ms` : "0ms",
                }}
              >
                <div className="group relative aspect-[16/10] overflow-hidden border-b border-border bg-surface/40">
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--background)_70%,transparent),transparent_55%)] opacity-70" />
                </div>

                <div className="flex flex-col gap-5 p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2">
                      <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground">
                        {(index + 1).toString().padStart(2, "0")}
                      </p>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    <ButtonLink
                      href={project.demoUrl}
                      variant="secondary"
                      className="shrink-0"
                    >
                      Demo <Icon name="arrow-right" className="opacity-90" />
                    </ButtonLink>
                  </div>

                  <p className="text-pretty leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Pill key={tag} className="text-foreground/80">
                        {tag}
                      </Pill>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
