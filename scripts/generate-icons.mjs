/**
 * Rasterizes the gold ه mark to PNGs for favicon / Apple touch icon.
 * Requires: src/fonts/NotoNaskhArabic-Bold.ttf (OFL — Noto project)
 * Run: node scripts/generate-icons.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ttfPath = join(root, 'src', 'fonts', 'NotoNaskhArabic-Bold.ttf');
const publicDir = join(root, 'public');

const ttf = readFileSync(ttfPath);
const b64 = ttf.toString('base64');

function svgMarkup(size, rx, fontSize, textY) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <style type="text/css"><![CDATA[
      @font-face {
        font-family: 'NotoNaskh';
        src: url('data:font/ttf;base64,${b64}') format('truetype');
        font-weight: 700;
      }
    ]]></style>
  </defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="#C8972A"/>
  <text x="50%" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="NotoNaskh, serif" font-size="${fontSize}" font-weight="700" fill="#0A1628">ه</text>
</svg>`;
}

async function main() {
  mkdirSync(publicDir, { recursive: true });

  const faviconBuf = await sharp(Buffer.from(svgMarkup(32, 7, 18, 17)), { density: 300 })
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, 'icon-32.png'), faviconBuf);

  const appleBuf = await sharp(Buffer.from(svgMarkup(180, 40, 102, 94)), { density: 300 })
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), appleBuf);

  console.log('Wrote public/icon-32.png and public/apple-touch-icon.png');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
