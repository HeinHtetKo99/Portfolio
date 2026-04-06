import { portfolio } from "@/content/portfolio";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export function Contact() {
  return (
    <Section id="contact" className="pb-20 sm:pb-28">
      <Container>
        <Card interactive={false} className="overflow-hidden p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Contact
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build something great.
              </h2>
              <p className="max-w-2xl text-pretty text-muted-foreground">
                If you&apos;re looking for a developer who can ship polished UI,
                handle real product workflows, and keep things maintainable —
                let&apos;s talk.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href={`mailto:${portfolio.links.email}`}>
                <Icon name="mail" className="opacity-90" /> Email
              </ButtonLink>
              <ButtonLink href={portfolio.links.linkedin} variant="secondary">
                <Icon name="linkedin" className="opacity-90" /> LinkedIn
              </ButtonLink>
              <ButtonLink href={portfolio.links.github} variant="secondary">
                <Icon name="github" className="opacity-90" /> GitHub
              </ButtonLink>
            </div>
          </div>
        </Card>

      </Container>
    </Section>
  );
}
