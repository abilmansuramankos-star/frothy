import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { PhotoSlot } from "./ui/PhotoSlot";
import { articles, journal } from "@/content/profile";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Journal() {
  const [featured, ...rest] = articles;
  return (
    <section id="journal" className="border-t border-line py-16 sm:py-24" aria-label="Дневник">
      <SectionHeading
        kicker={journal.kicker}
        title={journal.title}
        description={journal.description}
      />
      <Container className="mt-12">
        {featured ? (
          <Reveal>
            <article className="grid gap-8 border border-line bg-paper/60 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
              <PhotoSlot label="обложка статьи" ratio="aspect-[16/10]" />
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {featured.category} · {formatDate(featured.date)} · {featured.readingTime}
                </p>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <a
                  href={featured.href ?? "#journal"}
                  className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-accent pb-1 text-sm font-semibold text-accent"
                >
                  Читать
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
        ) : null}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <article className="flex h-full flex-col border border-line bg-warmwhite">
                <PhotoSlot label="иллюстрация" ratio="aspect-[16/9]" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                    {a.category}
                  </p>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-ink">{a.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
                  <p className="mt-5 border-t border-line pt-4 text-xs uppercase tracking-[0.12em] text-muted">
                    {formatDate(a.date)} · {a.readingTime}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
