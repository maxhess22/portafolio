// Logos de los chips, en el color oficial de cada marca.
// Simple Icons (CC0) se lee en el build y se pinta con su hex.
// Los SVG de varias marcas son de Devicon v2.17.0 (MIT, src/icons/LICENSE-devicon.txt).
// Slim, AWS y Pentaho no tienen un símbolo legible en esas librerías: monograma.

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./site.js";

const require = createRequire(import.meta.url);
const iconsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../icons");

const WHITE = "#ffffff";
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

function brandColor(hex) {
  return `#${hex.replace("#", "")}`.toLowerCase();
}

// El glifo conserva el color de marca. La placa es clara si ese color se lee
// sobre blanco; si la marca es muy clara, la placa es navy para que se vea.
function plateFor(hex) {
  const color = brandColor(hex);
  if (contrast(color, WHITE) >= 3) return { tile: WHITE, glyph: color, brand: color };
  if (contrast(color, NAVY) < 3) throw new Error(`Contraste insuficiente para ${color}`);
  return { tile: NAVY, glyph: color, brand: color };
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
  const { tile, glyph, brand } = plateFor(hex);
  const body = paths.map((d) => `<path fill="${glyph}" d="${d}"/>`).join("");
  return {
    tile,
    brand,
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`,
  };
}

function prefixIds(svg, prefix) {
  return svg
    .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`);
}

function localMark(file, brand) {
  const prefix = `chip-${file.replace(/\.svg$/, "")}-`;
  const raw = prefixIds(
    readFileSync(path.join(iconsDir, file), "utf8").replace(/<\?xml[^?]*\?>/, "").trim(),
    prefix,
  );
  const html = raw.replace("<svg", '<svg class="chip__logo" aria-hidden="true" focusable="false"');
  if (!html.startsWith("<svg")) throw new Error(`SVG inválido: ${file}`);
  return { tile: WHITE, brand: brandColor(brand), html };
}

function monogram(text, brand) {
  const { tile, glyph, brand: color } = plateFor(brand);
  const size = text.length > 1 ? 8 : 14;
  return {
    tile,
    brand: color,
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><text x="12" y="12.5" dominant-baseline="middle" text-anchor="middle" font-family="Verdana, Geneva, Tahoma, sans-serif" font-size="${size}" font-weight="700" fill="${glyph}">${text}</text></svg>`,
  };
}

function awsMark() {
  const { tile, glyph, brand } = plateFor("FF9900");
  // El wordmark oficial no se lee a 24 px. La sonrisa es el monograma.
  const html = `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="${glyph}" d="M3.4 13.6c1.8 3.6 4.8 5.6 8.6 5.6 3.2 0 5.7-1.4 7.4-3.6l2.4-4.2-2.6 1.8c-1.5 2-3.8 3.2-6.6 3.2-2.8 0-5-1.3-6.4-3.4-.6-.8-2.2-.6-2.8.6z"/></svg>`;
  return { tile, brand, html };
}

const simpleSlugs = {
  Go: "go",
  PHP: "php",
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
  Git: "git",
  "GitHub Actions": "githubactions",
  WordPress: "wordpress",
  Vite: "vite",
  Pug: "pug",
};

export const techMarks = {
  ...Object.fromEntries(Object.entries(simpleSlugs).map(([label, slug]) => [label, simpleMark(slug)])),
  Python: localMark("python.svg", "3776AB"),
  JavaScript: localMark("javascript.svg", "F0DB4F"),
  Azure: localMark("azure.svg", "0078D4"),
  DataTables: localMark("datatables.svg", "172c3f"),
  Firebase: localMark("firebase.svg", "FFA000"),
  GCP: localMark("googlecloud.svg", "4285F4"),
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
