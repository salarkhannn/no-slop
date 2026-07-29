# Component selection

Use this reference whenever the agent chooses a component or variant. Exact rendering and
appropriate selection are separate requirements: an exact implementation of the wrong
component is still wrong.

## Contents

1. Selection contract
2. Decision facts
3. Shortlist and disqualification
4. High-confusion families
5. Variant selection
6. Context overrides
7. Selection review
8. Scripts and structured metadata

## 1. Selection contract

If the user names a component, use it unless it conflicts with accessibility or explicit
repository constraints. Still choose its variant deliberately.

Otherwise:

1. Classify the interaction by semantics before considering appearance.
2. Record the decision facts below.
3. Retrieve the relevant family, not the whole catalog.
4. Compare the best candidate with at least one close alternative when the choice is
   ambiguous.
5. Disqualify candidates that fail semantics or behavior before comparing visual fit.
6. Select the component.
7. Inspect its actual source-derived variant axes.
8. Select the variant according to hierarchy, risk, frequency, density, and scope.
9. Render and review the decision in context.

Do not:

- choose the first component with a familiar name;
- assume the default variant is the intended variant;
- choose by screenshot resemblance before interaction semantics;
- use a generic component when a purpose-built canonical component exists;
- invent a hybrid component to avoid choosing;
- expose a long decision monologue to the user unless requested.

Keep a compact decision record for implementation:

```text
Need: choose one of three response teams; compare ETA details; save on submit.
Candidates: Radio, Select, Segmented Control.
Disqualify: Segmented Control applies immediately and does not support descriptions well.
Choice: Radio because all three described options should remain comparable.
Variant: canonical default; vertical composition at regular density.
```

## 2. Decision facts

Record only facts that affect the choice:

| Dimension | Questions |
| --- | --- |
| Intent | Execute, navigate, choose, toggle, disclose, inspect, or understand? |
| Application | Immediate, on submit, navigation, or informational only? |
| Cardinality | How many options, actions, records, people, steps, or states? |
| Visibility | Must alternatives remain visible for comparison? |
| Content | Plain labels, descriptions, search, grouping, rich content, or columns? |
| Scope | Row, field, section, page, global shell, or marketing surface? |
| Frequency | Repeated many times, routine, occasional, or rare? |
| Importance | Principal, supporting, quiet, or destructive? |
| Reversibility | Easy to undo, consequential, or destructive? |
| Space | Compact toolbar/row or regular composition? |
| Responsive | What must happen when labels, columns, or actions no longer fit? |

Semantics and required behavior are hard gates. Space and visual preference are
tie-breakers.

## 3. Shortlist and disqualification

Compare two or three candidates only when genuine ambiguity exists. Do not manufacture
alternatives for a trivial choice.

Use this order:

1. **Semantic gate** — Does the element perform the correct action, navigation, selection,
   status, feedback, disclosure, or progress role?
2. **Behavior gate** — Does it support immediate versus submitted application, single
   versus multiple selection, focus, keyboard behavior, dismissal, and required states?
3. **Information gate** — Does it expose enough labels, descriptions, values, and
   relationships for the task?
4. **Context gate** — Is it appropriate in a row, toolbar, form, page header, dense table,
   or marketing section?
5. **Hierarchy gate** — Does its emphasis match the action's importance and risk within
   that local action group?
6. **Responsive gate** — Can it transform or contain overflow without losing semantics?

Reject on gates 1–3. Rank survivors on gates 4–6.

Candidate order is not evidence. Rank from decision facts, not catalog order. During
evaluation, repeat ambiguous cases with candidate order changed; the selected component
should remain stable.

## 4. High-confusion families

### Actions and navigation

| Need | Prefer | Reject or downgrade when |
| --- | --- | --- |
| One labeled action in the current context | Button | It navigates to a real URL |
| Button-like navigation | Link Button | It mutates data or opens local UI |
| Familiar icon utility in constrained space | Compact Button | The label is necessary for comprehension |
| Two or three visible related actions | Button Group | The items represent a selected value |
| More than three or overflow actions | Dropdown | One action is important enough to remain visible |
| Rare expressive marketing action | Fancy Button | Used in dense product UI or repeated collections |

