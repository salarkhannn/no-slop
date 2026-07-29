# Responsive and accessibility standards

Use for implementation and final verification, especially forms, navigation, overlays,
tables, motion, and adaptive layouts.

## Contents

1. Semantic structure
2. Keyboard and focus
3. Forms
4. Overlays and disclosures
5. Responsive and zoom
6. Color and media
7. Motion and timing
8. Verification matrix

## 1. Semantic structure

- Use landmarks for header, navigation, main, complementary regions, and footer.
- Keep one useful page-level heading and a logical heading outline.
- Use native buttons for actions and links for navigation.
- Use lists, tables, fieldsets, legends, labels, and details where semantics fit.
- Give icon-only controls an accessible name.
- Do not attach click behavior to an inert element without complete keyboard semantics.
- Ensure visual order and DOM order agree.
- Announce meaningful asynchronous updates with an appropriate live region.

ARIA supplements native semantics; it does not repair the wrong element automatically.

## 2. Keyboard and focus

- Every interaction must work without a pointer.
- Focus order must follow the visible workflow.
- Use `:focus-visible` and keep a high-contrast indicator.
- Never remove focus outline without an equivalent.
- Keep focused content visible beneath sticky regions.
- Restore focus after a modal, menu, or temporary surface closes.
- Support expected arrow-key patterns for menus, tabs, radio groups, listboxes, and grids.
- Avoid positive `tabindex`.
- Provide a skip path when repeated navigation warrants it.

Touch targets should usually be at least 44 × 44 CSS px or have equivalent spacing from
other targets. Dense desktop tools may visually use smaller controls if the effective target
and platform context remain usable.

Use input capability, not viewport width alone:

- coarse pointer or touch-primary contexts: preserve at least 44 × 44 CSS px targets;
- fine pointer, keyboard-heavy desktop tools: compact visual controls may be acceptable
  when focus, hit area, spacing, and user context remain usable;
- hybrid devices: design for touch unless the product explicitly controls the hardware.

## 3. Forms

- Associate every control with a visible label.
- Connect hint and error text with descriptions.
- Use `aria-invalid` only when invalid.
- Preserve input on failed submission.
- Move focus to a useful error summary only when it helps the workflow.
- Explain format before the user fails.
- Support browser autocomplete and correct input modes.
- Do not communicate required, invalid, or successful state by color alone.
- Avoid placeholder as the only label.
- Avoid disabled submission as the only error feedback.

## 4. Overlays and disclosures

Modal dialog:

- expose dialog role, name, and optional description;
- move initial focus deliberately;
- contain focus;
- support Escape unless the operation cannot safely dismiss;
- make the backdrop non-interactive;
- restore focus to the trigger;
- prevent background scroll without creating layout shift.

Menu/listbox:

- use the correct role and key behavior;
- maintain active item and selection separately;
- close predictably;
- handle viewport collision;
- avoid putting arbitrary forms inside a menu.

Popover:

- distinguish non-modal supplemental content from modal workflow;
- keep the trigger relationship clear;
- dismiss predictably;
- maintain reading and focus order.

Disclosure:

- reflect expanded state;
- keep the control before the revealed content;
- do not make animation necessary to access content.

## 5. Responsive and zoom

Verify:

- 320 px width or the product's supported minimum;
- representative medium and wide widths;
- just before and after each content-driven breakpoint;
- 200% zoom;
- browser text enlargement where supported;
- landscape mobile;
- long translated content;
- reduced viewport height;
- on-screen keyboard interaction.

No essential two-dimensional scrolling except content that requires it, such as a data
table or map. A horizontally scrolling table must not make the entire page scroll.

Do not hide essential content solely because the viewport is narrow. Reorder, summarize,
collapse, or move it into a deliberate alternate interaction.

## 6. Color and media

- Meet applicable contrast requirements for text, controls, focus, and meaningful graphics.
- Keep state recognizable without color.
- Provide alternative text for meaningful images.
- Use empty alternative text for decoration.
- Provide captions/transcripts for relevant media.
- Avoid text baked into images.
- Preserve content when images fail.
- Respect forced-colors or high-contrast modes where the audience needs them.

## 7. Motion and timing

- Honor reduced motion.
- Avoid flashes and rapid high-contrast changes.
- Allow users to pause or stop nonessential movement.
- Do not impose short time limits without extension.
- Keep essential controls available before animation completes.
- Preserve focus and announcements through animated transitions.
- Do not use parallax or scroll-jacking for essential reading.

## 8. Verification matrix

| Area | Manual check | Automated support |
| --- | --- | --- |
| Semantics | landmarks, headings, names | accessibility tree, axe-like scan |
| Keyboard | full task without pointer | interaction tests |
| Focus | visible, ordered, restored | focus assertions |
| Contrast | all states and themes | contrast analyzer |
| Forms | labels, errors, preservation | DOM and submission tests |
| Overlays | focus trap, Escape, return | component tests |
| Responsive | stress widths, zoom, content | screenshots |
| Motion | reduced motion, interruption | media emulation, state tests |

Automation is evidence, not a substitute for manual task completion.
