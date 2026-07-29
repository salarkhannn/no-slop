# Canonical component catalog

Use this catalog when the user requests an exact component, a component gallery, or a
public inventory. These are the 49 public components. Files outside this catalog may be
dependencies or helpers; do not present them as additional public components.

Catalog order is not recommendation order. When choosing rather than resolving a named
component, read `references/component-selection.md` and use
`scripts/recommend-component.mjs` for ambiguous choices.

## Actions

| Public name | Resolver slug |
| --- | --- |
| Button | `button` |
| Button Group | `button-group` |
| Compact Button | `compact-button` |
| Fancy Button | `fancy-button` |
| Link Button | `link-button` |

## Displaying Data

| Public name | Resolver slug |
| --- | --- |
| Avatar | `avatar` |
| Avatar Group | `avatar-group` |
| Avatar Group Compact | `avatar-group-compact` |
| Badge | `badge` |
| Banner | `banner` |
| Data Table | `data-table` |
| Divider | `divider` |
| Kbd | `kbd` |
| Progress Bar | `progress-bar` |
| Progress Circle | `progress-circle` |
| Rating | `rating` |
| Status Badge | `status-badge` |
| Tag | `tag` |

`data-table` resolves to `table.tsx`. `rating` resolves to the `StarRating` export in
`svg-rating-icons.tsx`.

## Feedback

| Public name | Resolver slug |
| --- | --- |
| Alert | `alert` |
| Notification | `notification` |
| Toast | `toast` |
| Tooltip | `tooltip` |

Notification providers and toast-alert surfaces are internal dependencies, not separate
public rows.

## Form

| Public name | Resolver slug |
| --- | --- |
| Checkbox | `checkbox` |
| Color Picker | `color-picker` |
| Datepicker | `datepicker` |
| Digit Input | `digit-input` |
| File Upload | `file-upload` |
| Hint | `hint` |
| Input | `input` |
| Label | `label` |
| Radio | `radio` |
| Select | `select` |
| Slider | `slider` |
| Switch | `switch` |
| Textarea | `textarea` |

## Layout

| Public name | Resolver slug |
| --- | --- |
| Accordion | `accordion` |
| Breadcrumb | `breadcrumb` |
| Segmented Control | `segmented-control` |
| Tab Menu Horizontal | `tab-menu-horizontal` |
| Tab Menu Vertical | `tab-menu-vertical` |

## Navigation

| Public name | Resolver slug |
| --- | --- |
| Dot Stepper | `dot-stepper` |
| Horizontal Stepper | `horizontal-stepper` |
| Pagination | `pagination` |
| Vertical Stepper | `vertical-stepper` |

## Overlays

| Public name | Resolver slug |
| --- | --- |
| Command Menu | `command-menu` |
| Drawer | `drawer` |
| Dropdown | `dropdown` |
| Modal | `modal` |
| Popover | `popover` |

## Exact gallery rule

For React or React-capable output:

1. Resolve each public slug with `scripts/component-deps.mjs`.
2. Import and render the canonical source and token stylesheet.
3. Keep support files internal.
4. Exercise real open, selected, checked, focus, keyboard, and dismissal behavior.
5. Count exactly 49 unique public rows when the complete catalog is requested.

For a single-file HTML deliverable, bundle the real React implementations and dependencies
into the file. Do not hand-copy their appearance into static HTML/CSS and call it exact.
