import { Instagram, Send, Youtube } from "lucide-react";
import { Container } from "./ui/Container";
import { PhotoSlot } from "./ui/PhotoSlot";
import { hero, site, socials } from "@/content/profile";

const iconById: Record<string, React.ReactNode> = {
  instagram: <Instagram size={18} />,
  tiktok: <span className="text-xs font-bold">TT</span>,
  youtube: <Youtube size={18} />,
  telegram: <Send size={18} />,
};

export function Hero() {
  return (
    <section id="hero" aria-label="Главный экран">
      <Container className="pt-14 pb-16 sm:pt-20 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {hero.kicker}
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              {hero.headline.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="not-italic text-accent">{line}</em> : line}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.positioning}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={hero.ctaContent.href}
                className="border border-navy bg-navy px-6 py-3 text-sm font-semibold text-warmwhite transition-colors hover:border-accent hover:bg-accent"
              >
                {hero.ctaContent.label}
              </a>
              <a
                href={hero.ctaBusiness.href}
                className="border border-charcoal px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {hero.ctaBusiness.label}
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-3" aria-label="Социальные сети">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href ?? "#social"}
                    aria-label={`${s.name}${s.href ? "" : " — ссылка появится скоро"}`}
                    title={s.href ? s.name : `${s.name} · ссылка появится скоро`}
                    className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {iconById[s.id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative ml-auto max-w-md lg:-mt-6">
              <PhotoSlot label="портрет автора" ratio="aspect-[4/5]" />
              <div className="absolute -bottom-6 -left-6 hidden w-40 border border-line bg-paper p-4 sm:block">
                <p className="font-serif text-lg leading-snug text-navy">
                  «Работал сам — теперь показываю, как это устроено»
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-muted">
                  {site.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
