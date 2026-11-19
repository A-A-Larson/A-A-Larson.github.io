// Puts 1 to 3 phone screenshots side by side on a 1600x1200 (4:3) canvas, so they fit the portfolio slideshows.
//
// Usage:
//   node scripts/compose-phones.mjs <out> <shot1> [shot2] [shot3] [--bg "#eef1f4"]
//
//   <out>   where to save, relative to src/app/img/projects/ (e.g. build-a-guild/01-home.webp) or an absolute path
//   <shotN> raw phone screenshots (PNG/JPG/WebP), left to right. Keep these OUTSIDE src/app/img/projects/:
//           the site treats portrait images in that folder as walkthrough images, not slideshow slides.
//   --bg    canvas color (default a soft gray-blue)
//
// Example:
//   node scripts/compose-phones.mjs build-a-guild/01-home.webp C:\scratch\home.png C:\scratch\setup.png
//
// Then add a caption to the folder's captions.json and run `npm run shots`.
import { mkdirSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, 'src/app/img/projects');

const W = 1600;
const H = 1200;
const MARGIN_Y = 90;
const MARGIN_X = 90;
const GAP = 90;
const MAX_BYTES = 150 * 1024;

const args = process.argv.slice(2);
let bg = '#eef1f4';
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--bg') bg = args[++i];
  else positional.push(args[i]);
}
const [outArg, ...shots] = positional;
if (!outArg || shots.length < 1 || shots.length > 3) {
  console.error('Usage: node scripts/compose-phones.mjs <out> <shot1> [shot2] [shot3] [--bg "#eef1f4"]');
  process.exit(1);
}
const outFile = isAbsolute(outArg) ? outArg : join(projectsDir, outArg);

// Each phone: read, rotate by EXIF, round the corners.
async function preparePhone(file, height) {
  const meta = await sharp(file).rotate().metadata();
  const width = Math.round((height * meta.width) / meta.height);
  const radius = Math.round(width * 0.09);
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}"/></svg>`
  );
  const body = await sharp(file)
    .rotate()
    .resize(width, height, { fit: 'fill' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  return { body, width, height, radius };
}

// Size phones so the row fits the canvas at the tallest possible height.
const sizes = await Promise.all(shots.map((s) => sharp(s).rotate().metadata()));
const ratios = sizes.map((m) => m.width / m.height);
let height = H - MARGIN_Y * 2;
const rowWidth = (h) => ratios.reduce((sum, r) => sum + r * h, 0) + GAP * (shots.length - 1);
if (rowWidth(height) > W - MARGIN_X * 2) {
  height = Math.floor(((W - MARGIN_X * 2 - GAP * (shots.length - 1)) / ratios.reduce((a, b) => a + b, 0)));
}

const phones = await Promise.all(shots.map((s) => preparePhone(s, height)));
const total = phones.reduce((sum, p) => sum + p.width, 0) + GAP * (phones.length - 1);
let x = Math.round((W - total) / 2);
const y = Math.round((H - height) / 2);

const layers = [];
for (const p of phones) {
  // Soft shadow: draw on a padded canvas so the blur has room to fade out.
  const PAD = 60;
  const shadow = await sharp(
    Buffer.from(
      `<svg width="${p.width + PAD * 2}" height="${p.height + PAD * 2}"><rect x="${PAD}" y="${PAD}" width="${p.width}" height="${p.height}" rx="${p.radius}" ry="${p.radius}" fill="rgba(0,0,0,0.30)"/></svg>`
    )
  )
    .blur(16)
    .png()
    .toBuffer();
  layers.push({ input: shadow, left: x - PAD, top: y - PAD + 16 });
  const outline = Buffer.from(
    `<svg width="${p.width}" height="${p.height}"><rect x="1" y="1" width="${p.width - 2}" height="${p.height - 2}" rx="${p.radius}" ry="${p.radius}" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="2"/></svg>`
  );
  layers.push({ input: p.body, left: x, top: y });
  layers.push({ input: outline, left: x, top: y });
  x += p.width + GAP;
}

mkdirSync(dirname(resolve(outFile)), { recursive: true });
const canvas = () => sharp({ create: { width: W, height: H, channels: 3, background: bg } }).composite(layers);

let quality = 82;
let buffer = await canvas().webp({ quality }).toBuffer();
while (buffer.length > MAX_BYTES && quality > 50) {
  quality -= 6;
  buffer = await canvas().webp({ quality }).toBuffer();
}
await sharp(buffer).toFile(outFile);
console.log(`compose-phones: wrote ${outFile} (${W}x${H}, ${(buffer.length / 1024).toFixed(0)} KB, quality ${quality}, ${shots.length} phone(s))`);
