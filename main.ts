import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One-line forecast for a city that does not exist.
// Gate: /output/entry.txt must hold UTF-8 text of 1 to 140 characters,
// a single line, not only white space, no trailing newline.
const ENTRY =
  "In Crumbletown, light rain, heavy gossip, and a 40% chance the 8:15 actually stops; bring an umbrella and a good excuse.";

const MAX_CHARS = 140;

function validate(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with white space");
  }
  if (!line.includes("Crumbletown")) {
    throw new Error("entry must name the invented city");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${outPath}`);
