import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";
import { partnerships } from "@/content/profile";

export function Partnerships() {
  return (
    <section
      id="partnerships"
      className="border-t border-line bg-navy py-16 text-warmwhite sm:py-24"
      aria-label="Партнёрство"
    >
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-warmwhite/60">
          {partnerships.kicker}
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
          {partnerships.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-warmwhite/70">
          {partnerships.description}
        </p>
      </Container>
      <Container className="mt-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {partnerships.formats.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.06}>
              <div className="h-full border border-warmwhite/15 p-6 sm:p-7">
                <h3 className="font-serif text-xl">{f.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warmwhite/70">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
            {partnerships.audience.map((a) => (
              <div key={a.label} className="border-t border-warmwhite/20 pt-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-warmwhite/50">
                  {a.label}
                </dt>
                <dd className="mt-2 font-serif text-lg">{a.value}</dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href={partnerships.cta.href}
              className="inline-block border border-warmwhite px-6 py-3 text-sm font-semibold text-warmwhite transition-colors hover:border-accent hover:bg-accent"
            >
              {partnerships.cta.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
