import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { PhotoSlot } from "./ui/PhotoSlot";
import { about } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="border-t border-line py-16 sm:py-24" aria-label="Обо мне">
      <SectionHeading kicker={about.kicker} title={about.title} />
      <Container className="mt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-5 text-base leading-[1.8] text-charcoal">
                {p}
              </p>
            ))}
          </Reveal>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.1}>
                <PhotoSlot label="сезон за работой" ratio="aspect-[3/4]" />
              </Reveal>
              <Reveal delay={0.2}>
                <PhotoSlot label="путешествие" ratio="aspect-[3/4]" className="mt-8" />
              </Reveal>
            </div>
          </div>
        </div>
        <dl className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {about.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-warmwhite">
              <div className="px-6 py-8 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className="font-serif text-4xl text-navy"
                    title={s.value === null ? s.hint : undefined}
                  >
                    {s.value ?? "—"}
                  </span>
                  <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
