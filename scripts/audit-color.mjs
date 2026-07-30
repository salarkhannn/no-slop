#!/usr/bin/env node

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const root = resolve(args.find((argument) => !argument.startsWith("--")) ?? ".");
const json = args.includes("--json");
const includeCanonical = args.includes("--include-canonical");
const maxArgument = args.find((argument) => argument.startsWith("--max="));
const maxFindings = Math.max(
  1,
  Number.parseInt(maxArgument?.split("=")[1] ?? "200", 10) || 200,
);

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".nuxt",
  ".output",
  ".svelte-kit",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "public",
  "vendor",
]);
const protectedPathSegments = new Set(["component-kit"]);
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
const hueNames =
  "gray|grey|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|" +
  "emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const rawColorPattern =
  /#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\da-f])|(?:rgb|hsl|hwb|lab|lch|oklab|oklch|color)\(\s*[^)]*\)/gi;
const primitiveVariablePattern = new RegExp(
  String.raw`var\(\s*(--(?:color-)?(?:${hueNames})-\d{2,3})\b`,
  "gi",
);
const primitiveUtilityPattern = new RegExp(
  String.raw`\b((?:bg|text|border|ring|outline|decoration|fill|stroke)-(?:${hueNames})-\d{2,3}(?:\/\d{1,3})?)\b`,
  "gi",
);
const semanticStepPattern =
  /(--(?:(?:fg|foreground|text|surface|background|bg|border|stroke|ring|focus|selection|action|link|icon)(?:-[a-z][\w-]*)?|accent-[a-z][\w-]*)-\d{2,3})\s*:/gi;
const focusCouplingPattern =
  /(--(?:focus|ring)[\w-]*)\s*:\s*var\(\s*(--(?:accent|primary)[\w-]*)/gi;
const selectionCouplingPattern =
  /(--selection[\w-]*)\s*:\s*var\(\s*(--(?:accent|primary)[\w-]*)/gi;
const stateCouplingPattern =
  /(--(?:success|warning|error|danger|info)[\w-]*)\s*:\s*var\(\s*(--(?:accent|primary)[\w-]*)/gi;
const chartCouplingPattern =
  /(--(?:chart|series)[\w-]*)\s*:\s*var\(\s*(--(?:accent|primary)[\w-]*)/gi;
const forcedColorAdjustPattern = /\bforced-color-adjust\s*:\s*none\b/gi;

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

function isTokenSource(file, source) {
  const path = relative(root, file).split(sep).join("/").toLowerCase();
  const namedSource =
    /(?:^|\/)(?:tokens?|themes?|palettes?|colors?|variables|foundations?)(?:\/|\.|$)/.test(
      path,
    ) ||
    /(?:^|\/)(?:tailwind|uno|windi)\.config\.[^/]+$/.test(path);
  const globalThemeBlock =
    /(?::root|html(?:\[[^\]]+\])?|\[data-(?:theme|mode)[^\]]*\]|\.theme-[\w-]+|\.dark)\s*\{[^}]*--[\w-]+\s*:/is.test(
      source,
    );
  return namedSource || globalThemeBlock;
}

function lineAndExcerpt(source, index) {
  const line = source.slice(0, index).split("\n").length;
  return {
    line,
    excerpt: source.split("\n")[line - 1]?.trim().slice(0, 200) ?? "",
  };
}

function hasException(source, index) {
  const nearby = source.slice(Math.max(0, index - 240), index + 80);
  return /color-exception\s*:/i.test(nearby);
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
    category: "color-system",
    riskHint,
    file: relative(root, file),
    ...location,
    excerpt: evidence ?? location.excerpt,
    match: match.slice(0, 120),
    message,
    correction,
  };
}

function addPatternFindings({
  pattern,
  source,
  file,
  id,
  riskHint,
  message,
  correction,
}) {
  pattern.lastIndex = 0;
  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (hasException(source, index)) continue;
    findings.push(
      makeFinding({
        id,
        riskHint,
        file,
        source,
        index,
        match: match[0],
        message,
        correction,
      }),
    );
  }
}

