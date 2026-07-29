#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kitRoot = join(skillRoot, "assets", "component-kit");
const manifestPath = join(kitRoot, "manifest.json");
const dependenciesPath = join(kitRoot, "dependencies.json");
const errors = [];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    errors.push(`${path}: ${error.message}`);
    return {};
  }
}

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

const manifest = readJson(manifestPath);
const dependencies = readJson(dependenciesPath);
const componentRoot = join(kitRoot, manifest.roots?.components ?? "");
const hookRoot = join(kitRoot, manifest.roots?.hooks ?? "");
const utilsRoot = join(kitRoot, manifest.roots?.utils ?? "");
const publicComponents = Object.values(manifest.publicCatalog ?? {}).flat();

if (!existsSync(join(kitRoot, manifest.tokenFile ?? ""))) {
  errors.push(`Missing token file: ${manifest.tokenFile}`);
}

for (const names of Object.values(manifest.categories ?? {})) {
  for (const name of names) {
    if (!resolveSource(join(componentRoot, name))) errors.push(`Missing component: ${name}`);
  }
}
if (publicComponents.length !== 49) {
  errors.push(`Expected 49 public components, found ${publicComponents.length}`);
}
if (new Set(publicComponents).size !== publicComponents.length) {
  errors.push("Public component catalog contains duplicate slugs");
}
for (const name of publicComponents) {
  const sourceName = manifest.aliases?.[name] ?? name;
  if (!resolveSource(join(componentRoot, sourceName))) {
    errors.push(`Missing public component source: ${name} -> ${sourceName}`);
  }
}
for (const name of manifest.hooks ?? []) {
  if (!resolveSource(join(hookRoot, name))) errors.push(`Missing hook: ${name}`);
}
for (const name of manifest.utils ?? []) {
  if (!resolveSource(join(utilsRoot, name))) errors.push(`Missing utility: ${name}`);
}

const sourceRoots = [componentRoot, hookRoot, utilsRoot];
const sourceFiles = sourceRoots.flatMap((directory) =>
  existsSync(directory)
    ? readdirSync(directory)
        .map((name) => join(directory, name))
        .filter((path) => statSync(path).isFile() && [".ts", ".tsx"].includes(extname(path)))
    : [],
);
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;
const externalImports = new Set();

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    if (specifier.startsWith("@/components/ui/")) {
      const target = resolveSource(join(componentRoot, specifier.split("/").at(-1)));
      if (!target) errors.push(`${file}: unresolved ${specifier}`);
    } else if (specifier.startsWith("@/hooks/")) {
      const target = resolveSource(join(hookRoot, specifier.split("/").at(-1)));
      if (!target) errors.push(`${file}: unresolved ${specifier}`);
    } else if (specifier.startsWith("@/utils/")) {
      const target = resolveSource(join(utilsRoot, specifier.split("/").at(-1)));
      if (!target) errors.push(`${file}: unresolved ${specifier}`);
    } else if (specifier.startsWith(".")) {
      if (!resolveSource(resolve(dirname(file), specifier))) {
        errors.push(`${file}: unresolved ${specifier}`);
      }
    } else if (!specifier.startsWith("node:")) {
      externalImports.add(externalRoot(specifier));
    }
  }
}

const declared = new Set(dependencies.runtime ?? []);
for (const specifier of externalImports) {
  if (!declared.has(specifier)) errors.push(`Undeclared external dependency: ${specifier}`);
}

if (errors.length) {
  console.error("Component-kit verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      components: Object.values(manifest.categories ?? {}).flat().length,
      publicComponents: publicComponents.length,
      hooks: manifest.hooks?.length ?? 0,
      utils: manifest.utils?.length ?? 0,
      sourceFiles: sourceFiles.length,
      externalDependencies: [...externalImports].sort(),
      tokenFile: manifest.tokenFile,
    },
    null,
    2,
  ),
);
