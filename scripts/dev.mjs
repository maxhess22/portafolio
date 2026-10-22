import { spawn } from "node:child_process";
import { createReadStream, existsSync, statSync, watch } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const preview = process.argv.includes("--preview");
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function runBuild() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(root, "scripts/build.mjs")], {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, NODE_ENV: preview ? "production" : "development" },
    });
    child.on("exit", (code) => resolve(code ?? 1));
  });
}

function resolveFile(urlPath) {
  let pathname = "/";
  try {
    pathname = decodeURIComponent(new URL(urlPath, "http://localhost").pathname);
  } catch {
    return null;
  }

  const relative = pathname.replace(/^\/+/, "");
  const resolved = path.resolve(dist, relative);
  const rootWithSep = dist.endsWith(path.sep) ? dist : dist + path.sep;
  if (resolved !== dist && !resolved.startsWith(rootWithSep)) return null;

  const candidates = [resolved];
  if (!path.extname(resolved)) {
    candidates.push(path.join(resolved, "index.html"));
    candidates.push(`${resolved}.html`);
  }

  for (const candidate of candidates) {
    if (candidate !== dist && !candidate.startsWith(rootWithSep)) continue;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function startServer() {
  const server = createServer((request, response) => {
    const file = resolveFile(request.url || "/");
    if (!file) {
      const notFound = path.join(dist, "404.html");
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      if (existsSync(notFound)) {
        createReadStream(notFound).pipe(response);
      } else {
        response.end("No encontrado");
      }
      return;
    }

    const type = types[path.extname(file)] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
    createReadStream(file).pipe(response);
  });

  server.listen(port, "127.0.0.1", () => {
    const mode = preview ? "preview" : "dev";
    console.log(`Servidor ${mode} en http://localhost:${port}`);
  });

  return server;
}

const code = await runBuild();
if (code !== 0) process.exit(code);

startServer();

if (!preview) {
  let timer;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      runBuild();
    }, 120);
  };
  watch(path.join(root, "src"), { recursive: true }, schedule);
  watch(path.join(root, "public"), { recursive: true }, schedule);
}
