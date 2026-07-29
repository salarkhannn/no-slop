#!/usr/bin/env node

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const defaultsPath = resolve(scriptDirectory, "../assets/spatial-rules.json");
const defaults = JSON.parse(readFileSync(defaultsPath, "utf8"));
const args = process.argv.slice(2);
const root = resolve(args.find((argument) => !argument.startsWith("--")) ?? ".");
const json = args.includes("--json");
const includeCanonical = args.includes("--include-canonical");
const maxArgument = args.find((argument) => argument.startsWith("--max="));
const scaleArgument = args.find((argument) => argument.startsWith("--scale="));
const maxFindings = Math.max(
  1,
  Number.parseInt(maxArgument?.split("=")[1] ?? "200", 10) || 200,
);
const scalePx = (
  scaleArgument
    ? scaleArgument
        .split("=")[1]
        .split(",")
        .map(Number)
        .filter(Number.isFinite)
    : defaults.fallbackScalePx
).sort((a, b) => a - b);

const ignoredDirectories = new Set(defaults.audit.ignoredDirectories);
const protectedPathSegments = new Set(defaults.audit.protectedPathSegments);
const extensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".less",
  ".mdx",
  ".mjs",
  ".pcss",
  ".sass",
  ".scss",
  ".svelte",
  ".ts",
  ".tsx",
  ".vue",
]);
const styleExtensions = new Set([
  ".astro",
  ".css",
  ".html",
  ".less",
  ".pcss",
  ".sass",
  ".scss",
  ".svelte",
  ".vue",
]);
const spacingProperty =
  String.raw`(?:padding|margin)(?:-(?:top|right|bottom|left|block(?:-(?:start|end))?|inline(?:-(?:start|end))?))?|gap|row-gap|column-gap`;
const cssDeclarationPattern = new RegExp(
  String.raw`\b(${spacingProperty})\s*:\s*([^;}\n]+)`,
  "gi",
);
const objectDeclarationPattern = new RegExp(
  String.raw`\b(${spacingProperty})\s*:\s*["'\x60]([^"'\x60]+)["'\x60]`,
  "gi",
);
const arbitraryUtilityPattern =
  /\b((?:m[trblxyse]?|p[trblxyse]?|gap(?:-[xy])?|space-[xy])-\[(-?\d+(?:\.\d+)?)(px|rem|em)\])/g;
const numericLengthPattern = /(-?\d*\.?\d+)\s*(px|rem|em)\b/gi;
const cssRulePattern = /([^{}]+)\{([^{}]*)\}/g;

function hasProtectedSegment(path) {
  if (includeCanonical) return false;
  return path
    .split(sep)
    .some((segment) => protectedPathSegments.has(segment.toLowerCase()));
}

function walk(directory, files = [], skipped = []) {
  let entries = [];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return { files, skipped };
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".storybook") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        skipped.push({ path, reason: "ignored-directory" });
        continue;
      }
      if (hasProtectedSegment(path)) {
        skipped.push({ path, reason: "protected-source" });
        continue;
      }
      walk(path, files, skipped);
      continue;
    }
    if (!extensions.has(extname(entry.name))) continue;
    if (/\.min\.[^.]+$/i.test(entry.name) || /\.map$/i.test(entry.name)) {
      skipped.push({ path, reason: "generated-or-minified" });
      continue;
    }
    files.push(path);
  }
  return { files, skipped };
}

function looksMinified(source) {
  const lines = source.split("\n");
  const longest = lines.reduce((maximum, line) => Math.max(maximum, line.length), 0);
  return longest > 20_000 || (lines.length < 8 && source.length > 50_000);
}

function lineAndExcerpt(source, index) {
  const before = source.slice(0, index);
  const line = before.split("\n").length;
  return {
    line,
    excerpt: source.split("\n")[line - 1]?.trim().slice(0, 200) ?? "",
  };
}

function hasException(source, start, body = "") {
  const nearby = source.slice(Math.max(0, start - 240), start + 80);
  return /spatial-exception\s*:/i.test(`${nearby}\n${body}`);
}

function extractLengths(value) {
  numericLengthPattern.lastIndex = 0;
  return [...value.matchAll(numericLengthPattern)].map((match) => ({
    value: Number(match[1]),
    unit: match[2].toLowerCase(),
    raw: match[0],
  }));
}

function isOnScale(value) {
  return scalePx.some((allowed) => Math.abs(Math.abs(value) - allowed) < 0.01);
}

