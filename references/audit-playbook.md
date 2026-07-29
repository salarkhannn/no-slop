# Audit playbook

Use for read-only interface, layout, component, accessibility, or motion audits.

## Contents

1. Audit contract
2. Evidence collection
3. Severity
4. Layout audit
5. Distinctiveness audit
6. Component audit
7. Motion audit
8. Discovery mode
9. Review mode
10. Quality controls

## 1. Audit contract

An audit:

- does not edit source;
- separates observed behavior from inference;
- cites route, viewport, state, file, and line where available;
- prioritizes by user impact;
- gives a concrete correction;
- avoids taste-only findings;
- records verification limitations.

If the user asks to implement after the audit, start a separate build/refine phase.

## 2. Evidence collection

Sample:

- global shell and navigation;
- one dense task screen;
- one form;
- one list or table;
- one empty/loading/error state;
- one overlay;
- narrow, medium, and wide widths;
- keyboard and reduced-motion behavior;
- changed files for diff review.
- the host visual language across at least three routes or page families;

For each finding record:

```text
Evidence → principle or contract → user consequence → correction → verification
```

Use `node scripts/audit-ui.mjs <repo>` and `node scripts/audit-spacing.mjs <repo>` as
static lead generators. Also use `node scripts/audit-component-use.mjs <repo>` to find
possible hand-written substitutes and unexamined default variants. The spatial audit skips protected canonical and generated source
unless explicitly included. Confirm every reported candidate before presenting it as a
defect.

Never score hierarchy, balance, spacing rhythm, or visual mass from static source alone.
Inspect rendered evidence or mark that item unverified.

## 3. Severity

- Blocker: prevents task completion, access, or safe use.
- High: causes major confusion, loss, accessibility failure, or systematic visual drift.
- Medium: repeated hierarchy, spacing, responsive, or interaction weakness.
- Polish: localized craft issue with limited task impact.

Do not assign high severity merely because a value differs from a preferred default.

## 4. Layout audit

Check:

- primary purpose and action;
- title/context/action/content order;
- container and grid;
- usable main region after navigation, panes, and safe areas;
- contained, fluid, mixed-rail, or edge-to-edge model by major region;
- content-based reason for outer insets and maximum widths;
- effective side insets at narrow and extra-wide viewports;
- nested inset contributors and spacing ownership;
- major alignment axes;
- grouping and containment;
- inside/group/section spacing ratios;
- density consistency;
- visual mass and balance;
- content stress and overflow;
- responsive transformation;
- empty/loading/error geometry.

Do not report whitespace, centering, a width cap, asymmetry, negative margin, or full-bleed
treatment as a defect by itself. Compare at least one viable alternative and report the
task, reading, grouping, or alignment consequence.

Use the static evidence gate in `layout-composition.md`. Do not award a summary score.

## 5. Distinctiveness audit

Read `distinctiveness.md`. Inventory patterns by category, then judge the accumulation in
rendered context. Do not call a familiar convention defective by itself.

Check:

- whether the composition follows a named user decision;
- equal-card, KPI-strip, chart-and-sidebar, or default marketing sequences;
- card, pill, radius, border, shadow, icon-tile, gradient, glass, and glow accumulation;
- typography and copy that could transfer unchanged to an unrelated product;
- decorative or fabricated metrics, proof, status, activity, and live indicators;
- panels and charts without an evidence, decision, or action model;
- missing content stress and system states;
- three structural or visual decisions specific to the product.
- anti-slop accumulation: giant headings, mono eyebrows, off-white/cobalt palettes,
  rulers, ledgers, sparse split sections, unexplained empty regions, and solid CTA bands;
- repeated route skeletons and missed compound interaction opportunities;
- default component variants and hand-written substitutes.

Give pattern counts and concrete examples. Three related signals indicate generic drift.
Five signals across categories justify revisiting the composition, not merely changing
colors. Apply this to both ordinary slop and anti-slop patterns.

## 6. Component audit

For canonical components:

- identify the corresponding asset;
- compare DOM and public contract;
- compare geometry before color;
- test every applicable state;
- check icons, focus, transitions, and dark mode;
- report exact deviations.

For repository-native components:

- evaluate internal consistency and accessibility;
- preserve them when sound;
- question them when their variants, affordances, or accumulated visual language are weak;
- do not force canonical styling merely to create difference.

## 7. Motion audit

Inventory:

- CSS transitions and keyframes;
- framework motion components;
- gesture handlers;
- scroll observers;
- timers and state sequencing;
- route/view transitions;
- reduced-motion branches.

Prioritize:

1. correctness and accessibility;
2. input responsiveness;
3. spatial inconsistency;
4. duration/easing inconsistency;
5. interruption and gesture physics;
6. layout stability and performance;
7. polish and delight.

For each improvement plan include:

- files and symbols;
- current behavior;
- desired behavior;
- purpose and frequency;
- exact properties, values, and reduced-motion behavior;
- interaction and accessibility acceptance criteria;
- tests.

## 8. Discovery mode

When finding new animation opportunities:

- return at most 5–7 accepted ideas;
- rank by user value;
- include exact effect, trigger, values, and reduced-motion behavior;
- reject at least 3 tempting candidates and explain why;
- reject animation on high-frequency actions unless feedback requires it;
- reject proposals that mask broken layout;
- do not implement.

Good opportunity categories:

- causal overlay origin;
- jarring layout change;
- state relationship that is otherwise unclear;
- direct manipulation;
- long operation feedback;
- rare milestone.

## 9. Review mode

For a diff or focused implementation:

- default to flagging until behavior is demonstrated;
- inspect both changed code and affected component context;
- distinguish must-fix from suggestion;
- check purpose, frequency, origin, timing, curve, interruption, reduced motion, focus, and
  performance;
- approval requires no material standard violation.

Do not approve because the animation “looks smooth.”

## 10. Quality controls

Before delivering:

- [ ] Scope and evidence are stated
- [ ] Findings are deduplicated
- [ ] Severity follows user impact
- [ ] Every finding has a correction
- [ ] Static issues precede motion polish
- [ ] Generic-output signals were judged as an accumulation, not isolated taste
- [ ] Product-specific decisions and data credibility were verified
- [ ] Automated candidates were manually confirmed
- [ ] Accessibility is integrated, not a separate afterthought
- [ ] Limitations and untested states are explicit
