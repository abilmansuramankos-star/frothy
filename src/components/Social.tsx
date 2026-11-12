import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { socials } from "@/content/profile";

export function Social() {
  return (
    <section id="social" className="border-t border-line py-16 sm:py-24" aria-label="Социальные сети">
      <SectionHeading
        kicker="Соцсети"
        title="Где я публикую контент"
        description="Ссылки и цифры обновляются по мере заполнения. Я не публикую выдуманные метрики — только подтверждённые данные из статистики платформ."
      />
      <Container className="mt-12">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="bg-warmwhite">
              <li>
                <a
                  href={s.href ?? "#social"}
                  aria-disabled={s.href === null}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-paper"
                >
                  <span className="font-serif text-xl text-ink group-hover:text-accent">
                    {s.name}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{s.note}</span>
                  <span className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted">
                      подписчики
                    </span>
                    <span className="font-serif text-lg text-navy">
                      {s.followers ?? "уточняется"}
                    </span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
