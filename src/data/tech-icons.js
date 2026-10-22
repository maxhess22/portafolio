// Logos de los chips. Simple Icons (CC0) se lee en el build.
// Azure y DataTables son SVG de Devicon v2.17.0 (MIT, src/icons/LICENSE-devicon.txt).
// Slim, AWS y Pentaho no tienen un símbolo legible en esas librerías: monograma.

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./site.js";

const require = createRequire(import.meta.url);
const iconsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../icons");

const BONE = "#eae4d8";
const NAVY = "#172c3f";

const catalog = JSON.parse(readFileSync(require.resolve("simple-icons/icons.json"), "utf8"));
const hexBySlug = new Map(catalog.map((icon) => [icon.slug, icon.hex]));

function channel(hex, start) {
  const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const color = hex.replace("#", "");
  return 0.2126 * channel(color, 0) + 0.7152 * channel(color, 2) + 0.0722 * channel(color, 4);
}

function contrast(a, b) {
  const left = luminance(a);
  const right = luminance(b);
  const [hi, lo] = left > right ? [left, right] : [right, left];
  return (hi + 0.05) / (lo + 0.05);
}

// El contraste es simétrico: si la marca no se lee sobre hueso, un glifo hueso
// sobre esa marca tampoco llega a 3:1. En ese caso el glifo va en navy.
function paint(brand) {
  const color = `#${brand.replace("#", "")}`.toLowerCase();
  if (contrast(color, BONE) >= 3) return { tile: BONE, glyph: color };
  if (contrast(color, NAVY) < 3) {
    throw new Error(`Contraste insuficiente para ${color}`);
  }
  return { tile: color, glyph: NAVY };
}

function simpleMark(slug) {
  const hex = hexBySlug.get(slug);
  if (!hex) throw new Error(`Simple Icons no tiene ${slug}`);
  const svg = readFileSync(require.resolve(`simple-icons/icons/${slug}.svg`), "utf8");
  const paths = [...svg.matchAll(/<path\b([^>]*)\/?>/g)].map((match) => {
    const d = match[1].match(/\sd="([^"]+)"/);
    if (!d) throw new Error(`Sin trazo en ${slug}`);
    return d[1];
  });
  if (!paths.length) throw new Error(`Sin trazo en ${slug}`);
  const { tile, glyph } = paint(hex);
  const body = paths.map((d) => `<path fill="${glyph}" d="${d}"/>`).join("");
  return {
    tile,
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`,
  };
}

function localMark(file) {
  const raw = readFileSync(path.join(iconsDir, file), "utf8")
    .replace(/<\?xml[^?]*\?>/, "")
    .trim()
    .replaceAll("azure-original-", "chip-azure-");
  const html = raw.replace("<svg", '<svg class="chip__logo" aria-hidden="true" focusable="false"');
  if (!html.startsWith("<svg")) throw new Error(`SVG inválido: ${file}`);
  return { tile: BONE, html };
}

function monogram(text, brand) {
  const { tile, glyph } = paint(brand);
  const size = text.length > 1 ? 8 : 14;
  return {
    tile,
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><text x="12" y="12.5" dominant-baseline="middle" text-anchor="middle" font-family="Verdana, Geneva, Tahoma, sans-serif" font-size="${size}" font-weight="700" fill="${glyph}">${text}</text></svg>`,
  };
}

function awsMark() {
  const { tile, glyph } = paint("FF9900");
  // El wordmark oficial no se lee a 24 px. La sonrisa es el monograma.
  const html = `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="${glyph}" d="M3.4 13.6c1.8 3.6 4.8 5.6 8.6 5.6 3.2 0 5.7-1.4 7.4-3.6l2.4-4.2-2.6 1.8c-1.5 2-3.8 3.2-6.6 3.2-2.8 0-5-1.3-6.4-3.4-.6-.8-2.2-.6-2.8.6z"/></svg>`;
  return { tile, html };
}

const simpleSlugs = {
  Go: "go",
  PHP: "php",
  Python: "python",
  JavaScript: "javascript",
  React: "react",
  Vue: "vuedotjs",
  SvelteKit: "svelte",
  Tailwind: "tailwindcss",
  Bootstrap: "bootstrap",
  jQuery: "jquery",
  Laravel: "laravel",
  Django: "django",
  FastAPI: "fastapi",
  Gin: "gin",
  MySQL: "mysql",
  GCP: "googlecloud",
  Firebase: "firebase",
  Git: "git",
  "GitHub Actions": "githubactions",
  WordPress: "wordpress",
  Vite: "vite",
  Pug: "pug",
};

export const techMarks = {
  ...Object.fromEntries(Object.entries(simpleSlugs).map(([label, slug]) => [label, simpleMark(slug)])),
  Azure: localMark("azure.svg"),
  DataTables: localMark("datatables.svg"),
  Slim: monogram("S", "68A063"),
  AWS: awsMark(),
  Pentaho: monogram("P", "E4002B"),
};

for (const group of site.technologies) {
  for (const item of group.items) {
    const label = typeof item === "string" ? item : item.label;
    if (!techMarks[label]) throw new Error(`Falta el logo de ${label}`);
  }
}
