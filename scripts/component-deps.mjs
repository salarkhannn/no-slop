#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const names = args.filter((arg) => !arg.startsWith("--"));
const markdown = args.includes("--markdown");
const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kitRoot = join(skillRoot, "assets", "component-kit");
const manifest = JSON.parse(readFileSync(join(kitRoot, "manifest.json"), "utf8"));
const dependencyContract = JSON.parse(
  readFileSync(join(kitRoot, "dependencies.json"), "utf8"),
);
const roots = {
  components: join(kitRoot, manifest.roots.components),
  hooks: join(kitRoot, manifest.roots.hooks),
  utils: join(kitRoot, manifest.roots.utils),
};
const resolvedNames = names.map((name) => manifest.aliases?.[name] ?? name);

function resolveSource(path) {
  const candidates = [
    path,
    `${path}.ts`,
    `${path}.tsx`,
    `${path}.js`,
    `${path}.jsx`,
    join(path, "index.ts"),
    join(path, "index.tsx"),
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

function externalRoot(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

function localImport(fromFile, specifier) {
  if (specifier.startsWith("@/components/ui/")) {
    return resolveSource(join(roots.components, specifier.split("/").at(-1)));
  }
  if (specifier.startsWith("@/hooks/")) {
    return resolveSource(join(roots.hooks, specifier.split("/").at(-1)));
  }
  if (specifier.startsWith("@/utils/")) {
    return resolveSource(join(roots.utils, specifier.split("/").at(-1)));
  }
  if (specifier.startsWith(".")) {
    return resolveSource(resolve(dirname(fromFile), specifier));
  }
  return null;
}

if (!names.length) {
  console.error("Usage: node scripts/component-deps.mjs <component...> [--markdown]");
  process.exit(2);
}

const queue = [];
const errors = [];
for (const name of resolvedNames) {
  const path = resolveSource(join(roots.components, name));
  if (path) queue.push(path);
  else errors.push(`Unknown component: ${name}`);
}

const files = new Set();
const packages = new Set();
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;

while (queue.length) {
  const file = queue.shift();
  if (!file || files.has(file)) continue;
  files.add(file);
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    const local = localImport(file, specifier);
    if (local) {
      queue.push(local);
    } else if (
      specifier.startsWith(".") ||
      specifier.startsWith("@/components/") ||
      specifier.startsWith("@/hooks/") ||
      specifier.startsWith("@/utils/")
    ) {
      errors.push(`${relative(skillRoot, file)}: unresolved ${specifier}`);
    } else if (!specifier.startsWith("node:")) {
      packages.add(externalRoot(specifier));
    }
  }
}

const result = {
  requestedComponents: names,
  components: resolvedNames,
  files: [...files].map((file) => relative(skillRoot, file)).sort(),
  packages: [...packages].sort(),
  testedBaseline: Object.fromEntries(
    [...packages]
      .sort()
      .filter((name) => dependencyContract.testedBaseline?.[name])
      .map((name) => [name, dependencyContract.testedBaseline[name]]),
  ),
  tokenFile: relative(skillRoot, join(kitRoot, manifest.tokenFile)),
  errors,
};

if (errors.length) process.exitCode = 1;

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`# Component dependency plan: ${names.join(", ")}`);
  console.log();
  console.log("## Copy");
  for (const file of result.files) console.log(`- ${file}`);
  console.log();
  console.log("## Install if not already present");
  for (const packageName of result.packages) {
    const baseline = result.testedBaseline[packageName];
    console.log(`- ${packageName}${baseline ? ` (tested baseline ${baseline})` : ""}`);
  }
  console.log();
  console.log(`## Theme`);
  console.log(`- ${result.tokenFile}`);
  if (errors.length) {
    console.log();
    console.log("## Errors");
    for (const error of errors) console.log(`- ${error}`);
  }
}