function selectorHasTerm(selector, terms) {
  const normalized = selector.toLowerCase();
  return terms.some((term) =>
    new RegExp(String.raw`(?:^|[-_.#\s])${term}(?:$|[-_:\s.#\[])`).test(normalized),
  );
}

function expandBoxValues(value) {
  if (/var\(|calc\(|clamp\(|min\(|max\(|env\(/i.test(value)) return null;
  const tokens = value.trim().split(/\s+/);
  if (tokens.length < 2 || tokens.length > 4) return null;
  if (!tokens.every((token) => /^-?\d*\.?\d+(?:px|rem|em)$/.test(token))) return null;
  if (tokens.length === 2) return [tokens[0], tokens[1], tokens[0], tokens[1]];
  if (tokens.length === 3) return [tokens[0], tokens[1], tokens[2], tokens[1]];
  return tokens;
}

function makeFinding({
  id,
  riskHint,
  file,
  source,
  index,
  message,
  correction,
  match = "",
  evidence,
}) {
  const location = lineAndExcerpt(source, index);
  return {
    id,
    category: "spatial",
    riskHint,
    file: relative(root, file),
    ...location,
    excerpt: evidence ?? location.excerpt,
    match: match.slice(0, 120),
    message,
    correction,
  };
}

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`Not a directory: ${root}`);
  process.exit(2);
}

const { files, skipped } = walk(root);
const findings = [];
const rawVocabularyByFile = new Map();
const offScaleByFile = new Map();
const macroInsetOwners = new Map();
let minifiedFilesSkipped = 0;

function inspectDeclaration({
  file,
  source,
  property,
  value,
  index,
  selector = "",
  ruleBody = "",
}) {
  if (hasException(source, index, ruleBody)) return;
  if (/var\(|token\(|theme\(|env\(/i.test(value)) return;

  const lengths = extractLengths(value).filter((length) => length.value !== 0);
  if (lengths.length === 0) return;

  const relativeFile = relative(root, file);
  const vocabulary = rawVocabularyByFile.get(relativeFile) ?? {
    values: new Set(),
    count: 0,
    firstIndex: index,
    source,
    file,
  };
  for (const length of lengths) {
    if (length.unit === "px") vocabulary.values.add(Math.abs(length.value));
  }
  vocabulary.count += 1;
  rawVocabularyByFile.set(relativeFile, vocabulary);

  const offScale = lengths.filter(
    (length) => length.unit === "px" && !isOnScale(length.value),
  );
  if (offScale.length > 0) {
    const aggregate = offScaleByFile.get(relativeFile) ?? {
      values: new Set(),
      examples: [],
      firstIndex: index,
      source,
      file,
    };
    for (const length of offScale) aggregate.values.add(length.value);
    if (aggregate.examples.length < 8) {
      aggregate.examples.push(`${property}: ${value}`);
    }
    offScaleByFile.set(relativeFile, aggregate);
  }

  if (property.startsWith("margin") && lengths.some((length) => length.value < 0)) {
    findings.push(
      makeFinding({
        id: "negative-margin",
        riskHint: "polish",
        file,
        source,
        index,
        match: `${property}: ${value}`,
        message:
          "A negative margin changes the surrounding geometry and may be acting as an " +
          "unrecorded bleed or alignment correction.",
        correction:
          "Name the rail being left and joined, prefer a bleed primitive when available, " +
          "and document the reason as a spatial exception.",
      }),
    );
  }

  if (property === "padding") {
    const expanded = expandBoxValues(value);
    if (expanded && (expanded[0] !== expanded[2] || expanded[1] !== expanded[3])) {
      findings.push(
        makeFinding({
          id: "asymmetric-padding",
          riskHint: "polish",
          file,
          source,
          index,
          match: `${property}: ${value}`,
          message:
            "Asymmetric padding may be intentional, but its optical, content, or " +
            "integration reason is not documented.",
          correction:
            "Use symmetric or axis-based semantic insets unless the asymmetry has a " +
            "specific rendered purpose; document valid exceptions.",
        }),
      );
    }
  }

  if (
    selector &&
    selectorHasTerm(selector, defaults.audit.pageSelectorTerms) &&
    property.startsWith("padding")
  ) {
    const owners = macroInsetOwners.get(relativeFile) ?? new Map();
    if (!owners.has(selector)) owners.set(selector, index);
    macroInsetOwners.set(relativeFile, owners);
  }
}

for (const file of files) {
  let source;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (looksMinified(source)) {
    minifiedFilesSkipped += 1;
    continue;
  }

  const extension = extname(file);
  const inspectedIndexes = new Set();

  if (styleExtensions.has(extension)) {
    cssRulePattern.lastIndex = 0;
    for (const rule of source.matchAll(cssRulePattern)) {
      const selector = rule[1].trim();
      const body = rule[2];
      const bodyStart = (rule.index ?? 0) + rule[1].length + 1;
      const pageLike = selectorHasTerm(selector, defaults.audit.pageSelectorTerms);
      const wideContent = selectorHasTerm(
        selector,
        defaults.audit.wideContentSelectorTerms,
      );
      const hasMaximum =
        /\bmax-(?:inline-size|width)\s*:/i.test(body) ||
        /\b(?:inline-size|width)\s*:\s*(?:min|max|clamp)\s*\(/i.test(body);
      const centersItself =
        /\bmargin(?:-inline)?\s*:\s*[^;}]*(?:auto)/i.test(body) ||
        (/\bmargin-left\s*:\s*auto/i.test(body) &&
          /\bmargin-right\s*:\s*auto/i.test(body));
      const hasPadding = new RegExp(String.raw`\bpadding(?:-inline)?\s*:`).test(body);

      if (
        pageLike &&
        hasMaximum &&
        centersItself &&
        hasPadding &&
        !hasException(source, rule.index ?? 0, body)
      ) {
        findings.push(
          makeFinding({
            id: "universal-contained-wrapper",
            riskHint: "medium",
            file,
            source,
            index: rule.index ?? 0,
            match: selector,
            evidence: `${selector} { ${body.trim().slice(0, 150)} }`,
            message:
              "A page-like region combines centering, a maximum width, and its own " +
              "padding. This familiar wrapper may be constraining unlike content regions.",
            correction:
              "Record the width payoff and risk, compare contained with fluid or mixed " +
              "rails, and keep the wrapper only when each affected region benefits.",
          }),
        );
      }

      if (
        wideContent &&
        hasMaximum &&
        centersItself &&
        !hasException(source, rule.index ?? 0, body)
      ) {
        findings.push(
          makeFinding({
            id: "constrained-work-surface",
            riskHint: "polish",
            file,
            source,
            index: rule.index ?? 0,
            match: selector,
            evidence: `${selector} { ${body.trim().slice(0, 150)} }`,
            message:
              "A potentially width-hungry work surface is centered and capped. The cap " +
              "may be useful, but its task benefit needs rendered verification.",
            correction:
              "Check wide viewports and compare the cap with a fluid or mixed-rail model; " +
              "retain it only when it protects a real reading or association constraint.",
          }),
        );
      }

      cssDeclarationPattern.lastIndex = 0;
      for (const declaration of body.matchAll(cssDeclarationPattern)) {
        const index = bodyStart + (declaration.index ?? 0);
        inspectedIndexes.add(index);
        inspectDeclaration({
          file,
          source,
          property: declaration[1].toLowerCase(),
          value: declaration[2].trim(),
          index,
          selector,
          ruleBody: body,
        });
      }
    }
  }

  objectDeclarationPattern.lastIndex = 0;
  for (const declaration of source.matchAll(objectDeclarationPattern)) {
    const index = declaration.index ?? 0;
    if (inspectedIndexes.has(index)) continue;
    inspectDeclaration({
      file,
      source,
      property: declaration[1].toLowerCase(),
      value: declaration[2].trim(),
      index,
    });
  }

  arbitraryUtilityPattern.lastIndex = 0;
  for (const utility of source.matchAll(arbitraryUtilityPattern)) {
    const index = utility.index ?? 0;
    if (hasException(source, index)) continue;
    const numericValue = Number(utility[2]);
    const unit = utility[3];
    findings.push(
      makeFinding({
        id:
          unit === "px" && !isOnScale(numericValue)
            ? "off-scale-utility-spacing"
            : "raw-utility-spacing",
        riskHint: unit === "px" && !isOnScale(numericValue) ? "medium" : "polish",
        file,
        source,
        index,
        match: utility[1],
        message:
          "An arbitrary spacing utility bypasses the host spacing vocabulary and may " +
          "encode an unreviewed local correction.",
        correction:
          "Use a host spacing utility or semantic token, or document the optical or " +
          "integration reason as a spatial exception.",
      }),
    );
  }
}

for (const aggregate of offScaleByFile.values()) {
  const values = [...aggregate.values].sort((a, b) => Math.abs(a) - Math.abs(b));
  findings.push(
    makeFinding({
      id: "off-scale-spacing",
      riskHint: "medium",
      file: aggregate.file,
      source: aggregate.source,
      index: aggregate.firstIndex,
      evidence:
        `Off-scale values: ${values.map((value) => `${value}px`).join(", ")}. ` +
        `Examples: ${aggregate.examples.join("; ")}`,
      message:
        "Authored spacing uses values outside the selected scale. Some may be valid " +
        "optical or structural corrections, but their reasons are not documented.",
      correction:
        "Classify each relationship and map it to a host token, or add a nearby " +
        "`spatial-exception:` comment with the visible reason.",
    }),
  );
}

for (const vocabulary of rawVocabularyByFile.values()) {
  const values = [...vocabulary.values].sort((a, b) => a - b);
  if (values.length < defaults.audit.rawLiteralUniqueWarning) continue;
  findings.push(
    makeFinding({
      id: "spacing-vocabulary-drift",
      riskHint: "medium",
      file: vocabulary.file,
      source: vocabulary.source,
      index: vocabulary.firstIndex,
      evidence:
        `${vocabulary.count} raw spacing declarations use ${values.length} pixel values: ` +
        values.map((value) => `${value}px`).join(", "),
      message:
        "The file has a broad raw spacing vocabulary. Repeated one-off values make " +
        "relationship and density drift difficult to detect.",
      correction:
        "Group distances by cluster, item, group, section, structural inset, and explicit " +
        "exception; then map those roles to host tokens.",
    }),
  );
}

for (const [file, owners] of macroInsetOwners) {
  if (owners.size < defaults.audit.macroInsetOwnerWarning) continue;
  const sourceFile = join(root, file);
  const source = readFileSync(sourceFile, "utf8");
  const firstIndex = Math.min(...owners.values());
  findings.push(
    makeFinding({
      id: "multiple-macro-inset-owners",
      riskHint: "polish",
      file: sourceFile,
      source,
      index: firstIndex,
      evidence: `${owners.size} page-like selectors own padding: ${[
        ...owners.keys(),
      ]
        .slice(0, 8)
        .join(", ")}`,
      message:
        "Several page-like layers own padding. Nested combinations may create doubled or " +
        "inconsistent effective side insets.",
      correction:
        "Trace the rendered ancestor chain, assign the outer inset to one shell or page " +
        "owner, and keep inner padding tied to surfaces or local groups.",
    }),
  );
}

const riskOrder = { medium: 0, polish: 1 };
const uniqueFindings = [
  ...new Map(
    findings.map((finding) => [
      `${finding.id}:${finding.file}:${finding.line}:${finding.match}`,
      finding,
    ]),
  ).values(),
].sort(
  (a, b) =>
    (riskOrder[a.riskHint] ?? 99) - (riskOrder[b.riskHint] ?? 99) ||
    a.file.localeCompare(b.file) ||
    a.line - b.line,
);
const limitedFindings = uniqueFindings.slice(0, maxFindings);
const counts = limitedFindings.reduce((result, finding) => {
  result[finding.riskHint] = (result[finding.riskHint] ?? 0) + 1;
  return result;
}, {});
const report = {
  root,
  scalePx,
  scannedFiles: files.length - minifiedFilesSkipped,
  skippedFiles: skipped.length + minifiedFilesSkipped,
  protectedSourceIncluded: includeCanonical,
  truncated: uniqueFindings.length > limitedFindings.length,
  totalCandidates: uniqueFindings.length,
  counts,
  note:
    "These are static review prompts, not automatic defects. Confirm ownership, width " +
    "benefit, effective insets, and alignment in rendered layouts.",
  findings: limitedFindings,
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log(`# Spatial audit candidates: ${root}`);
console.log();
console.log(`Spacing scale: ${scalePx.map((value) => `${value}px`).join(", ")}`);
console.log(
  `Scanned ${report.scannedFiles} authored files; skipped ${report.skippedFiles}. ` +
    `Showing ${limitedFindings.length} of ${uniqueFindings.length} candidates.`,
);
console.log(report.note);
console.log();

for (const finding of limitedFindings) {
  console.log(
    `- **${finding.riskHint.toUpperCase()} REVIEW · spatial** ` +
      `\`${finding.file}:${finding.line}\` — ${finding.message}`,
  );
  if (finding.excerpt) console.log(`  - Evidence: \`${finding.excerpt}\``);
  console.log(`  - Check/fix: ${finding.correction}`);
}
