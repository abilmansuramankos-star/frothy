import { Download } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { mediaKit } from "@/content/profile";

export function MediaKit() {
  return (
    <section id="media-kit" className="border-t border-line py-16 sm:py-24" aria-label="Медиакит">
      <SectionHeading
        kicker={mediaKit.kicker}
        title={mediaKit.title}
        description={mediaKit.description}
      />
      <Container className="mt-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {mediaKit.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05} className="bg-warmwhite">
                <div className="px-6 py-5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-muted">
                    {m.label}
                    {m.value === null ? (
                      <span className="ml-2 border border-line px-1.5 py-0.5 text-[10px] normal-case tracking-normal text-accent">
                        плейсхолдер
                      </span>
                    ) : null}
                  </dt>
                  <dd
                    className="mt-1.5 font-serif text-2xl text-navy"
                    title={m.value === null ? "Заполните реальными данными в profile.ts" : undefined}
                  >
                    {m.value ?? "—"}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.15} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between border border-line bg-paper/60 p-7">
              <div>
                <h3 className="font-serif text-xl text-ink">PDF для брендов</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Медиакит одной страницей: платформы, охваты, аудитория, форматы
                  сотрудничества и контакты. Перед рассылкой обновите цифры.
                </p>
              </div>
              <a
                href={mediaKit.pdfHref}
                download="media-kit.pdf"
                className="mt-6 inline-flex w-fit items-center gap-2 border border-navy bg-navy px-5 py-3 text-sm font-semibold text-warmwhite transition-colors hover:border-accent hover:bg-accent"
              >
                <Download size={16} aria-hidden="true" />
                Скачать медиакит
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
