import { createRequire } from "node:module";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { jsonLd, site } from "../src/data/site.js";
import { englishHtml, english } from "../src/data/translations.js";
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

  const spanish = render("index.pug", {
    ...shared, locale: "es",
    title: `${site.name} · ${site.role}`,
    jsonLd: jsonLd(),
  });
  const index = englishHtml(render("index.pug", {
    ...shared, locale: "en",
    title: `${site.name} · ${site.role}`,
    jsonLd: jsonLd().replaceAll(site.role, english.get(site.role)),
  }));
  const notFound = englishHtml(render("404.pug", {
    ...shared, locale: "en",
    title: `Página no encontrada · ${site.name}`,
    description: "This page is not part of Max Hess’s portfolio.",
    jsonLd: "",
  }));
  await mkdir(path.join(dist, "es"), { recursive: true });
  await writeFile(path.join(dist, "index.html"), index);
  await writeFile(path.join(dist, "es/index.html"), spanish);
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
