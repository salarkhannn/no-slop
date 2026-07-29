#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(scriptDir, '..');
const componentDir = path.join(
  skillDir,
  'assets',
  'component-kit',
  'react',
  'components',
  'ui',
);

function usage(exitCode = 0) {
  console.log(`Usage:
  node scripts/extract-component-variants.mjs [component ...] [--json]

Examples:
  node scripts/extract-component-variants.mjs button select
  node scripts/extract-component-variants.mjs --json

Reads the canonical source. It reports Tailwind Variants axes, allowed values, and
defaults without maintaining a second handwritten variant inventory.`);
  process.exit(exitCode);
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) usage();
const jsonOutput = args.includes('--json');
const requested = args.filter((arg) => !arg.startsWith('-'));

function skipTrivia(source, start) {
  let index = start;
  while (index < source.length) {
    if (/\s/.test(source[index])) {
      index += 1;
      continue;
    }
    if (source.startsWith('//', index)) {
      index = source.indexOf('\n', index + 2);
      if (index === -1) return source.length;
      continue;
    }
    if (source.startsWith('/*', index)) {
      index = source.indexOf('*/', index + 2);
      if (index === -1) return source.length;
      index += 2;
      continue;
    }
    break;
  }
  return index;
}

function scanString(source, start) {
  const quote = source[start];
  let index = start + 1;
  while (index < source.length) {
    if (source[index] === '\\') {
      index += 2;
      continue;
    }
    if (source[index] === quote) return index + 1;
    index += 1;
  }
  return source.length;
}

function matchingBrace(source, start) {
  const open = source[start];
  const close = { '{': '}', '[': ']', '(': ')' }[open];
  if (!close) throw new Error(`Expected an opening delimiter at ${start}`);
  let depth = 0;
  let index = start;
  while (index < source.length) {
    const char = source[index];
    if (char === "'" || char === '"' || char === '`') {
      index = scanString(source, index);
      continue;
    }
    if (source.startsWith('//', index)) {
      index = source.indexOf('\n', index + 2);
      if (index === -1) return source.length - 1;
      continue;
    }
    if (source.startsWith('/*', index)) {
      index = source.indexOf('*/', index + 2);
      if (index === -1) return source.length - 1;
      index += 2;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return index;
    }
    index += 1;
  }
  throw new Error(`Unclosed ${open} at ${start}`);
}

function readKey(source, start) {
  const index = skipTrivia(source, start);
  if (source[index] === "'" || source[index] === '"') {
    const end = scanString(source, index);
    return { key: source.slice(index + 1, end - 1), end };
  }
  const match = source.slice(index).match(/^[$A-Z_a-z][$\w-]*/);
  return match
    ? { key: match[0], end: index + match[0].length }
    : { key: null, end: index + 1 };
}

function objectEntries(source, objectStart) {
  const objectEnd = matchingBrace(source, objectStart);
  const entries = [];
  let index = objectStart + 1;

  while (index < objectEnd) {
    index = skipTrivia(source, index);
    if (source[index] === ',') {
      index += 1;
      continue;
    }
    const parsedKey = readKey(source, index);
    if (!parsedKey.key) {
      index = parsedKey.end;
      continue;
    }
    index = skipTrivia(source, parsedKey.end);
    if (source[index] !== ':') {
      index += 1;
      continue;
    }
    index = skipTrivia(source, index + 1);
    const valueStart = index;
    if ('{[('.includes(source[index])) {
      index = matchingBrace(source, index) + 1;
    } else if (source[index] === "'" || source[index] === '"' || source[index] === '`') {
      index = scanString(source, index);
    } else {
      while (index < objectEnd && source[index] !== ',' && source[index] !== '\n') {
        index += 1;
      }
    }
    entries.push({
      key: parsedKey.key,
      valueStart,
      valueEnd: index,
      raw: source.slice(valueStart, index).trim(),
    });
  }
  return entries;
}

function simpleValue(raw) {
  const quoted = raw.match(/^(['"])(.*?)\1$/s);
  if (quoted) return quoted[2];
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw === 'null') return null;
  if (/^-?\d+(?:\.\d+)?$/.test(raw)) return Number(raw);
  return raw;
}

function extractVariantSets(source) {
  const sets = [];
  const matcher = /\b(?:export\s+)?const\s+([A-Za-z_$][\w$]*Variants)\s*=\s*tv\s*\(/g;
  for (const match of source.matchAll(matcher)) {
    const tvStart = source.indexOf('{', match.index + match[0].length);
    if (tvStart === -1) continue;
    const rootEntries = objectEntries(source, tvStart);
    const variantsEntry = rootEntries.find((entry) => entry.key === 'variants');
    if (!variantsEntry || source[variantsEntry.valueStart] !== '{') continue;

    const axes = {};
    for (const axis of objectEntries(source, variantsEntry.valueStart)) {
      if (source[axis.valueStart] !== '{') continue;
      axes[axis.key] = objectEntries(source, axis.valueStart).map((option) => option.key);
    }

    const defaultsEntry = rootEntries.find((entry) => entry.key === 'defaultVariants');
    const defaults = {};
    if (defaultsEntry && source[defaultsEntry.valueStart] === '{') {
      for (const entry of objectEntries(source, defaultsEntry.valueStart)) {
        defaults[entry.key] = simpleValue(entry.raw);
      }
    }
    sets.push({ export: match[1], axes, defaults });
  }
  return sets;
}

const available = fs
  .readdirSync(componentDir)
  .filter((name) => name.endsWith('.tsx'))
  .map((name) => name.slice(0, -4))
  .sort();
const names = requested.length ? requested : available;
const result = {};

for (const name of names) {
  const sourcePath = path.join(componentDir, `${name}.tsx`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Unknown canonical component source: ${name}`);
    process.exitCode = 2;
    continue;
  }
  const sets = extractVariantSets(fs.readFileSync(sourcePath, 'utf8'));
  result[name] = sets;
}

if (jsonOutput) {
  console.log(JSON.stringify(result, null, 2));
} else {
  for (const [name, sets] of Object.entries(result)) {
    console.log(`\n${name}`);
    if (!sets.length) {
      console.log('  No Tailwind Variants axes declared; inspect exported props and primitives.');
      continue;
    }
    for (const set of sets) {
      console.log(`  ${set.export}`);
      for (const [axis, values] of Object.entries(set.axes)) {
        const defaultValue =
          Object.hasOwn(set.defaults, axis) ? `; default=${set.defaults[axis]}` : '';
        console.log(`    ${axis}: ${values.join(', ')}${defaultValue}`);
      }
    }
  }
}
