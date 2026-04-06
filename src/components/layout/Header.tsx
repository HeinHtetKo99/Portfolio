 "use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/cn";
import { PATH_BY_SECTION } from "@/lib/sectionRoutes";
import { getScrollOffsetPx, scrollToId } from "@/lib/scrollToId";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
] as const;

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

function NavItem({
  id,
  label,
  active,
  reduced,
}: {
  id: (typeof navItems)[number]["id"];
  label: string;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const target = document.getElementById(id);
        if (!target) return;

        const offsetPx = getScrollOffsetPx();
        const top = Math.max(
          0,
          target.getBoundingClientRect().top + window.scrollY - offsetPx,
        );
        const behavior = pickBehavior({ reduced, nextTop: top });
        scrollToId(id, { behavior, offsetPx, updateHash: false });
      }}
      className={cn(
        "rounded-full px-3 py-2 text-xs font-medium transition-all motion-reduce:transition-none",
        active
          ? "bg-gradient-to-r from-accent/90 to-accent-2/80 text-background shadow-[0_10px_30px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
          : "text-muted-foreground hover:-translate-y-0.5 hover:bg-surface/60 hover:text-foreground motion-reduce:hover:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {label}
    </button>
  );
}

export function Header() {
  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);
  const [activeId, setActiveId] = useState<(typeof navItems)[number]["id"]>(
    "home",
  );
  const rafRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const line = 140;

    const update = () => {
      rafRef.current = null;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActiveId((prev) => (prev === "contact" ? prev : "contact"));
        return;
      }

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          const next = el.id as (typeof navItems)[number]["id"];
          setActiveId((prev) => (prev === next ? prev : next));
          return;
        }
      }

      const first = sections[0]?.id;
      if (first) {
        const next = first as (typeof navItems)[number]["id"];
        setActiveId((prev) => (prev === next ? prev : next));
      }
    };

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [sectionIds]);

  return (
    <div className="sticky top-0 z-50 pt-4" data-site-header>
      <Container className="flex flex-wrap items-center justify-between gap-3">
        <ThemeToggle className="order-1" />

        <nav
          aria-label="Primary navigation"
          className={cn(
            "order-3 w-full sm:order-2 sm:w-auto",
            "mx-auto flex items-center justify-center gap-1 rounded-full border border-border bg-surface/70 p-1 md:bg-surface/40 md:backdrop-blur-sm",
            "shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_6%,transparent)]",
          )}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              active={activeId === item.id}
              reduced={reduced}
            />
          ))}
        </nav>

        <ButtonLink
          href={PATH_BY_SECTION.contact}
          className="order-2 whitespace-nowrap sm:order-3"
          onClick={(e) => {
            e.preventDefault();
            const id = "contact";
            const target = document.getElementById(id);
            if (!target) return;

            const offsetPx = getScrollOffsetPx();
            const top = Math.max(
              0,
              target.getBoundingClientRect().top + window.scrollY - offsetPx,
            );
            const behavior = pickBehavior({ reduced, nextTop: top });
            scrollToId(id, { behavior, offsetPx, updateHash: false });
          }}
        >
          Hire me
        </ButtonLink>
      </Container>
    </div>
  );
}
