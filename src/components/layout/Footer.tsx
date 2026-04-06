"use client";

import { useEffect, useMemo, useState } from "react";

import { portfolio } from "@/content/portfolio";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Footer() {
  const reduced = usePrefersReducedMotion();
  const fullText = useMemo(
    () =>
      `${portfolio.profile.name} - Built with Next.js + Tailwind CSS. Focused on clean UX, performance, and maintainable structure.`,
    [],
  );
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (reduced) {
      const kickoff = window.setTimeout(() => setVisibleText(fullText), 0);
      return () => window.clearTimeout(kickoff);
    }

    const typingDelayMs = 22;
    const deletingDelayMs = 14;
    const pauseAtEndMs = 900;
    const pauseAtStartMs = 450;

    let timeout: number | undefined;
    let index = 0;
    let direction: 1 | -1 = 1;

    const step = (delayMs: number) => {
      timeout = window.setTimeout(() => {
        index += direction;
        if (index >= fullText.length) {
          index = fullText.length;
          setVisibleText(fullText);
          direction = -1;
          step(pauseAtEndMs);
          return;
        }

        if (index <= 0) {
          index = 0;
          setVisibleText("");
          direction = 1;
          step(pauseAtStartMs);
          return;
        }

        setVisibleText(fullText.slice(0, index));
        step(direction === 1 ? typingDelayMs : deletingDelayMs);
      }, delayMs);
    };

    const kickoff = window.setTimeout(() => {
      index = 0;
      direction = 1;
      setVisibleText("");
      step(typingDelayMs);
    }, 0);

    return () => {
      window.clearTimeout(kickoff);
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [fullText, reduced]);

  return (
    <footer className="mt-12 border-t border-border/70 bg-surface/30 py-10 md:py-12">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-baseline justify-center gap-1 font-mono text-sm text-muted-foreground md:text-base">
            <span aria-label="Built with Next.js and Tailwind CSS">
              <span className="footer-typing">{visibleText}</span>
              {!reduced ? <span className="footer-caret">|</span> : null}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
