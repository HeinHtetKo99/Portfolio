"use client";

import Image from "next/image";
import Link from "next/link";

import { portfolio } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { PATH_BY_SECTION } from "@/lib/sectionRoutes";
import { getScrollOffsetPx, scrollToId } from "@/lib/scrollToId";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="home" className="pt-8 sm:pt-10">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-[radial-gradient(1100px_circle_at_20%_-20%,color-mix(in_oklab,var(--accent)_55%,transparent),transparent_60%),radial-gradient(900px_circle_at_90%_20%,color-mix(in_oklab,var(--accent-2)_45%,transparent),transparent_55%)] p-7 sm:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                <Pill className="cursor-pointer select-none transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/70 hover:shadow-[0_14px_40px_color-mix(in_oklab,var(--accent)_18%,transparent)] motion-reduce:hover:translate-y-0">
                  Open to opportunities
                </Pill>
                <Pill className="cursor-pointer select-none transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/70 hover:shadow-[0_14px_40px_color-mix(in_oklab,var(--accent)_18%,transparent)] motion-reduce:hover:translate-y-0">Full Stack</Pill>
                <Pill className="cursor-pointer select-none transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface/70 hover:shadow-[0_14px_40px_color-mix(in_oklab,var(--accent)_18%,transparent)] motion-reduce:hover:translate-y-0">Next.js • Laravel</Pill>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium tracking-wide text-muted-foreground">
                  Hi, I&apos;m
                </p>
                <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                  <span className="text-foreground">{portfolio.profile.name}</span>
                </h1>
                <p className="text-pretty text-sm font-semibold tracking-wide text-foreground/90 sm:text-base">
                  <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                    {portfolio.profile.headline}
                  </span>
                </p>
                <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                  {portfolio.profile.tagline}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  href={PATH_BY_SECTION.projects}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = "projects";
                    const target = document.getElementById(id);
                    if (!target) return;

                    const offsetPx = getScrollOffsetPx();
                    const top = Math.max(
                      0,
                      target.getBoundingClientRect().top + window.scrollY - offsetPx,
                    );
                    const behavior: ScrollBehavior = reduced
                      ? "auto"
                      : Math.abs(window.scrollY - top) > window.innerHeight * 1.25
                        ? "auto"
                        : "smooth";
                    scrollToId(id, { behavior, offsetPx, updateHash: false });
                  }}
                >
                  View Projects <Icon name="arrow-right" className="opacity-90" />
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${portfolio.links.email}`}
                  variant="secondary"
                >
                  Email Me <Icon name="mail" className="opacity-90" />
                </ButtonLink>
                <ButtonLink href={portfolio.links.resume} variant="ghost" download>
                  Download Resume <Icon name="arrow-right" className="opacity-90" />
                </ButtonLink>
              </div>

              <div className="mt-2 rounded-2xl border border-border bg-surface/60 px-5 py-4 backdrop-blur-sm">
                <div className="text-sm font-semibold tracking-tight text-foreground">
                  What I&apos;m looking for
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {portfolio.profile.lookingFor.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-accent/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={PATH_BY_SECTION.skills}
                prefetch={false}
                scroll={false}
                onClick={(e) => {
                  e.preventDefault();
                  const id = "skills";
                  const target = document.getElementById(id);
                  if (!target) return;

                  const offsetPx = getScrollOffsetPx();
                  const top = Math.max(
                    0,
                    target.getBoundingClientRect().top + window.scrollY - offsetPx,
                  );
                  const behavior: ScrollBehavior = reduced
                    ? "auto"
                    : Math.abs(window.scrollY - top) > window.innerHeight * 1.25
                      ? "auto"
                      : "smooth";
                  scrollToId(id, { behavior, offsetPx, updateHash: false });
                }}
                className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Scroll <Icon name="arrow-down" className="motion-safe:animate-bounce" />
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-[320px]">
              <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_35%,transparent),transparent)] blur-2xl" />
              <div className="rounded-[32px] border border-border bg-surface/60 p-3 backdrop-blur-sm">
                <div className="relative aspect-square overflow-hidden rounded-[26px] bg-surface">
                  <Image
                    src="/projects/profile.png"
                    alt={`${portfolio.profile.name} profile photo`}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-foreground">
                  {portfolio.profile.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
