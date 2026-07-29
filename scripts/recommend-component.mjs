#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);
const metadataFlagIndex = args.indexOf('--metadata');
const metadataPath =
  metadataFlagIndex === -1
    ? path.join(skillDir, 'assets', 'component-selection.json')
    : path.resolve(args[metadataFlagIndex + 1] ?? '');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

function usage(exitCode = 0) {
  console.log(`Usage:
  node scripts/recommend-component.mjs --intent <intent> [dimensions] [--all] [--json]

Dimensions:
  --apply immediate|submit|navigation|none
  --scope row|section|page|global|form|marketing
  --space compact|regular
  --content plain|descriptive|searchable|grouped|rich|tabular
  --risk normal|destructive
  --frequency repeated|routine|occasional|rare
  --importance principal|supporting|quiet|destructive
  --expressiveness restrained|standard|expressive
  --count <number>       Number of choices or actions
  --metadata <path>      Override metadata path for validation

Discovery:
  --list-intents

Examples:
  node scripts/recommend-component.mjs --intent single-select --count 3 \\
    --apply submit --scope form --content descriptive --space regular
  node scripts/recommend-component.mjs --intent action-menu --count 6 \\
    --scope row --space compact

The result is a shortlist, not permission to skip source inspection or contextual review.`);
  process.exit(exitCode);
}

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
    console.error(`Missing value for ${flag}`);
    process.exit(2);
  }
  return value;
}

if (args.includes('--help') || args.includes('-h')) usage();

const allIntents = [
  ...new Set(metadata.components.flatMap((component) => component.intents)),
].sort();

if (args.includes('--list-intents')) {
  console.log(allIntents.join('\n'));
  process.exit(0);
}

const intent = valueFor('--intent');
if (!intent) usage(2);
if (!allIntents.includes(intent)) {
  console.error(`Unknown intent: ${intent}\n\nAvailable intents:\n${allIntents.join('\n')}`);
  process.exit(2);
}

const countRaw = valueFor('--count') ?? valueFor('--options');
const facts = {
  apply: valueFor('--apply'),
  scope: valueFor('--scope'),
  space: valueFor('--space'),
  content: valueFor('--content'),
  risk: valueFor('--risk'),
  frequency: valueFor('--frequency'),
  importance: valueFor('--importance'),
  expressiveness: valueFor('--expressiveness'),
  optionCount: countRaw === undefined ? undefined : Number(countRaw),
};

if (facts.optionCount !== undefined && (!Number.isInteger(facts.optionCount) || facts.optionCount < 1)) {
  console.error('--count must be a positive integer.');
  process.exit(2);
}

const dimensions = [
  'apply',
  'scope',
  'space',
  'content',
  'risk',
  'frequency',
  'importance',
  'expressiveness',
];

function variantGuidance(component) {
  if (component.id === 'button') {
    if (facts.risk === 'destructive' || facts.importance === 'destructive') {
      return 'Choose an error variant; use filled only for the focused confirmed destructive outcome.';
    }
    if (facts.importance === 'principal') {
      return 'Consider primary + filled if this is the one principal action in its local group.';
    }
    if (facts.frequency === 'repeated' || facts.importance === 'quiet') {
      return 'Prefer a quiet neutral mode such as ghost for repeated or low-emphasis actions.';
    }
    return 'Compare neutral stroke/lighter with primary filled; do not accept the source default without a hierarchy reason.';
  }
  if (component.id === 'fancy-button') {
    return 'Use only for a rare principal marketing or milestone action; preserve real action or link semantics.';
  }
  if (component.id === 'link-button') {
    return 'Choose prominence from the local conversion hierarchy and preserve a real URL contract.';
  }
  if (component.id === 'compact-button') {
    return 'Choose stroke for isolated discoverability and ghost for repeated utilities; every icon-only action needs an accessible name.';
  }
  if (component.id === 'select') {
    if (facts.space === 'compact') return 'Compare compact and inline variants in the actual toolbar or scope-control context.';
    return 'Use default for an ordinary form field; compare compactForInput when embedded in another input composition.';
  }
  return 'Inspect the canonical variant axes and choose from hierarchy, frequency, risk, density, and scope.';
}

function score(component) {
  let total = 10;
  const matches = [`intent=${intent}`];
  const conflicts = [];
  const fit = component.fit ?? {};

  for (const dimension of dimensions) {
    const fact = facts[dimension];
    if (fact === undefined || fit[dimension] === undefined) continue;
    if (fit[dimension].includes(fact)) {
      total += 2;
      matches.push(`${dimension}=${fact}`);
    } else {
      total -= 2;
      conflicts.push(`${dimension}=${fact} is not a documented fit`);
    }
  }

  if (facts.optionCount !== undefined && fit.optionCount) {
    const min = fit.optionCount.min ?? 1;
    const max = fit.optionCount.max ?? Number.POSITIVE_INFINITY;
    if (facts.optionCount >= min && facts.optionCount <= max) {
      total += 3;
      matches.push(`count=${facts.optionCount} fits ${min}–${Number.isFinite(max) ? max : '∞'}`);
    } else {
      total -= 4;
      conflicts.push(
        `count=${facts.optionCount} falls outside ${min}–${Number.isFinite(max) ? max : '∞'}`,
      );
    }
  }

  return {
    id: component.id,
    publicName: component.publicName,
    score: total,
    matches,
    conflicts,
    useWhen: component.useWhen,
    avoidWhen: component.avoidWhen,
    neighbors: component.neighbors,
    variantGuidance: variantGuidance(component),
  };
}

const candidates = metadata.components
  .filter((component) => component.intents.includes(intent))
  .map(score)
  .sort(
    (left, right) =>
      right.score - left.score || left.publicName.localeCompare(right.publicName),
  );

const shown = args.includes('--all') ? candidates : candidates.slice(0, 3);
const considerations = [];
if (
  facts.scope === 'marketing' &&
  facts.importance === 'principal' &&
  facts.frequency === 'rare' &&
  intent !== 'promotional-action'
) {
  considerations.push(
    'Fancy Button is a mandatory comparison candidate for this rare principal marketing action; retain the correct execute or navigate semantics.',
  );
}

if (args.includes('--json')) {
  console.log(JSON.stringify({ intent, facts, considerations, candidates: shown }, null, 2));
} else {
  console.log(`Intent: ${intent}`);
  const suppliedFacts = Object.entries(facts)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`);
  if (suppliedFacts.length) console.log(`Facts: ${suppliedFacts.join(', ')}`);

  for (const [index, candidate] of shown.entries()) {
    console.log(`\n${index + 1}. ${candidate.publicName} (${candidate.id}) · fit ${candidate.score}`);
    console.log(`   Matches: ${candidate.matches.join('; ')}`);
    if (candidate.conflicts.length) {
      console.log(`   Conflicts: ${candidate.conflicts.join('; ')}`);
    }
    console.log(`   Use when: ${candidate.useWhen[0]}`);
    console.log(`   Avoid when: ${candidate.avoidWhen[0]}`);
    if (candidate.neighbors.length) {
      console.log(`   Compare: ${candidate.neighbors.join(', ')}`);
    }
    console.log(`   Variant: ${candidate.variantGuidance}`);
  }
  if (considerations.length) {
    console.log('\nRequired consideration:');
    for (const consideration of considerations) console.log(`- ${consideration}`);
  }
}
