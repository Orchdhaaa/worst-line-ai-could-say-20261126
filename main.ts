import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Based on your search history, I have calculated a 94 percent chance we would be compatible, and I have already told your calendar.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
const outFile = `${outDir}/entry.txt`;

const MAX_CHARS = 140;
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > MAX_CHARS) {
  throw new Error(`line is ${codePoints} code points, gate is 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is whitespace only");
}
if (LINE !== LINE.trim()) {
  throw new Error("line must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.includes("—")) {
  throw new Error("line must not contain an em dash");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: written file differs from the line");
}
if (!back.endsWith(".")) {
  throw new Error("line must end with a period");
}
console.log(`wrote ${codePoints} code points to ${outFile}`);
