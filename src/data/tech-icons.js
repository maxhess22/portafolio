// Logos oficiales de Devicon v2.17.0 (MIT, src/icons/LICENSE-devicon.txt).
// Van en color de marca. Si el logo es de una sola tinta y no se lee sobre
// el slate #4f6378, se pasa a blanco hueso. Slim, Gin y Pentaho no tienen
// símbolo en Devicon: monograma en hueso, sin placa.

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./site.js";

const iconsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../icons");
const BONE = "#eae4d8";

function prefixIds(svg, prefix) {
  return svg
    .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`);
}

function toBone(svg) {
  return svg
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, `fill="${BONE}"`)
    .replace(/stroke="#[0-9A-Fa-f]{3,8}"/g, `stroke="${BONE}"`);
}

function logo(file, { ink } = {}) {
  const prefix = `logo-${file.replace(/\.svg$/, "")}-`;
  let raw = readFileSync(path.join(iconsDir, file), "utf8")
    .replace(/<\?xml[^?]*\?>/, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
  raw = prefixIds(raw, prefix);
  if (ink === "bone") raw = toBone(raw);
  const html = raw.replace(/<svg\b([^>]*)>/, (_, attrs) => {
    const cleaned = attrs.replace(/\s(?:width|height)="[^"]*"/g, "");
    return `<svg class="chip__logo" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"${cleaned}>`;
  });
  if (!html.startsWith("<svg")) throw new Error(`SVG inválido: ${file}`);
  return { html };
}

function monogram(letter) {
  return {
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><text x="12" y="16.5" text-anchor="middle" font-family="Verdana, Geneva, Tahoma, sans-serif" font-size="13" font-weight="700" fill="${BONE}">${letter}</text></svg>`,
  };
}

const files = {
  Go: ["go.svg"],
  PHP: ["php.svg"],
  Python: ["python.svg"],
  JavaScript: ["javascript.svg"],
  React: ["react.svg"],
  Vue: ["vuejs.svg"],
  SvelteKit: ["svelte.svg"],
  Tailwind: ["tailwindcss.svg"],
  Bootstrap: ["bootstrap.svg"],
  jQuery: ["jquery.svg", "bone"],
  DataTables: ["datatables.svg"],
  WordPress: ["wordpress.svg", "bone"],
  Laravel: ["laravel.svg"],
  Django: ["django.svg", "bone"],
  FastAPI: ["fastapi.svg"],
  MySQL: ["mysql.svg", "bone"],
  GCP: ["googlecloud.svg"],
  Azure: ["azure.svg"],
  AWS: ["aws.svg"],
  Firebase: ["firebase.svg"],
  Git: ["git.svg"],
  "GitHub Actions": ["githubactions.svg", "bone"],
  Vite: ["vitejs.svg"],
  Pug: ["pug.svg"],
};

export const techMarks = {
  ...Object.fromEntries(
    Object.entries(files).map(([label, [file, ink]]) => [label, logo(file, { ink })]),
  ),
  Slim: monogram("S"),
  Gin: monogram("G"),
  Pentaho: monogram("P"),
};

for (const group of site.technologies) {
  for (const item of group.items) {
    const label = typeof item === "string" ? item : item.label;
    if (!techMarks[label]) throw new Error(`Falta el logo de ${label}`);
  }
}
