import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(repoRoot, "dist");

fs.rmSync(outputDirectory, { recursive: true, force: true });
console.log(`Removed generated build output: ${path.relative(repoRoot, outputDirectory)}`);