A Button Group executes independent actions. A Segmented Control selects one current mode.
Do not substitute one for the other because their silhouettes are similar.

### Short single selection

| Situation | Prefer |
| --- | --- |
| Two to five submitted choices that benefit from visibility or descriptions | Radio |
| Two to five modes, ranges, formats, or filters that apply immediately | Segmented Control |
| Moderate list or constrained toolbar/form | Select |
| Large, grouped, or searchable command/destination set | Command Menu |

Option count is not sufficient by itself. A four-option state filter may use a Select in a
compact table toolbar, while three response teams with ETA descriptions should usually be
Radios in a form.

Do not use a Segmented Control as a decorative radio group inside a submitted form. Do not
use Select merely because it consumes less vertical space when comparison matters.

### Binary and multiple selection

| Need | Prefer |
| --- | --- |
| Persistent setting applies immediately | Switch |
| Binary form value applies on submit | Checkbox |
| Zero, one, or many independent choices | Checkbox |
| Exactly one choice from a visible short list | Radio |

A switch communicates current state plus immediate change. A checkbox communicates a
selection that may remain pending until form submission.

### Feedback

| Scope and persistence | Prefer |
| --- | --- |
| Page-wide persistent message | Banner |
| In-flow section or form feedback | Alert |
| Brief non-blocking confirmation | Toast |
| Rich, timestamped, or actionable message | Notification |
| Short hover/focus clarification | Tooltip |
| Persistent field guidance | Hint |
| Consequential blocking decision | Modal |

Never put required task information only in a Tooltip or Toast.

### Overlays

| Content | Prefer |
| --- | --- |
| Compact list of immediate actions | Dropdown |
| Compact contextual information or small interactive content | Popover |
| Searchable commands or destinations | Command Menu |
| Bounded decision or focused task | Modal |
| Substantial secondary workflow that preserves page context | Drawer |

The trigger and overlay are a composition. A compact kebab trigger without a Dropdown does
not become an action menu by implication.

### Data labels

| Meaning | Prefer |
| --- | --- |
| Static category, type, count, or metadata | Badge |
| Operational or lifecycle state | Status Badge |
| Selected, removable, or manipulable entity | Tag |
| One person or organization | Avatar |
| Several individually recognizable identities | Avatar Group |
| Several identities in a constrained row | Avatar Group Compact |

Color does not determine meaning. Choose the semantic component first, then its color or
status variant.

### Structure and navigation

| Need | Prefer |
| --- | --- |
| Genuine hierarchical location | Breadcrumb |
| Equal peer sections | Tab Menu |
| Immediate mode or view switch | Segmented Control |
| Independently expandable related sections | Accordion |
| Ordered process with visible labels | Horizontal or Vertical Stepper |
| Compact ordered progress without labels | Dot Stepper |
| Stable pages within a long collection | Pagination |
| Repeated records compared across shared columns | Data Table |

Use horizontal tabs only while labels remain readable. Use vertical tabs for longer labels
or a persistent rail. A stepper communicates process, not hierarchy.

## 5. Variant selection

Choose the component before choosing its variant. Inspect the source rather than relying on
memory:

```bash
node scripts/extract-component-variants.mjs button select status-badge
```

The script reports every Tailwind Variants axis, allowed value, and declared default from
the bundled canonical source. For components without a Tailwind Variants declaration,
inspect exported props and the underlying primitive.

### Action emphasis

For Button:

- `primary + filled`: the one principal action in the local visible action group;
- `neutral + stroke`: a visible supporting action;
- `neutral + lighter`: a supporting action that should sit within a soft surface;
- `neutral + ghost`: quiet, repetitive, or low-emphasis action;
- `error`: destructive intent; use filled only when destruction is the focused confirmed
  outcome, and lower-emphasis modes when it is one optional action among others.

Placement already contributes prominence. A page-header action may need less visual weight
than the same action inside a focused dialog. Do not make every positive action primary.

For Compact Button:

