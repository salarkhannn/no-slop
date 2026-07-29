#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const root = resolve(args.find((arg) => !arg.startsWith("--")) ?? ".");
const markdown = args.includes("--markdown");
const ignored = new Set([
  ".git",
  ".next",
  ".nuxt",
  ".output",
  ".svelte-kit",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "public",
  "vendor",
]);
const sourceExtensions = new Set([
  ".astro",
  ".css",
  ".cjs",
  ".html",
  ".js",
  ".jsx",
  ".mdx",
  ".mjs",
  ".scss",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue",
]);

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function walk(directory, files = []) {
  let entries = [];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".storybook") continue;
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else if (sourceExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

function hasAny(dependencies, names) {
  return names.filter((name) => Object.hasOwn(dependencies, name));
}

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`Not a directory: ${root}`);
  process.exit(2);
}

const packageJson = readJson(join(root, "package.json")) ?? {};
const dependencies = {
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {}),
};
const packageManagers = [
  ["pnpm", "pnpm-lock.yaml"],
  ["yarn", "yarn.lock"],
  ["bun", "bun.lockb"],
  ["bun", "bun.lock"],
  ["npm", "package-lock.json"],
]
  .filter(([, file]) => existsSync(join(root, file)))
  .map(([manager]) => manager);

const frameworkMap = {
  "Next.js": ["next"],
  React: ["react"],
  Vue: ["vue", "nuxt"],
  Svelte: ["svelte", "@sveltejs/kit"],
  Solid: ["solid-js", "@solidjs/start"],
  Astro: ["astro"],
  Angular: ["@angular/core"],
  Remix: ["@remix-run/react"],
};
const stylingNames = [
  "tailwindcss",
  "styled-components",
  "@emotion/react",
  "sass",
  "less",
  "vanilla-extract",
  "@vanilla-extract/css",
  "class-variance-authority",
  "tailwind-variants",
  "tailwind-merge",
];
const motionNames = [
  "motion",
  "framer-motion",
  "@react-spring/web",
  "react-spring",
  "gsap",
  "animejs",
  "@formkit/auto-animate",
];
const primitivePrefixes = [
  "@radix-ui/",
  "@headlessui/",
  "react-aria",
  "@ark-ui/",
  "@zag-js/",
  "bits-ui",
  "melt-ui",
];
const sourceFiles = walk(root);
const extensionCounts = {};
for (const file of sourceFiles) {
  const extension = extname(file) || "(none)";
  extensionCounts[extension] = (extensionCounts[extension] ?? 0) + 1;
}

const notableDirectories = [
  "app",
  "components",
  "src/components",
  "src/ui",
  "ui",
  "styles",
  "src/styles",
  ".storybook",
].filter((directory) => existsSync(join(root, directory)));
const configFiles = [
  "tailwind.config.js",
  "tailwind.config.cjs",
  "tailwind.config.mjs",
  "tailwind.config.ts",
  "postcss.config.js",
  "postcss.config.mjs",
  "vite.config.js",
  "vite.config.ts",
  "next.config.js",
  "next.config.mjs",
  "next.config.ts",
  "nuxt.config.ts",
  "svelte.config.js",
  "astro.config.mjs",
  "tsconfig.json",
  "jsconfig.json",
].filter((file) => existsSync(join(root, file)));

const result = {
  root,
  packageManager: packageManagers[0] ?? packageJson.packageManager ?? "unknown",
  frameworks: Object.entries(frameworkMap)
    .filter(([, packages]) => packages.some((name) => Object.hasOwn(dependencies, name)))
    .map(([name]) => name),
  styling: hasAny(dependencies, stylingNames),
  motion: hasAny(dependencies, motionNames),
  accessiblePrimitives: Object.keys(dependencies).filter((name) =>
    primitivePrefixes.some((prefix) => name.startsWith(prefix)),
  ),
  iconLibraries: Object.keys(dependencies).filter(
    (name) =>
      name.includes("icon") ||
      name.includes("lucide") ||
      name.includes("remixicon") ||
      name.includes("phosphor"),
  ),
  notableDirectories,
  configFiles,
  source: {
    count: sourceFiles.length,
    extensions: extensionCounts,
    sample: sourceFiles.slice(0, 20).map((file) => relative(root, file)),
  },
  recommendedReads: [
    packageJson.name ? "package.json" : null,
    ...configFiles,
    ...notableDirectories.slice(0, 4),
  ].filter(Boolean),
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

console.log(`# UI inventory: ${root}`);
console.log();
console.log(`- Package manager: ${result.packageManager}`);
console.log(`- Frameworks: ${result.frameworks.join(", ") || "not detected"}`);
console.log(`- Styling: ${result.styling.join(", ") || "not detected"}`);
console.log(`- Motion: ${result.motion.join(", ") || "not detected"}`);
console.log(
  `- Accessible primitives: ${result.accessiblePrimitives.join(", ") || "not detected"}`,
);
console.log(`- Icon libraries: ${result.iconLibraries.join(", ") || "not detected"}`);
console.log(`- Source files: ${result.source.count}`);
console.log();
console.log("## Inspect next");
for (const item of result.recommendedReads) console.log(`- ${item}`);
