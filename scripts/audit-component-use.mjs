#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const root = resolve(args.find((arg) => !arg.startsWith("--")) ?? ".");
const json = args.includes("--json");
const ignored = new Set([
  ".git", ".next", ".nuxt", ".output", ".svelte-kit", "assets", "build",
  "coverage", "dist", "node_modules", "public", "vendor",
]);
const extensions = new Set([".astro", ".html", ".js", ".jsx", ".mdx", ".svelte", ".ts", ".tsx", ".vue"]);

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`Not a directory: ${root}`);
  process.exit(2);
}

function walk(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || ignored.has(entry.name)) continue;
    const target = join(directory, entry.name);
    if (entry.isDirectory()) walk(target, files);
    else if (extensions.has(extname(entry.name))) files.push(target);
  }
  return files;
}

function location(source, index) {
  const before = source.slice(0, index);
  const line = before.split("\n").length;
  return { line, excerpt: (source.split("\n")[line - 1] ?? "").trim().slice(0, 180) };
}

const rules = [
  {
    id: "native-button-candidate",
    pattern: /<button\b/gi,
    message: "A native button may be a hand-written substitute for a repository or canonical Button.",
    check: "Confirm it is a deliberate low-level primitive; otherwise select Button, Compact Button, or Fancy Button and an explicit variant.",
  },
  {
    id: "button-like-link-candidate",
    pattern: /<a\b[^>]*(?:class(?:Name)?\s*=\s*["'`][^"'`]*(?:button|btn|primary-link|cta|action|px-|rounded-|bg-))/gi,
    message: "A styled link may be a hand-written substitute for Link Button or Fancy Button.",
    check: "Preserve link semantics, then compare the repository Link Button, canonical Link Button, and rare marketing Fancy Button.",
  },
  {
    id: "styled-action-wrapper-candidate",
    pattern: /<[A-Z][A-Za-z0-9.]*\b[^>]*className\s*=\s*["'`][^"'`]*(?:primary-link|cta|button|btn|action)[^"'`]*["'`]/g,
    message: "A styled custom wrapper may be bypassing an explicit component and variant choice.",
    check: "Inspect the rendered semantic element and compare the sound host primitive, Link Button or Button, and Fancy Button when this is a rare principal marketing action.",
  },
  {
    id: "native-select-candidate",
    pattern: /<select\b/gi,
    message: "A native select may bypass an available Select variant.",
    check: "Confirm native styling is intentional; otherwise choose default, compact, compactForInput, or inline from context.",
  },
  {
    id: "handwritten-dialog-candidate",
    pattern: /<(?:div|section)\b[^>]*(?:role\s*=\s*["']dialog["']|aria-modal\s*=\s*["']true["'])/gi,
    message: "A dialog-like container may bypass the Modal or Drawer behavior contract.",
    check: "Verify focus, dismissal, return focus, collision, and responsive behavior against the suitable primitive.",
  },
  {
    id: "default-button-variant-candidate",
    pattern: /<Button\b(?![^>]*\b(?:variant|mode|asChild|intent)\s*=)/g,
    message: "Button is used without an explicit hierarchy variant.",
    check: "Record why the source default matches importance, frequency, risk, density, and local action hierarchy.",
  },
  {
    id: "default-select-variant-candidate",
    pattern: /<Select\b(?![^>]*\bvariant\s*=)/g,
    message: "Select is used without an explicit density/context variant.",
    check: "Record why default is preferable to compact, compactForInput, or inline.",
  },
  {
    id: "static-table-candidate",
    pattern: /<(?:table|DataTable)\b/gi,
    message: "A table was detected; source alone cannot prove a complete interaction model.",
    check: "Verify comparison columns, sorting/filtering, selection, row and bulk actions, overflow, and narrow-screen behavior.",
  },
];

const findings = [];
for (const file of walk(root)) {
  const source = readFileSync(file, "utf8");
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    for (const match of source.matchAll(rule.pattern)) {
      findings.push({
        id: rule.id,
        file: relative(root, file),
        ...location(source, match.index ?? 0),
        message: rule.message,
        check: rule.check,
      });
    }
  }
}

const report = {
  root,
  candidates: findings.length,
  note: "These are static review prompts, not defects. Confirm host primitives, imports, rendered context, and behavior.",
  findings,
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`# Component-use audit candidates: ${root}\n`);
  console.log(`${findings.length} prompts. Confirm each in source and rendered context.\n`);
  for (const finding of findings) {
    console.log(`- \`${finding.file}:${finding.line}\` — ${finding.message}`);
    console.log(`  - Evidence: \`${finding.excerpt}\``);
    console.log(`  - Check: ${finding.check}`);
  }
}
