#!/usr/bin/env node

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillDir = path.resolve(scriptDir, '..');
const recommender = path.join(scriptDir, 'recommend-component.mjs');
const variantExtractor = path.join(scriptDir, 'extract-component-variants.mjs');
const metadataPath = path.join(skillDir, 'assets', 'component-selection.json');

const cases = [
  {
    name: 'descriptive short submitted choice',
    args: [
      '--intent', 'single-select',
      '--count', '3',
      '--apply', 'submit',
      '--scope', 'form',
      '--space', 'regular',
      '--content', 'descriptive',
    ],
    expected: 'radio',
  },
  {
    name: 'immediate compact mode switch',
    args: [
      '--intent', 'single-select',
      '--count', '3',
      '--apply', 'immediate',
      '--scope', 'section',
      '--space', 'compact',
      '--content', 'plain',
    ],
    expected: 'segmented-control',
  },
  {
    name: 'moderate form value list',
    args: [
      '--intent', 'single-select',
      '--count', '8',
      '--apply', 'submit',
      '--scope', 'form',
      '--space', 'regular',
      '--content', 'plain',
    ],
    expected: 'select',
  },
  {
    name: 'row overflow actions',
    args: [
      '--intent', 'action-menu',
      '--count', '6',
      '--scope', 'row',
      '--space', 'compact',
    ],
    expected: 'dropdown',
  },
  {
    name: 'submitted independent choices',
    args: [
      '--intent', 'multi-select',
      '--count', '4',
      '--apply', 'submit',
      '--scope', 'form',
    ],
    expected: 'checkbox',
  },
  {
    name: 'rare expressive marketing action',
    args: [
      '--intent', 'promotional-action',
      '--apply', 'navigation',
      '--scope', 'marketing',
      '--frequency', 'rare',
      '--importance', 'principal',
      '--expressiveness', 'expressive',
    ],
    expected: 'fancy-button',
  },
];

function recommend(testCase, sourcePath = metadataPath) {
  const output = execFileSync(
    process.execPath,
    [recommender, ...testCase.args, '--metadata', sourcePath, '--json'],
    { encoding: 'utf8' },
  );
  return JSON.parse(output).candidates[0]?.id;
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
assert.equal(metadata.components.length, 49, 'metadata must cover 49 public components');
assert.equal(
  new Set(metadata.components.map((component) => component.id)).size,
  49,
  'component ids must be unique',
);

const temporaryDir = fs.mkdtempSync(path.join(os.tmpdir(), 'no-slop-selection-'));
const reversedMetadataPath = path.join(temporaryDir, 'component-selection-reversed.json');
fs.writeFileSync(
  reversedMetadataPath,
  JSON.stringify({
    ...metadata,
    components: [...metadata.components].reverse(),
  }),
);

try {
  for (const testCase of cases) {
    assert.equal(recommend(testCase), testCase.expected, testCase.name);
    assert.equal(
      recommend(testCase, reversedMetadataPath),
      testCase.expected,
      `${testCase.name} must remain stable when catalog order changes`,
    );
  }

  const marketingNavigation = JSON.parse(
    execFileSync(
      process.execPath,
      [
        recommender,
        '--intent', 'navigate',
        '--apply', 'navigation',
        '--scope', 'marketing',
        '--frequency', 'rare',
        '--importance', 'principal',
        '--expressiveness', 'expressive',
        '--metadata', metadataPath,
        '--json',
      ],
      { encoding: 'utf8' },
    ),
  );
  assert.match(
    marketingNavigation.considerations[0],
    /Fancy Button/,
    'rare principal marketing navigation must consider Fancy Button',
  );

  const variants = JSON.parse(
    execFileSync(process.execPath, [variantExtractor, 'button', 'select', '--json'], {
      encoding: 'utf8',
    }),
  );
  assert.deepEqual(variants.button[0].axes.variant, ['primary', 'neutral', 'error']);
  assert.deepEqual(variants.button[0].axes.mode, ['filled', 'stroke', 'lighter', 'ghost']);
  assert.deepEqual(variants.select[0].axes.variant, [
    'default',
    'compact',
    'compactForInput',
    'inline',
  ]);
  console.log(`component selection: ${cases.length} cases passed in normal and reversed order`);
  console.log('variant extraction: button and select axes matched canonical source');
} finally {
  fs.rmSync(temporaryDir, { recursive: true, force: true });
}
