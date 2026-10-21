// Usage: npm run add-log -- <file> [dest-subfolder]
// Gzips a log into logs/<dest>/<name>.gz so it fits under GitHub's 100 MB per-file push limit.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [src, dest = ""] = process.argv.slice(2);
if (!src) {
  console.error("Usage: npm run add-log -- <file> [dest-subfolder]   (e.g. 2026/champs)");
  process.exit(1);
}
if (!fs.existsSync(src)) { console.error(`Not found: ${src}`); process.exit(1); }
const name = path.basename(src);
if (name.toLowerCase().endsWith(".gz")) { console.error("Already gzipped; just copy it into logs/."); process.exit(1); }
const logsDir = path.join(root, "logs");
const outDir = path.resolve(logsDir, dest);
if (outDir !== logsDir && !outDir.startsWith(logsDir + path.sep)) { console.error("Destination must be inside logs/"); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, name + ".gz");
const raw = fs.readFileSync(src);
const gz = zlib.gzipSync(raw, { level: 9 });
fs.writeFileSync(out, gz);
const mb = (n) => (n / 1048576).toFixed(2) + " MB";
console.log(`${name}: ${mb(raw.length)} -> ${mb(gz.length)} (${((gz.length / raw.length) * 100).toFixed(0)}%)`);
console.log(`Wrote ${path.relative(root, out)}`);
if (gz.length > 95 * 1048576) console.warn("WARNING: still over 95 MB; GitHub will reject files over 100 MB. Trim or split the log.");
