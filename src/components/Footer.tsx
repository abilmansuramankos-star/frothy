import { Container } from "./ui/Container";
import { site, socials } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper/50 py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-lg text-ink">{site.name}</p>
            <p className="mt-1 text-xs text-muted">
              Work & Travel · блог, консультации и партнёрства
            </p>
          </div>
          <ul className="flex flex-wrap gap-5 text-sm">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href ?? "#social"}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Все материалы — личный опыт автора.
        </p>
      </Container>
    </footer>
  );
}
