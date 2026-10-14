// Imprime cada HTML gerado pelo build.py em PDF (A4) usando o Chromium do Playwright.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const jobs = JSON.parse(process.argv[2]);
const browser = await pw.chromium.launch();
const page = await browser.newPage();
for (const j of jobs) {
  await page.goto('file://' + j.html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: j.pdf, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('✔', j.pdf.split('/').pop());
}
await browser.close();
