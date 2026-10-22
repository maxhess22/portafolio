import { createRequire } from "node:module";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { jsonLd, site } from "../src/data/site.js";
import { techMarks } from "../src/data/tech-icons.js";

const require = createRequire(import.meta.url);
const pug = require("pug");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

function render(template, locals) {
  return pug.renderFile(path.join(root, "src", template), locals);
}

export async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, "css"), { recursive: true });
  await mkdir(path.join(dist, "js"), { recursive: true });

  await cp(path.join(root, "public"), dist, { recursive: true });

  const compiled = sass.compile(path.join(root, "src/styles/global.scss"), {
    style: process.env.NODE_ENV === "development" ? "expanded" : "compressed",
    loadPaths: [path.join(root, "src/styles")],
  });
  await writeFile(path.join(dist, "css/global.css"), compiled.css);
  await cp(path.join(root, "src/js/site.js"), path.join(dist, "js/site.js"));

  const year = new Date().getFullYear();
  const shared = {
    ...site,
    year,
    techMarks,
    description: site.description,
  };

  const index = render("index.pug", {
    ...shared,
    title: `${site.name} · ${site.role}`,
    jsonLd: jsonLd(),
  });
  const notFound = render("404.pug", {
    ...shared,
    title: `Página no encontrada · ${site.name}`,
    description: "Esa página no está en el portafolio de Max Hess.",
    jsonLd: "",
  });

  await writeFile(path.join(dist, "index.html"), index);
  await writeFile(path.join(dist, "404.html"), notFound);
  return dist;
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  build()
    .then((output) => {
      console.log(`Sitio construido en ${output}`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
