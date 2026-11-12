import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
const url = "http://localhost:3000/";

for (const w of [1440, 1280, 768, 390, 320]) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto(url, { waitUntil: "load" });
  const overflow = await page.evaluate(
    () =>
      document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth,
  );
  console.log(`width=${w} overflowX=${overflow}px`);
}

await page.setViewport({ width: 390, height: 800 });
await page.goto(url, { waitUntil: "load" });
await page.waitForSelector('button[aria-label="Открыть меню"]');
await page.evaluate(() => document.querySelector('button[aria-label="Открыть меню"]').click());
await page.waitForSelector('nav[aria-label="Мобильная навигация"]', {
  visible: true,
});
console.log("mobile menu: opens");
await page.click('nav[aria-label="Мобильная навигация"] a[href="#journal"]');
await new Promise((r) => setTimeout(r, 600));
const journalVisible = await page.evaluate(() => {
  const r = document.querySelector("#journal").getBoundingClientRect();
  return r.top > -r.height && r.top < window.innerHeight * 0.8;
});
console.log("anchor nav to #journal:", journalVisible);

await page.goto(url + "#consultations", { waitUntil: "load" });
await page.click('button[type="submit"]');
const errCount = await page.$$eval("form p.text-accent", (els) => els.length);
console.log("validation errors shown:", errCount);

await page.type("#f-name", "Тест Тестов");
await page.type("#f-age", "20");
await page.type("#f-residence", "Алматы");
await page.type("#f-destination", "США");
await page.select("#f-program", "work-travel-usa");
await page.type("#f-contact", "+7 700 000-00-00");
await page.type("#f-message", "Хочу поехать по программе, расскажите подробнее");
await page.click('button[type="submit"]');
await page.waitForSelector('[role="alert"]', { timeout: 5000 });
const alertText = await page.$eval('[role="alert"]', (el) =>
  el.textContent.trim().slice(0, 90),
);
console.log("submit without backend -> alert:", alertText + "…");
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