- `stroke`: isolated utility that must remain discoverable;
- `ghost`: repeated row, toolbar, or adjacent utility;
- `white`: utility floating over a non-white or image-like surface;
- `modifiable`: use only for the component's intended modifiable composition;
- `fullRadius`: use when the surrounding control language is circular, not as decoration.

Every icon-only action needs an accessible name. Add a Tooltip unless the surrounding
context provides an equally clear visible label.

### Selection density

For Select:

- `default`: ordinary full-width form field;
- `compact`: content-width toolbar or filter control;
- `compactForInput`: select embedded as part of an Input composition;
- `inline`: low-chrome scope or context switcher where the current value remains clear;
- `hasError`: validation failure, accompanied by associated error guidance.

Choose size from the surrounding density, not from available width alone. Controls in one
group should normally share height.

### Classification and state emphasis

For Badge, select semantic color after meaning:

- neutral gray for ordinary metadata;
- semantic colors only when the category itself has that established meaning;
- `stroke` or `lighter` for routine metadata;
- `filled` only when the classification needs exceptional emphasis;
- small uppercase treatment for compact machine-like metadata, medium for ordinary labels.

For Status Badge:

- map `completed`, `pending`, `failed`, and `disabled` to actual state;
- use `light` when rapid status scanning is important;
- use `stroke` when the surrounding view already contains substantial semantic color.

For Alert:

- select status from message meaning;
- select size from content length and density;
- use `stroke` or lighter treatments for ordinary in-flow feedback;
- reserve filled treatment for exceptional urgency that does not overwhelm nearby actions.

### Progress

Use Progress Bar for comparison across rows or against a horizontal target. Use Progress
Circle when the footprint is compact and values do not need close cross-row comparison.
Select semantic color only when the progress state genuinely carries that meaning.

## 6. Context overrides

Rules interact. Apply these overrides deliberately:

- **Dense tables:** keep common row actions visible only when frequent; move secondary row
  actions into a Dropdown triggered by a ghost Compact Button.
- **Page headers:** placement adds prominence. A supporting header action may use a neutral
  or quiet variant even when it is important.
- **Dialogs:** the focused forward action can be the local primary even when a page-level
  primary remains behind the modal. Cancel is lower emphasis. Destructive confirmation uses
  the error variant.
- **Toolbars:** prefer compact Select, Segmented Control, Button Group, or ghost utilities
  according to semantics. Do not compress a labeled action into an unexplained icon.
- **Forms:** favor visible choices when comparison affects the decision. Keep label, control,
  hint, and error in one semantic group.
- **Marketing:** expressive variants may be used rarely around the principal conversion
  action; they do not override action semantics.
- **Mobile:** change composition before changing meaning. A wide action group may become a
  menu, horizontal tabs may become a contained overflow treatment, and a substantial
  secondary workflow may move to a Drawer.

## 7. Selection review

After rendering, inspect the actual page and ask:

- Is there a more semantically precise canonical component?
- Did the default component or default variant survive only because it was convenient?
- Can users see the alternatives and context required for their decision?
- Does the action's visual prominence match its local importance?
- Is there more than one visual primary in an action group?
- Are repeated actions quieter than rare, consequential actions?
- Are destructive actions explicit without dominating before they are relevant?
- Is an icon-only action recognizable, named, and explained?
- Is an overlay type correct for its content and focus behavior?
- Does the responsive transformation preserve meaning?

If the answer is uncertain, compare the selected component with its nearest neighbor in
`assets/component-selection.json` and revise before visual polish.

## 8. Scripts and structured metadata

`assets/component-selection.json` is the machine-readable selection source. It covers all
49 public components with intent, use, avoidance, neighbors, and applicable fit dimensions.

Generate a deterministic shortlist:

```bash
node scripts/recommend-component.mjs \
  --intent single-select \
  --count 3 \
  --apply submit \
  --scope form \
  --space regular \
  --content descriptive
```

List supported intents:

```bash
node scripts/recommend-component.mjs --list-intents
```

The score is a retrieval aid, not the final design decision. Read `useWhen`, `avoidWhen`,
and the nearest alternatives, then inspect the actual component source and render.
