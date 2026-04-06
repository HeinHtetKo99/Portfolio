import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PathScrollHandler } from "@/components/layout/PathScrollHandler";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export function PortfolioPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_15%_-10%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_60%),radial-gradient(900px_circle_at_80%_10%,color-mix(in_oklab,var(--accent-2)_25%,transparent),transparent_55%)]" />

      <main className="flex flex-col">
        <PathScrollHandler />
        <Header />
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
