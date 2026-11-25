// One-Liner Laugh Lab — entry program.
// Node 22, stdlib only. Writes one funny line — the excuse a robot vacuum
// gives after eating a sock — to /output/entry.txt (sandbox) or ./output
// when /output is not writable (local dev run).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "In my defense, the sock was on the floor — and my job description literally says 'eat whatever's on the floor'.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, exactly one line. Fail closed if it is not.
// The file is written with no trailing newline, so its character count
// is exactly the line's character count.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line is ${chars} characters, gate needs 1-200`);
}
if (!LINE.trim()) throw new Error("line is blank");
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
let target = join(outDir, "entry.txt");
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(target, LINE, "utf8");
} catch {
  mkdirSync("output", { recursive: true });
  target = join("output", "entry.txt");
  writeFileSync(target, LINE, "utf8");
}
console.log(`wrote ${chars} characters to ${target}`);
