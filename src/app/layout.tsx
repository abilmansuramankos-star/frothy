import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/content/profile";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Work & Travel: блог, опыт, консультации`,
    template: `%s — ${site.name}`,
  },
  description: site.positioning,
  keywords: [
    "Work and Travel",
    "работа за границей",
    "стажировка в США",
    "тревел-блог",
    "консультации Work & Travel",
  ],
  openGraph: {
    title: `${site.name} — Work & Travel`,
    description: site.positioning,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
