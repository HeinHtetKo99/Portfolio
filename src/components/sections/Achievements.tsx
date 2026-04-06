"use client";

import Image from "next/image";

import { useRef } from "react";

import { portfolio, type Certificate } from "@/content/portfolio";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

export function Achievements() {
  const achievements = portfolio.certificates as readonly Certificate[];
  const gridRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInViewOnce({ ref: gridRef, enabled: !reduced, threshold: 0.12 });

  return (
    <Section id="achievements">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="space-y-3">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              ACHIEVEMENTS
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Achievements
            </h2>
            <p className="max-w-2xl text-pretty text-muted-foreground">
              Certifications and learning milestones.
            </p>
          </div>

          <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((cert, index) => (
              <Card
                key={cert.title}
                interactive={false}
                className={cn(
                  "group overflow-hidden p-0",
                  "transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none",
                  reduced || inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
                style={{
                  transitionDelay: reduced || inView ? `${60 + index * 90}ms` : "0ms",
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent" />
                  <Image
                    src={cert.imageSrc}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cn(
                      "object-cover transition-transform duration-500 ease-out",
                      "group-hover:scale-[1.02]",
                    )}
                    draggable={false}
                  />
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-base font-semibold tracking-tight text-foreground">
                      {cert.title}
                    </div>
                    <div className="shrink-0 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-medium text-foreground/90">
                      Certificate
                    </div>
                  </div>

                  {Boolean(cert.issuer || cert.date) ? (
                    <div className="text-sm text-muted-foreground">
                      {[cert.issuer, cert.date].filter(Boolean).join(" • ")}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Learning milestone
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
