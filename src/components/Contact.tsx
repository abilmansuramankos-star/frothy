import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { contact } from "@/content/profile";

function ChannelBlock({
  title,
  text,
  channels,
  tone,
}: {
  title: string;
  text: string;
  channels: { name: string; value: string; href: string | null }[];
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`h-full border p-7 ${
        dark ? "border-navy bg-navy text-warmwhite" : "border-line bg-warmwhite text-charcoal"
      }`}
    >
      <h3 className="font-serif text-xl">{title}</h3>
      <p
        className={`mt-3 text-sm leading-relaxed ${
          dark ? "text-warmwhite/70" : "text-muted"
        }`}
      >
        {text}
      </p>
      <ul className={`mt-6 divide-y ${dark ? "divide-warmwhite/15" : "divide-line"} border-t ${dark ? "border-warmwhite/15" : "border-line"}`}>
        {channels.map((c) => (
          <li key={c.name} className="flex items-center justify-between py-3.5">
            <span
              className={`text-xs uppercase tracking-[0.18em] ${
                dark ? "text-warmwhite/50" : "text-muted"
              }`}
            >
              {c.name}
            </span>
            {c.href ? (
              <a
                href={c.href}
                className={`text-sm font-semibold ${
                  dark ? "hover:text-accent-soft" : "hover:text-accent"
                }`}
              >
                {c.value}
              </a>
            ) : (
              <span className="text-sm font-semibold opacity-60">{c.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-line py-16 sm:py-24" aria-label="Контакты">
      <SectionHeading kicker={contact.kicker} title={contact.title} />
      <Container className="mt-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <ChannelBlock
              title={contact.personal.title}
              text={contact.personal.text}
              channels={contact.personal.channels}
              tone="light"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ChannelBlock
              title={contact.business.title}
              text={contact.business.text}
              channels={contact.business.channels}
              tone="dark"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
