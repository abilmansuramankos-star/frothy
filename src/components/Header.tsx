"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";

const links = [
  { href: "#about", label: "Обо мне" },
  { href: "#social", label: "Соцсети" },
  { href: "#journal", label: "Дневник" },
  { href: "#consultations", label: "Консультации" },
  { href: "#partnerships", label: "Партнёрство" },
  { href: "#contact", label: "Контакты" },
];

export function Header({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-warmwhite/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="font-serif text-lg font-semibold text-ink">
            {name}
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#partnerships"
              className="border border-navy bg-navy px-4 py-2 text-sm font-semibold text-warmwhite transition-colors hover:border-accent hover:bg-accent"
            >
              Для бизнеса
            </a>
          </nav>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>
      {open ? (
        <nav
          className="border-t border-line bg-warmwhite lg:hidden"
          aria-label="Мобильная навигация"
        >
          <Container>
            <ul className="flex flex-col py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block border-b border-line/60 py-3 text-base text-ink last:border-b-0 hover:text-accent"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
