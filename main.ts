// Spotlight @crisxai5 — main.ts
// Copies POST.json (the X post's address) from the repository root to /output.
// That is all this program has to do: the house reads the post itself.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const postPath = join(repoRoot, "POST.json");

// Validate POST.json before copying: it must be JSON with a url string.
const post = JSON.parse(readFileSync(postPath, "utf8"));
if (typeof post.url !== "string" || !post.url.startsWith("https://")) {
  throw new Error("POST.json must contain a https url string");
}
mkdirSync("/output", { recursive: true });
copyFileSync(postPath, "/output/POST.json");
console.log(`POST.json copied to /output/POST.json (url: ${post.url})`);
