import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const failures = [];

function fail(message) {
  failures.push(message);
}

const index = await readFile(path.join(dist, "index.html"), "utf8");
const notFound = await readFile(path.join(dist, "404.html"), "utf8");
const css = await readFile(path.join(dist, "css/global.css"), "utf8");
const client = await readFile(path.join(dist, "js/site.js"), "utf8");
const components = await readFile(path.join(root, "src/styles/components.scss"), "utf8");
const layout = await readFile(path.join(root, "src/styles/layout.scss"), "utf8");
const base = await readFile(path.join(root, "src/styles/base.scss"), "utf8");

const pages = index + notFound + client;
const banned = [
  "cafacorp",
  "hhit",
  "pokegrid",
  "batabit",
  "calculadora",
  "contador",
  "proyectogoogle",
  "mobilefirst",
  "vue",
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
  "Ingeniero de Software Fullstack",
  "octavo básico",
  "Duoc UC",
  "NEXTFLOW",
  "Lorenzo",
  "https://nextflow.cl",
  "TODO-confirmar-url-de-ui-lab",
  "TODO-confirmar-url-de-biblioteca-ajedrez",
  "Tarjeta Vecino",
  "Casa Emprender",
  "Coraje",
  "Hospital San Juan de Dios",
  "Arcadius Entertainment",
  "Cofodep",
  "9 clics",
  "Pentaho",
  "Fase Cero",
  "SvelteKit",
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

for (const id of ["inicio", "historia", "experiencia", "proyectos", "tecnologias", "contacto"]) {
  if (!index.includes(`id="${id}"`)) fail(`Falta el ancla #${id}`);
}

const hrefs = [...index.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
const allowed = (href) =>
  href.startsWith("/#") ||
  href.startsWith("#") ||
  href === "/" ||
  href.startsWith("/cv/") ||
  href.startsWith("/css/") ||
  href.startsWith("/js/") ||
  href.startsWith("/img/") ||
  href.startsWith("/fonts/") ||
  href.startsWith("/favicon") ||
  href === "mailto:ma.hessalvarez@gmail.com" ||
  href === "https://www.linkedin.com/in/max-felipe-hess-alvarez-37414b1bb/" ||
  href === "https://github.com/maxhess22" ||
  href === "https://nextflow.cl";

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

if (!notFound.includes("Volver al inicio")) fail("La página 404 no vuelve al inicio");

if (failures.length) {
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log("Verificación de contenido correcta.");
