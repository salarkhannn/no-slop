# Platform adapters

Use when the host codebase differs from the bundled React and utility-CSS implementation,
or when deciding how deeply to integrate.

## Contents

1. Preserve the host
2. React integration
3. Vue, Svelte, and Solid
4. Plain HTML and CSS
5. Utility CSS versions
6. Motion libraries
7. Server rendering
8. Adapter checklist

## 1. Preserve the host

Before introducing anything, identify:

- renderer and version;
- component conventions;
- CSS strategy and token source;
- accessible primitive library;
- icon library;
- motion library;
- server/client boundary;
- testing and story environment.

Prefer an adapter at the seam over a second architecture.

## 2. React integration

- keep existing path aliases or update imports consistently;
- preserve client directives only where hooks or browser APIs require them;
- use the repository's composition pattern unless it changes rendered output;
- avoid wrapping primitives in abstractions that hide required props or ref forwarding;
- verify primitive-library version compatibility;
- preserve controlled/uncontrolled behavior;
- merge tokens centrally.

If the repository already has a component with the same name, choose an explicit namespace
or migrate deliberately. Do not overwrite unrelated user code.

## 3. Vue, Svelte, and Solid

Port the contract:

- semantic DOM;
- slots and composition;
- controlled state and events;
- keyboard behavior;
- focus management;
- portals;
- collision handling;
- variant matrix;
- exact CSS values and state selectors.

Use the framework's established accessible primitives when they provide equivalent
behavior. Validate rendered output against the canonical React asset.

Stop and disclose a parity gap when an equivalent accessible primitive or a verifiable
implementation of focus management, keyboard interaction, portals, collision handling, or
gesture behavior is unavailable. Do not call an unverified complex port exact.

Framework mapping examples:

| React concept | Portable meaning |
| --- | --- |
| `asChild` / Slot | render or merge into consumer-provided element |
| forwarded ref | expose underlying interactive element |
| controlled prop | state owned by parent |
| portal | render outside local stacking/overflow context |
| compound variants | style combinations across multiple props |
| context provider | shared component state |

## 4. Plain HTML and CSS

For simple primitives:

- copy semantic structure;
- translate utilities to centralized component classes;
- keep custom properties for semantic tokens;
- implement state selectors explicitly;
- preserve focus-visible styling;
- use progressive enhancement.

For complex menus, listboxes, dialogs, date pickers, and command interfaces, use a proven
accessible primitive where possible. Exact visuals do not excuse incomplete behavior.

## 5. Utility CSS versions

The bundled theme targets CSS-first configuration in version 4.

If the host uses version 4:

- merge `@theme` blocks and theme selectors;
- keep a single framework import;
- reconcile body and base rules manually.

If the host uses version 3:

- prefer upgrading only if the user authorized it and repository risk is acceptable;
- otherwise map semantic color, type, radius, shadow, and animation tokens into the config;
- verify every class used by selected components exists;
- account for content scanning paths.

If the host does not use utility CSS:

- translate tokens into CSS custom properties;
- translate component classes without changing computed styles;
- retain semantic naming.

## 6. Motion libraries

Use an existing library when present.

Mapping:

- CSS transitions: predetermined enter/exit and simple state feedback;
- WAAPI: imperative, cancelable browser-native sequences;
- spring library: gesture, interruption, shared layout, dynamic target;
- view-transition API: route or DOM-state continuity with supported fallback.

Do not install a spring library for a single button fade. Do not force CSS durations onto a
gesture that needs velocity and interruption.

## 7. Server rendering

- keep first render deterministic;
- avoid viewport-dependent markup mismatches;
- use CSS media queries for layout when possible;
- isolate browser-only measurement;
- prevent flash of incorrect theme;
- make overlay portals resilient to hydration;
- avoid animation from an unmeasured or incorrect initial state.

## 8. Adapter checklist

- [ ] Host stack and conventions inspected
- [ ] No duplicate styling or motion system introduced
- [ ] Token layer mapped centrally
- [ ] Accessible primitive equivalence confirmed
- [ ] Imports, aliases, refs, and slots adapted
- [ ] Server/client boundaries preserved
- [ ] Visual and state parity checked
- [ ] Deviations documented