function colorSpace(value) {
  if (value.startsWith("#")) return "hex";
  return value.slice(0, value.indexOf("(")).toLowerCase();
}

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`Not a directory: ${root}`);
  process.exit(2);
}

const { files, skipped } = walk(root);
const findings = [];
const inventory = {
  rawColorOccurrences: 0,
  filesWithRawColors: 0,
  tokenSourceFiles: 0,
  directPrimitiveUsages: 0,
  colorSpaces: {},
  themeSignals: {
    light: 0,
    dark: 0,
    forcedColors: 0,
  },
};
let minifiedFilesSkipped = 0;

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

  const tokenSource = isTokenSource(file, source);
  if (tokenSource) inventory.tokenSourceFiles += 1;
  if (/(?:prefers-color-scheme\s*:\s*light|data-theme\s*=\s*["']light|\.light\b)/i.test(source)) {
    inventory.themeSignals.light += 1;
  }
  if (/(?:prefers-color-scheme\s*:\s*dark|data-theme\s*=\s*["']dark|\.dark\b)/i.test(source)) {
    inventory.themeSignals.dark += 1;
  }
  if (/(?:forced-colors\s*:\s*active|forced-color-adjust\s*:)/i.test(source)) {
    inventory.themeSignals.forcedColors += 1;
  }

  rawColorPattern.lastIndex = 0;
  const rawMatches = [...source.matchAll(rawColorPattern)].filter(
    (match) => !hasException(source, match.index ?? 0),
  );
  if (rawMatches.length > 0) {
    inventory.filesWithRawColors += 1;
    inventory.rawColorOccurrences += rawMatches.length;
    for (const match of rawMatches) {
      const space = colorSpace(match[0]);
      inventory.colorSpaces[space] = (inventory.colorSpaces[space] ?? 0) + 1;
    }

    if (!tokenSource) {
      const examples = [...new Set(rawMatches.map((match) => match[0]))].slice(0, 6);
      findings.push(
        makeFinding({
          id: "raw-color-outside-token-source",
          riskHint: "polish",
          file,
          source,
          index: rawMatches[0].index ?? 0,
          match: examples.join(", "),
          evidence: `${rawMatches.length} raw color occurrence(s): ${examples.join(", ")}`,
          message:
            "Raw colors appear outside a named token, theme, or palette source. They may " +
            "be deliberate local media values, but ownership is unclear.",
          correction:
            "Map repeated interface color to a primitive and semantic role, or document " +
            "the local media or integration reason with a `color-exception:` comment.",
        }),
      );
    }
  }

  primitiveVariablePattern.lastIndex = 0;
  const primitiveVariables = [...source.matchAll(primitiveVariablePattern)];
  inventory.directPrimitiveUsages += primitiveVariables.length;
  if (!tokenSource) {
    for (const match of primitiveVariables) {
      const index = match.index ?? 0;
      if (hasException(source, index)) continue;
      findings.push(
        makeFinding({
          id: "direct-primitive-token",
          riskHint: "medium",
          file,
          source,
          index,
          match: match[1],
          message:
            "A component consumes a numeric hue primitive directly, coupling its meaning " +
            "to one palette step.",
          correction:
            "Map the primitive through a role-only semantic token such as `fg.muted`, " +
            "`selection.bg`, or `border.default`.",
        }),
      );
    }
  }

  if (!tokenSource) {
    addPatternFindings({
      pattern: primitiveUtilityPattern,
      source,
      file,
      id: "raw-color-utility",
      riskHint: "polish",
      message:
        "A numeric hue utility may bypass the host's semantic color roles.",
      correction:
        "Use a semantic host utility or token, or document why this local color must track " +
        "a primitive step.",
    });
  }

  addPatternFindings({
    pattern: semanticStepPattern,
    source,
    file,
    id: "semantic-role-step-leak",
    riskHint: "medium",
    message:
      "A semantic role name contains a numeric palette step, which makes theme remapping " +
      "and role changes harder.",
    correction:
      "Keep numeric steps in primitive scales and expose role-only semantic names to " +
      "components. Preserve published canonical names inside exact component boundaries.",
  });
  addPatternFindings({
    pattern: focusCouplingPattern,
    source,
    file,
    id: "focus-accent-coupling",
    riskHint: "medium",
    message:
      "The focus role aliases the product accent directly. Shared hue can be valid, but " +
      "focus contrast must remain independently tunable.",
    correction:
      "Give focus its own semantic role and verify it against every adjacent surface in " +
      "each supported mode.",
  });
  addPatternFindings({
    pattern: selectionCouplingPattern,
    source,
    file,
    id: "selection-accent-coupling",
    riskHint: "medium",
    message:
      "Selection aliases the product accent directly, coupling selected-state hierarchy " +
      "to branding.",
    correction:
      "Give selection background, foreground, and indicator independent semantic roles.",
  });
  addPatternFindings({
    pattern: stateCouplingPattern,
    source,
    file,
    id: "state-accent-coupling",
    riskHint: "medium",
    message:
      "A semantic state aliases the brand or primary action color, which can obscure its " +
      "meaning.",
    correction:
      "Allocate success, warning, danger, and information from a semantic state system and " +
      "verify each without relying on color alone.",
  });
  addPatternFindings({
    pattern: chartCouplingPattern,
    source,
    file,
    id: "chart-accent-coupling",
    riskHint: "medium",
    message:
      "A chart series aliases the product accent or primary action color, reducing the " +
      "room for ordered and categorical data.",
    correction:
      "Define chart roles separately, then test adjacent-series discrimination, legends, " +
      "selection, and non-color cues.",
  });
  addPatternFindings({
    pattern: forcedColorAdjustPattern,
    source,
    file,
    id: "forced-color-adjust-none",
    riskHint: "high",
    message:
      "Forced color adjustment is disabled. Native high-contrast behavior may be lost.",
    correction:
      "Remove the override unless the element supplies and verifies every required forced-" +
      "colors affordance.",
  });
}

const riskOrder = { high: 0, medium: 1, polish: 2 };
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
  scannedFiles: files.length - minifiedFilesSkipped,
  skippedFiles: skipped.length + minifiedFilesSkipped,
  protectedSourceIncluded: includeCanonical,
  truncated: uniqueFindings.length > limitedFindings.length,
  totalCandidates: uniqueFindings.length,
  counts,
  inventory,
  note:
    "These are static review prompts, not automatic defects or palette judgments. Confirm " +
    "token ownership, rendered hierarchy, modes, and interaction states before changing code.",
  findings: limitedFindings,
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log(`# Color-system audit candidates: ${root}`);
console.log();
console.log(
  `Scanned ${report.scannedFiles} authored files; skipped ${report.skippedFiles}. ` +
    `Showing ${limitedFindings.length} of ${uniqueFindings.length} candidates.`,
);
console.log(
  `Inventory: ${inventory.rawColorOccurrences} raw color occurrences across ` +
    `${inventory.filesWithRawColors} files; ${inventory.tokenSourceFiles} token sources; ` +
    `${inventory.directPrimitiveUsages} direct primitive references.`,
);
console.log(report.note);
console.log();

for (const finding of limitedFindings) {
  console.log(
    `- **${finding.riskHint.toUpperCase()} REVIEW · color system** ` +
      `\`${finding.file}:${finding.line}\` — ${finding.message}`,
  );
  if (finding.excerpt) console.log(`  - Evidence: \`${finding.excerpt}\``);
  console.log(`  - Check/fix: ${finding.correction}`);
}
