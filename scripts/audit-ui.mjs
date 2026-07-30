#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const args = process.argv.slice(2);
const root = resolve(args.find((arg) => !arg.startsWith("--")) ?? ".");
const json = args.includes("--json");
const maxFindingsArg = args.find((arg) => arg.startsWith("--max="));
const parsedMaxFindings = Number(maxFindingsArg?.split("=")[1] ?? 200);
const maxFindings =
  Number.isFinite(parsedMaxFindings) && parsedMaxFindings > 0
    ? Math.floor(parsedMaxFindings)
    : 200;
const ignored = new Set([
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
const extensions = new Set([
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

const rules = [
  {
    id: "transition-all",
    category: "motion",
    riskHint: "high",
    pattern: /\btransition-all\b|transition(?:-property)?\s*:\s*all\b/g,
    message: "Blanket transitions can animate unrelated properties and hide layout defects.",
    correction: "List the exact properties, usually transform, opacity, color, or shadow.",
  },
  {
    id: "scale-zero",
    category: "motion",
    riskHint: "medium",
    pattern: /\bscale-0\b|scale\(\s*0(?:[,\s)]|$)/g,
    message: "Scaling ordinary UI from zero usually feels disconnected from its source.",
    correction: "Use a subtle .96–.98 scale or a short fade/translation from the causal origin.",
  },
  {
    id: "ease-in",
    category: "motion",
    riskHint: "medium",
    pattern: /(?:^|[\s:'"`])ease-in(?:[\s'"`]|$)|animation-timing-function\s*:\s*ease-in\s*;/g,
    message: "Ease-in makes ordinary UI entrances feel slow to respond.",
    correction: "Use ease-out for entrances or ease-in-out for visible point-to-point movement.",
  },
  {
    id: "long-ui-duration",
    category: "motion",
    riskHint: "medium",
    pattern: /\bduration-(?:5\d\d|[6-9]\d\d|[1-9]\d{3,})\b|(?:transition|animation)-duration\s*:\s*(?:[5-9]\d\d|[1-9]\d{3,})ms/g,
    message: "A long duration may make ordinary UI feel unresponsive.",
    correction: "Confirm the surface and travel warrant it; most UI should finish within 300 ms.",
  },
  {
    id: "outline-none",
    category: "accessibility",
    riskHint: "high",
    pattern: /\boutline-none\b|outline\s*:\s*(?:0|none)\b/g,
    message: "Focus styling may be removed without a visible replacement.",
    correction: "Confirm a high-contrast focus-visible style exists on the same component.",
  },
  {
    id: "clickable-div",
    category: "accessibility",
    riskHint: "high",
    pattern: /<(?:div|span)[^>]+\bonClick\s*=/g,
    message: "An inert element appears to handle pointer interaction.",
    correction: "Use a native button/link or implement complete role, keyboard, and focus behavior.",
  },
  {
    id: "image-without-alt",
    category: "accessibility",
    riskHint: "high",
    pattern: /<img\b(?![^>]*\balt\s*=)[^>]*>/g,
    message: "An image may be missing alternative text.",
    correction: "Add useful alt text, or alt=\"\" for decorative imagery.",
  },
  {
    id: "viewport-height",
    category: "responsive",
    riskHint: "medium",
    pattern: /\b(?:h-screen|min-h-screen|max-h-screen)\b|\bheight\s*:\s*100vh\b/g,
    message: "Static viewport height can clip content behind mobile browser UI.",
    correction: "Check dynamic viewport units and content overflow at short heights.",
  },
  {
    id: "fixed-pixel-width",
    category: "layout",
    riskHint: "medium",
    pattern:
      /\bw-\[(?:[4-9]\d\d|[1-9]\d{3,})px\](?=\s|["'`])|(?<![-\w])width\s*:\s*(?:[4-9]\d\d|[1-9]\d{3,})px\b/g,
    message: "A large fixed width may break responsive composition.",
    correction: "Confirm a max-width, fluid alternative, or deliberate overflow model.",
  },
  {
    id: "large-z-index",
    category: "layout",
    riskHint: "polish",
    pattern: /\bz-\[(?:[1-9]\d{3,})\]\b|z-index\s*:\s*(?:[1-9]\d{3,})\b/g,
    message: "A very large z-index may indicate an unmanaged layer system.",
    correction: "Use named layer tokens and verify overlay nesting.",
  },
  {
    id: "raw-color",
    category: "tokens",
    riskHint: "polish",
    pattern: /#[0-9a-fA-F]{3,8}\b/g,
    message: "A raw color may bypass semantic tokens.",
    correction: "Confirm it belongs in the token layer or replace it with a semantic role.",
  },
  {
    id: "arbitrary-pixel-spacing",
    category: "tokens",
    riskHint: "polish",
    pattern: /\b(?:m|p|gap|space-[xy]|top|right|bottom|left)-\[(?:\d+(?:\.\d+)?)px\](?=\s|["'`])/g,
    message: "Arbitrary pixel spacing may cause rhythm drift.",
    correction: "Confirm the value is intentional or map it to the shared spacing scale.",
  },
  {
    id: "generic-marketing-copy",
    category: "distinctiveness",
    riskHint: "polish",
    pattern:
      /\b(?:transform your workflow|unlock (?:the )?(?:power|potential|insights)|seamless(?:ly)?|supercharge|revolutionize|next[- ]generation|elevate your|all-in-one platform)\b/gi,
    message: "Generic technology copy may be standing in for a specific product claim.",
    correction: "Name the audience, mechanism, constraint, or sourced outcome.",
  },
  {
    id: "perpetual-decoration",
    category: "distinctiveness",
    riskHint: "medium",
    pattern:
      /\banimation(?:-iteration-count)?\s*:[^;\n]*(?:infinite|∞)|\brepeat\s*:\s*Infinity\b/g,
    message: "A perpetual animation may be decorative motion without a task.",
    correction: "Keep continuous motion only when it communicates live state; otherwise remove it.",
  },
];

const aggregateSignalRules = [
  {
    id: "generic-font-default-risk",
    category: "visual-direction",
    riskHint: "medium",
    pattern:
      /(?:@fontsource\/(?:inter|geist)|\bfont-family\s*:[^;\n]*(?:Inter|Geist|Arial|system-ui|ui-sans-serif)|\b(?:Inter|Geist)(?:_Tight|_Mono)?\s*\()/gi,
    threshold: 2,
    message: "A common starter typeface or system-sans stack appears repeatedly without proving that it is an intentional product voice.",
    correction: "Inspect the host font source and render it against at least one credible alternative across title, body, controls, numerals, and stress content before preserving it.",
  },
  {
    id: "heavy-font-weight-accumulation",
    category: "hierarchy",
    riskHint: "medium",
    pattern:
      /\bfont-(?:semibold|bold|extrabold|black)\b|\bfont-weight\s*:\s*(?:6[0-9]{2}|[7-9]00)\b/gi,
    threshold: 12,
    message: "Semibold and bold treatments appear frequently and may be compressing the text hierarchy.",
    correction: "Inspect rendered regions, make regular weight the baseline, and reserve 600+ for sparse focal anchors whose hierarchy is not already established by size, tone, or position.",
  },
  {
    id: "nested-surface-boundary-risk",
    category: "composition",
    riskHint: "medium",
    pattern:
      /<(?:div|section|article|aside|main)\b[^>]*(?:class|className)\s*=\s*["'`][^"'`]*(?:card|panel|surface|frame|window|shell|container)[^"'`]*["'`][^>]*>[\s\S]{0,1600}?<(?:div|section|article|aside)\b[^>]*(?:class|className)\s*=\s*["'`][^"'`]*(?:card|panel|surface|frame|window|shell|container)/gi,
    threshold: 2,
    message: "Several named surfaces appear nested inside other surfaces and may be duplicating containment.",
    correction: "Draw the rendered containment tree and keep each child boundary only when it has a distinct operational, informational, perceptual, expressive, or experiential responsibility.",
  },
  {
    id: "surface-container-accumulation",
    category: "distinctiveness",
    riskHint: "medium",
    pattern:
      /(?:\.[a-z0-9_-]*(?:card|panel|tile|surface|widget)[a-z0-9_-]*\s*[{,]|class(?:Name)?\s*=\s*["'`][^"'`]*(?:card|panel|tile|surface|widget))/gi,
    threshold: 10,
    message: "Many card-like surfaces were detected; the view may have become a box monoculture.",
    correction: "Inspect rendered boundaries, name each responsibility, and compare a less-contained alternative; revise only when repetition weakens meaning, hierarchy, identity, or task performance.",
  },
  {
    id: "rounded-container-accumulation",
    category: "distinctiveness",
    riskHint: "polish",
    pattern:
      /\bborder-radius\s*:\s*(?:var\([^)]+\)|(?:[1-9]\d*|0?\.\d+)(?:px|rem|em))|\brounded-(?:sm|md|lg|xl|2xl|3xl|full|\[[^\]]+\])/gi,
    threshold: 12,
    message: "Rounded treatment appears repeatedly and may be flattening the visual hierarchy.",
    correction: "Confirm the radius belongs to a coherent shape grammar and distinguishes object roles; revise default repetition that makes unlike objects read as peers.",
  },
  {
    id: "decorative-effect-accumulation",
    category: "distinctiveness",
    riskHint: "medium",
    pattern:
      /\b(?:linear-gradient|radial-gradient|conic-gradient|backdrop-filter\s*:|backdrop-blur-|filter\s*:\s*blur\()/gi,
    threshold: 3,
    message: "Several gradient, blur, or glass effects were detected.",
    correction: "Name each effect's perceptual, expressive, experiential, or functional responsibility and verify it belongs to a coherent visual grammar.",
  },
  {
    id: "pill-accumulation",
    category: "distinctiveness",
    riskHint: "polish",
    pattern:
      /\bborder-radius\s*:\s*(?:999|9999)px|\brounded-full\b/gi,
    threshold: 6,
    message: "Pill styling appears repeatedly and may be applied beyond tags, status, or compact selection.",
    correction: "Confirm pill geometry consistently encodes a compact action, category, state, selection, or object language instead of appearing by habit.",
  },
  {
    id: "equal-grid-accumulation",
    category: "distinctiveness",
    riskHint: "medium",
    pattern:
      /\bgrid-template-columns\s*:\s*repeat\(\s*[3-6]\s*,|\bgrid-cols-[3-6]\b/gi,
    threshold: 2,
    message: "Repeated equal multi-column grids may be imposing symmetry on unequal content.",
    correction: "Confirm every item is a true peer; otherwise vary span, density, or composition by priority.",
  },
  {
    id: "icon-container-accumulation",
    category: "distinctiveness",
    riskHint: "polish",
    pattern:
      /(?:\.[a-z0-9_-]*(?:icon-(?:box|tile|container)|glyph)[a-z0-9_-]*\s*[{,]|class(?:Name)?\s*=\s*["'`][^"'`]*(?:icon-(?:box|tile|container)|glyph))/gi,
    threshold: 8,
    message: "Repeated icon containers may be decorating every item instead of encoding categories.",
    correction: "Keep containers that establish a target, fallback identity, category, state, or coherent object language; revise those with no recoverable responsibility.",
  },
  {
    id: "anti-slop-eyebrow-accumulation",
    category: "visual-direction",
    riskHint: "medium",
    pattern:
      /\b(?:eyebrow|section-label|kicker|overline)\b|\b(?:uppercase|text-transform\s*:\s*uppercase)\b[^\n"'`}]*(?:tracking-|letter-spacing\s*:)|\b(?:tracking-|letter-spacing\s*:)[^\n"'`}]*(?:uppercase|text-transform\s*:\s*uppercase)/gi,
    threshold: 4,
    message: "Tiny tracked uppercase labels appear repeatedly and may have become an anti-slop house style.",
    correction: "Confirm each label contributes information architecture, provenance, sequence, voice, or pacing and that repeated treatment belongs to the product direction.",
  },
  {
    id: "anti-slop-display-heading-accumulation",
    category: "visual-direction",
    riskHint: "medium",
    pattern:
      /\btext-(?:6xl|7xl|8xl|9xl)\b|\bfont-size\s*:\s*(?:clamp\([^;\n]*(?:4|5|6|7|8)rem|(?:6[4-9]|[7-9]\d|1\d\d)px)/gi,
    threshold: 3,
    message: "Several oversized display headings were detected.",
    correction: "Verify the content earns display scale and that the actual work, proof, or media remains the focal anchor.",
  },
  {
    id: "ruled-ledger-accumulation",
    category: "visual-direction",
    riskHint: "medium",
    pattern:
      /\b(?:ledger|ruler|measure-mark|section-index)\b|\bborder-(?:t|b|y)\b|\bborder-(?:top|bottom)\s*:|\bdivide-y\b/gi,
    threshold: 18,
    message: "Horizontal rules are heavily repeated and may be substituting for richer object or interaction structure.",
    correction: "Inspect whether the content needs a ledger, grouped list, table, board, inspector, or media-led topology.",
  },
  {
    id: "large-empty-region-risk",
    category: "layout",
    riskHint: "medium",
    pattern:
      /\bmin-h-(?:screen|\[(?:6\d\d|[7-9]\d\d|1\d{3,})px\])\b|\bmin-height\s*:\s*(?:[6-9]\d\d|1\d{3,})px/gi,
    threshold: 3,
    message: "Several large minimum-height regions were detected and may create unexplained empty space.",
    correction: "Confirm in rendered wide and short-height views that every large quiet region improves focus, reading, manipulation, hierarchy, identity, pacing, or atmosphere.",
  },
  {
    id: "repeated-page-skeleton-risk",
    category: "composition",
    riskHint: "medium",
    pattern:
      /\b(?:PageHeader|SectionHeader|PageTitle|HeaderActions|FilterBar|DataTable|EmptyState)\b/gi,
    threshold: 14,
    message: "Page-header, filter, table, and empty-state primitives repeat heavily across the repository.",
    correction: "Compare sibling routes by primary object and decision; confirm the shared shell has not forced identical page topology.",
  },
  {
    id: "full-width-cta-band-risk",
    category: "visual-direction",
    riskHint: "polish",
    pattern:
      /\b(?:w-screen|left-\[50%\]|full-bleed|edge-to-edge)\b[^\n"'`}]*(?:bg-(?:blue|indigo|black)|background-color\s*:)/gi,
    threshold: 2,
    message: "Repeated full-width saturated bands may be an anti-slop CTA default.",
    correction: "Confirm each band advances the argument or interaction rather than merely replacing a gradient CTA panel.",
  },
];

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
    else if (extensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

function lineAndExcerpt(source, index) {
  const before = source.slice(0, index);
  const line = before.split("\n").length;
  const value = source.split("\n")[line - 1]?.trim() ?? "";
  return { line, excerpt: value.slice(0, 180) };
}

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`Not a directory: ${root}`);
  process.exit(2);
}

const findings = [];
const files = walk(root);
let hasMotionCode = false;
let hasReducedMotion = false;
const aggregateSignals = new Map(
  aggregateSignalRules.map((rule) => [
    rule.id,
    { ...rule, pattern: rule.pattern, count: 0, files: new Set() },
  ]),
);

for (const file of files) {
  let source;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (/transition|animation|keyframes|motion\.|animate\(|useSpring|useMotion/.test(source)) {
    hasMotionCode = true;
  }
  if (/prefers-reduced-motion|useReducedMotion|reducedMotion/.test(source)) {
    hasReducedMotion = true;
  }
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    for (const match of source.matchAll(rule.pattern)) {
      const location = lineAndExcerpt(source, match.index ?? 0);
      if (rule.id === "raw-color" && /--[\w-]+\s*:/.test(location.excerpt)) {
        continue;
      }
      findings.push({
        ...rule,
        pattern: undefined,
        file: relative(root, file),
        ...location,
        match: match[0].slice(0, 100),
      });
    }
  }
  for (const rule of aggregateSignals.values()) {
    rule.pattern.lastIndex = 0;
    const matches = [...source.matchAll(rule.pattern)];
    if (matches.length > 0) {
      rule.count += matches.length;
      rule.files.add(relative(root, file));
    }
  }
}

for (const signal of aggregateSignals.values()) {
  if (signal.count < signal.threshold) continue;
  findings.push({
    id: signal.id,
    category: signal.category,
    riskHint: signal.riskHint,
    file: "(repository)",
    line: 1,
    excerpt:
      `${signal.count} static occurrences across ${signal.files.size} ` +
      `${signal.files.size === 1 ? "file" : "files"}; threshold ${signal.threshold}.`,
    match: "",
    message: signal.message,
    correction: signal.correction,
  });
}

if (hasMotionCode && !hasReducedMotion) {
  findings.push({
    id: "reduced-motion-not-detected",
    category: "motion",
    riskHint: "high",
    file: "(repository)",
    line: 1,
    excerpt: "",
    match: "",
    message: "Motion code was detected but no reduced-motion branch was found.",
    correction: "Confirm a centralized preference handler exists and provide gentler alternatives.",
  });
}

const riskOrder = { high: 0, medium: 1, polish: 2 };
const uniqueFindings = [
  ...new Map(
    findings.map((finding) => [
      `${finding.id}:${finding.file}:${finding.line}`,
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
const counts = limitedFindings.reduce((accumulator, finding) => {
  accumulator[finding.riskHint] = (accumulator[finding.riskHint] ?? 0) + 1;
  return accumulator;
}, {});
const report = {
  root,
  scannedFiles: files.length,
  truncated: uniqueFindings.length > limitedFindings.length,
  totalCandidates: uniqueFindings.length,
  counts,
  note:
    "Risk hints prioritize static candidates. Aggregate counts locate repetition for rendered comparison; they are not proof of a defect.",
  findings: limitedFindings,
};

if (json) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log(`# Static UI audit candidates: ${root}`);
console.log();
console.log(
  `Scanned ${files.length} files. Showing ${limitedFindings.length} of ` +
    `${uniqueFindings.length} candidates.`,
);
console.log("Risk hints are not final severity; confirm each candidate in rendered context.");
console.log();
for (const finding of limitedFindings) {
  console.log(
    `- **${finding.riskHint.toUpperCase()} RISK · ${finding.category}** ` +
      `\`${finding.file}:${finding.line}\` — ${finding.message}`,
  );
  if (finding.excerpt) console.log(`  - Evidence: \`${finding.excerpt}\``);
  console.log(`  - Check/fix: ${finding.correction}`);
}
