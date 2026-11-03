import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.js";
import { techMarks } from "../src/data/tech-icons.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const failures = [];

function fail(message) {
  failures.push(message);
}

const englishIndex = await readFile(path.join(dist, "index.html"), "utf8");
const index = await readFile(path.join(dist, "es/index.html"), "utf8");
const notFound = await readFile(path.join(dist, "404.html"), "utf8");
const css = await readFile(path.join(dist, "css/global.css"), "utf8");
const client = await readFile(path.join(dist, "js/site.js"), "utf8");
const components = await readFile(path.join(root, "src/styles/components.scss"), "utf8");
const layout = await readFile(path.join(root, "src/styles/layout.scss"), "utf8");
const base = await readFile(path.join(root, "src/styles/base.scss"), "utf8");

const pages = index + englishIndex + notFound + client;
const banned = [
  "cafacorp",
  "hhit",
  "pokegrid",
  "batabit",
  "calculadora",
  "contador",
  "proyectogoogle",
  "mobilefirst",
  "7341",
  "+56",
  "tel:",
];

for (const term of banned) {
  if (pages.toLowerCase().includes(term) || css.toLowerCase().includes(term)) {
    fail(`Quedó una referencia prohibida: ${term}`);
  }
}

const required = [
  "Max Hess",
  "max.jpg",
  "Ingeniero de Software Fullstack",
  "optimizar procesos",
  "Soy autodidacta",
  "mi principal pasatiempo es el ajedrez",
  "NEXTFLOW",
  "Lorenzo",
  "https://nextflow.cl",
  "https://tecuidoapp.fomentolf.cl/",
  "https://biblioteca-ajedrez-mh.web.app/",
  "TeCuidoApp",
  "Tarjeta Vecino",
  "Casa Emprender",
  "Coraje",
  "Hospital San Juan de Dios",
  "Arcadius Entertainment",
  "Cofodep",
  "9 clics",
  "Pentaho",
  "SvelteKit",
  "Vue",
  "WordPress",
  "chip__logo",
  "ma.hessalvarez@gmail.com",
  "https://www.linkedin.com/in/max-felipe-hess-alvarez-37414b1bb/",
  "https://github.com/maxhess22",
  "Sin enlace público",
  "Producto propio",
  'lang="es-CL"',
  "/cv/CV_Max_Hess_Fullstack.pdf",
];

for (const term of required) {
  if (!index.includes(term)) fail(`Falta en el inicio: ${term}`);
}

for (const term of ['data-profile-explorer', 'data-profile-path', 'id="tab-perfil"', 'id="tab-sobre-mi"', 'id="tab-experiencia"', 'id="panel-perfil"', 'id="sobre-mi"', 'id="experiencia"']) {
  if (!index.includes(term)) fail(`Falta una parte del explorador de perfil: ${term}`);
}
if (!client.includes("selectEditorTab")) fail("Las pestañas del editor no tienen interacción");
for (const term of ["frontend.ts", "backend.go", "deploy.yml", "data-tech-tab"]) {
  if (!index.includes(term)) fail(`Falta una parte de las pestañas de tecnologías: ${term}`);
}
if (!client.includes("selectTechTab")) fail("Las pestañas de tecnologías no tienen interacción");

for (const term of ["UI Lab", "Fase Cero", "TODO-confirmar-url-de-ui-lab", "2020–2023"]) {
  if (index.includes(term)) fail(`Quedó una referencia retirada: ${term}`);
}

for (const id of ["inicio", "sobre-mi", "experiencia", "proyectos", "tecnologias", "contacto"]) {
  if (!index.includes(`id="${id}"`)) fail(`Falta el ancla #${id}`);
}

const hrefs = [...index.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
const allowed = (href) =>
  href.startsWith("/#") ||
  href.startsWith("#") ||
  href === "/" ||
  href === "/es/" ||
  href.startsWith("/cv/") ||
  href.startsWith("/css/") ||
  href.startsWith("/js/") ||
  href.startsWith("/img/") ||
  href.startsWith("/fonts/") ||
  href.startsWith("/favicon") ||
  href === "mailto:ma.hessalvarez@gmail.com" ||
  href === "https://www.linkedin.com/in/max-felipe-hess-alvarez-37414b1bb/" ||
  href === "https://github.com/maxhess22" ||
  href === "https://nextflow.cl" ||
  href === "https://tecuidoapp.fomentolf.cl/" ||
  href === "https://biblioteca-ajedrez-mh.web.app/";

for (const href of hrefs) {
  if (!allowed(href)) fail(`Enlace no permitido: ${href}`);
  if (href.toLowerCase().includes("todo")) fail(`El placeholder TODO no debe ser un enlace: ${href}`);
}

for (const color of ["#172c3f", "#0a151f", "#4f6378", "#eae4d8"]) {
  if (!css.toLowerCase().includes(color)) fail(`Falta un color de la paleta: ${color}`);
}
if (css.toLowerCase().includes("#20b2aa")) fail("Volvió el acento turquesa");
if (index.includes("data-theme-toggle") || css.includes("Fraunces")) {
  fail("Quedó el tema claro o la tipografía del rediseño anterior");
}

if (/#[0-9a-fA-F]{3,8}\b/.test(components + layout)) {
  fail("Hay un color suelto fuera de los tokens");
}

if (base.includes("#[0-9a-fA-F]")) {
  // Las fuentes y el reset no declaran color. Un hex aquí es un estilo suelto.
  fail("base.scss tiene un color suelto");
}

for (const file of [
  "img/perfil.jpg",
  "favicon.ico",
  "favicon.svg",
  "cv/CV_Max_Hess_Fullstack.pdf",
  "robots.txt",
]) {
  try {
    await readFile(path.join(dist, file));
  } catch {
    fail(`Falta el archivo público ${file}`);
  }
}

if (!notFound.includes("Back to home")) fail("La página 404 no vuelve al inicio");

const logoCount = (index.match(/class="chip__logo"/g) || []).length;
const primaryTechItems = site.technologies.flatMap((group) => group.primary);
const secondaryTechItems = site.technologies.flatMap((group) => group.secondary);
const techItems = [...primaryTechItems, ...secondaryTechItems];
const projectItems = [site.featured, site.municipal, ...site.projects].flatMap((project) => project.stack);
const expectedLogos = [...primaryTechItems, ...projectItems].filter((item) => {
  const label = typeof item === "string" ? item : item.label;
  return techMarks[label]?.html;
}).length;
if (logoCount !== expectedLogos) fail(`Faltan logos en los chips (${logoCount} de ${expectedLogos})`);
for (const item of techItems) {
  const label = typeof item === "string" ? item : item.label;
  if (!index.includes(`>${label}<`)) fail(`Falta una tecnología visible: ${label}`);
}
if (/cdn\.simpleicons|cdn\.jsdelivr\.net|unpkg\.com|cdn\.jsdelivr/i.test(index)) {
  fail("Los logos no pueden salir de un CDN");
}

if (!englishIndex.includes('lang="en"') || !englishIndex.includes("Fullstack Software Engineer")) fail("Falta el inglés por defecto");
for (const marker of ["data-language", "data-terminal-input", "data-nano", "skills/frontend.ts", "skills/backend.go", "skills/deploy.yml", "contact.md"]) {
  if (!index.includes(marker) || !englishIndex.includes(marker)) fail(`Falta la interfaz bilingüe: ${marker}`);
}
if (failures.length) {
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log("Verificación de contenido correcta.");
