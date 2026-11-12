import { Container } from "./Container";

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <Container className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {kicker}
      </p>
      <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
      <hr className="mt-8 border-line" aria-hidden="true" />
    </Container>
  );
}
