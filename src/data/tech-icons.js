// SVG de Simple Icons y Devicon. Las marcas sin símbolo fiable son texto.

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  siBootstrap, siDjango, siFastapi, siGit,
  siGo, siJavascript, siJquery, siLaravel, siPhp, siReact,
  siSvelte, siTailwindcss, siVuedotjs, siWordpress,
} from "simple-icons";
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

function simpleIcon(icon, { ink, variant } = {}) {
  const fill = ink === "bone" ? BONE : ink || `#${icon.hex}`;
  return {
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="${fill}" d="${icon.path}"/></svg>`,
    variant,
  };
}

// Workflow-24 de GitHub Primer Octicons (MIT): un símbolo claro a tamaño pequeño.
// https://github.com/primer/octicons/blob/main/icons/workflow-24.svg
function workflowIcon() {
  return {
    html: `<svg class="chip__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#79b8ff" d="M1 3a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2H7v4.063C7 16.355 7.644 17 8.438 17H12.5v-2.5a2 2 0 0 1 2-2H21a2 2 0 0 1 2 2V21a2 2 0 0 1-2 2h-6.5a2 2 0 0 1-2-2v-2.5H8.437A2.939 2.939 0 0 1 5.5 15.562V11.5H3a2 2 0 0 1-2-2Zm2-.5a.5.5 0 0 0-.5.5v6.5a.5.5 0 0 0 .5.5h6.5a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5ZM14.5 14a.5.5 0 0 0-.5.5V21a.5.5 0 0 0 .5.5H21a.5.5 0 0 0 .5-.5v-6.5a.5.5 0 0 0-.5-.5Z"/></svg>`,
    variant: "actions",
  };
}

const files = {
  Python: ["python.svg"],
  DataTables: ["datatables.svg"],
  MySQL: ["mysql.svg", "bone"],
  GCP: ["googlecloud.svg"],
  Azure: ["azure.svg"],
  AWS: ["aws.svg"],
  Firebase: ["firebase.svg"],
  Vite: ["vitejs.svg"],
  Pug: ["pug.svg"],
};

export const techMarks = {
  ...Object.fromEntries(
    Object.entries(files).map(([label, [file, ink]]) => [label, logo(file, { ink })]),
  ),
  Go: simpleIcon(siGo),
  PHP: simpleIcon(siPhp),
  JavaScript: simpleIcon(siJavascript),
  React: simpleIcon(siReact),
  Vue: simpleIcon(siVuedotjs),
  SvelteKit: simpleIcon(siSvelte),
  Tailwind: simpleIcon(siTailwindcss),
  Bootstrap: simpleIcon(siBootstrap),
  jQuery: simpleIcon(siJquery, { ink: "bone" }),
  WordPress: simpleIcon(siWordpress, { ink: "bone" }),
  Laravel: simpleIcon(siLaravel),
  Django: simpleIcon(siDjango, { ink: "bone" }),
  FastAPI: simpleIcon(siFastapi),
  Git: simpleIcon(siGit),
  "GitHub Actions": workflowIcon(),
  Gin: { variant: "wordmark" },
  Slim: { variant: "wordmark" },
  Pentaho: { variant: "wordmark" },
};

for (const group of site.technologies) {
  for (const item of [...group.primary, ...group.secondary]) {
    const label = typeof item === "string" ? item : item.label;
    if (!techMarks[label]) throw new Error(`Falta el logo de ${label}`);
  }
  if (group.learning && !techMarks[group.learning]) {
    throw new Error(`Falta el logo de ${group.learning}`);
  }
}
