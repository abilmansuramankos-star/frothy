/**
 * Генерирует public/media-kit.pdf (одна страница, плейсхолдеры).
 * Запуск: npm run media-kit
 * Данные редактируйте здесь и в src/content/profile.ts.
 */
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import PDFDocument from "pdfkit";

const fontsDir = path.join(import.meta.dirname, "fonts");

const name = "Имя Фамилия";
const tagline = "Work & Travel · блог, консультации и партнёрства";
const PH = "— (заполните реальными данными)";

const lines = [
  ["Аудитория, все платформы", PH],
  ["Просмотры в месяц", PH],
  ["Средний охват поста", PH],
  ["Вовлечённость (ER)", PH],
  ["Возраст ядра аудитории", PH],
  ["Основные страны", PH],
];

const formats = [
  "Спонсорский контент",
  "Продвижение работодателей",
  "Партнёрство с агентствами",
  "UGC и амбассадорство",
];

const outDir = path.join(process.cwd(), "public");
await mkdir(outDir, { recursive: true });
const doc = new PDFDocument({ size: "A4", margin: 56 });
doc.registerFont("kit", path.join(fontsDir, "DejaVuSans.ttf"));
doc.registerFont("kit-bold", path.join(fontsDir, "DejaVuSans-Bold.ttf"));
const out = path.join(outDir, "media-kit.pdf");
doc.pipe(createWriteStream(out));

doc.font("kit").fontSize(9).fillColor("#6f6a61").text(tagline.toUpperCase(), { characterSpacing: 2 });
doc.moveDown(0.5);
doc.font("kit-bold").fontSize(28).fillColor("#16233c").text(name);
doc.moveDown(0.3);
doc.font("kit").fontSize(12).fillColor("#23211d").text(
  "Медиакит для брендов, агентств и работодателей",
);

const ruleY = doc.y + 16;
doc.moveTo(56, ruleY).lineTo(539, ruleY).lineWidth(1).strokeColor("#e2dbcf").stroke();
doc.moveDown(1.8);

doc.fontSize(11).fillColor("#b4552d").text("ПОКАЗАТЕЛИ", { characterSpacing: 2 });
doc.moveDown(0.6);
for (const [label, value] of lines) {
  doc.fontSize(10).fillColor("#23211d").text(label, { continued: true });
  doc.fillColor("#6f6a61").text(value, { align: "right" });
  doc.moveDown(0.35);
}
doc.moveDown(0.8);

doc.fontSize(11).fillColor("#b4552d").text("ФОРМАТЫ СОТРУДНИЧЕСТВА", { characterSpacing: 2 });
doc.moveDown(0.6);
for (const f of formats) {
  doc.fontSize(10).fillColor("#23211d").text(`- ${f}`);
  doc.moveDown(0.3);
}
doc.moveDown(0.8);

doc.fontSize(11).fillColor("#b4552d").text("КОНТАКТЫ", { characterSpacing: 2 });
doc.moveDown(0.6);
doc.fontSize(10).fillColor("#23211d").text("E-mail: hello@example.com (замените)");
doc.moveDown(0.3);
doc.fontSize(8).fillColor("#6f6a61").text(
  "Плейсхолдеры. Обновите данные в src/content/profile.ts и перезапустите: npm run media-kit",
);

doc.end();
console.log(`OK: ${out}`);
