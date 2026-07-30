#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const audit = path.join(scriptDirectory, "audit-color.mjs");
const temporaryDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "no-slop-color-audit-"),
);

function write(relativePath, source) {
  const destination = path.join(temporaryDirectory, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, source);
}

function run(extraArguments = []) {
  const output = execFileSync(
    process.execPath,
    [audit, temporaryDirectory, "--json", ...extraArguments],
    { encoding: "utf8" },
  );
  return JSON.parse(output);
}

try {
  write(
    "src/globals.css",
    `:root {
  --neutral-950: #161616;
  --accent-500: oklch(62% 0.19 255);
  --fg-default: var(--neutral-950);
  --surface-canvas: #ffffff;
}
`,
  );
  write(
    "src/component.css",
    `.button {
  color: #123456;
  background: var(--blue-500);
  forced-color-adjust: none;
}
.record {
  --fg-muted-400: #767676;
  --focus-ring: var(--accent-solid);
  --selection-bg: var(--primary);
  --success-fg: var(--primary);
  --chart-1: var(--accent);
}
`,
  );
  write(
    "src/App.tsx",
    `export function App() {
  return <div className="bg-blue-500 text-gray-600 border-red-500">Record</div>;
}
`,
  );
  write(
    "assets/component-kit/canonical.css",
    `.canonical { color: #abcdef; background: var(--blue-500); }
`,
  );

  const report = run();
  const ids = new Set(report.findings.map((finding) => finding.id));

  assert.ok(ids.has("raw-color-outside-token-source"));
  assert.ok(ids.has("direct-primitive-token"));
  assert.ok(ids.has("raw-color-utility"));
  assert.ok(ids.has("semantic-role-step-leak"));
  assert.ok(ids.has("focus-accent-coupling"));
  assert.ok(ids.has("selection-accent-coupling"));
  assert.ok(ids.has("state-accent-coupling"));
  assert.ok(ids.has("chart-accent-coupling"));
  assert.ok(ids.has("forced-color-adjust-none"));
  assert.equal(
    report.findings.some(
      (finding) =>
        finding.file === "src/globals.css" &&
        finding.id === "raw-color-outside-token-source",
    ),
    false,
    "named token sources should inventory raw colors without flagging their location",
  );
  assert.equal(
    report.findings.some(
      (finding) =>
        finding.file === "src/globals.css" &&
        finding.id === "semantic-role-step-leak",
    ),
    false,
    "numeric primitive steps should not be mistaken for semantic role leakage",
  );
  assert.equal(
    report.findings.some((finding) =>
      finding.file.startsWith("assets/component-kit/"),
    ),
    false,
    "canonical component source should be protected by default",
  );
  assert.ok(report.inventory.colorSpaces.hex >= 3);
  assert.equal(report.inventory.colorSpaces.oklch, 1);

  const includedReport = run(["--include-canonical"]);
  assert.ok(
    includedReport.scannedFiles > report.scannedFiles,
    "--include-canonical should inspect protected component source",
  );

  console.log("color audit: inventory, coupling, role, and protection cases passed");
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
