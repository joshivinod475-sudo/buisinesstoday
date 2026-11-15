// Crops every picture in public/images/ into the sizes the site uses
// (see src/lib/images.ts). Runs automatically before `npm run dev` and `npm run build`.
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images';
const OUT = 'public/images/v';
const SIZES = [
  [1600, 900], [1200, 675], [800, 450], // 16:9 — lead image, cards, social cards
  [1600, 1200],                          // 4:3  — Google article schema
  [1200, 1200], [400, 400],              // 1:1  — Google article schema, thumbnails
];
const MIN_WIDTH = 1200; // Google Discover needs images at least 1200px wide

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
let made = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  const name = file.replace(/\.[^.]+$/, '');
  const { width } = await sharp(input).metadata();
  if (width < MIN_WIDTH) console.warn(`! ${file} is only ${width}px wide. Use a picture at least 1600px wide for lead images.`);
  const srcTime = (await stat(input)).mtimeMs;

  for (const [w, h] of SIZES) {
    const output = path.join(OUT, `${name}-${w}x${h}.jpg`);
    const outTime = await stat(output).then((s) => s.mtimeMs, () => 0);
    if (outTime > srcTime) continue;
    await sharp(input).resize(w, h, { fit: 'cover', position: 'attention' }).jpeg({ quality: 78, mozjpeg: true }).toFile(output);
    made++;
  }
}
console.log(`images: ${files.length} source file(s), ${made} crop(s) written`);
