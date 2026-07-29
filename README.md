# No Slop

`craft-ui` is an agent skill for designing, building, refining, and reviewing web
interfaces. It gives coding agents a structured approach to composition, component
selection, spacing, responsive behavior, accessibility, and motion.

The repository name is `no-slop`; the installed skill name is `craft-ui`.

## Install

The [skills CLI](https://github.com/vercel-labs/skills) can install this repository
for Claude Code, Codex, OpenCode, Cursor, Gemini CLI, GitHub Copilot, and other
Agent Skills-compatible harnesses.

Run the interactive installer:

```bash
npx skills add salarkhannn/no-slop
```

The installer detects supported agents and lets you choose project or global scope.
Project scope is the default. Add `--global` to make the skill available across
your projects:

```bash
npx skills add salarkhannn/no-slop --global
```

Install for a specific harness:

```bash
# Claude Code
npx skills add salarkhannn/no-slop --agent claude-code

# OpenAI Codex
npx skills add salarkhannn/no-slop --agent codex

# OpenCode
npx skills add salarkhannn/no-slop --agent opencode
```

Pass more than one `--agent` flag to install the same skill for several harnesses:

```bash
npx skills add salarkhannn/no-slop \
  --agent claude-code \
  --agent codex \
  --agent opencode
```

Use `--global` with any command above for a user-level install.

## [Claude Code](https://code.claude.com/docs/en/skills)

Claude Code loads project skills from `.claude/skills/` and personal skills from
`~/.claude/skills/`.

### Project install

```bash
npx skills add salarkhannn/no-slop --agent claude-code
```

Manual install:

```bash
mkdir -p .claude/skills
git clone --depth 1 \
  https://github.com/salarkhannn/no-slop.git \
  .claude/skills/craft-ui
```

### Personal install

```bash
npx skills add salarkhannn/no-slop --agent claude-code --global
```

Manual install:

```bash
mkdir -p ~/.claude/skills
git clone --depth 1 \
  https://github.com/salarkhannn/no-slop.git \
  ~/.claude/skills/craft-ui
```

Start a new Claude Code session if the `skills` directory did not exist when the
current session started. Run `/skills` to confirm that `craft-ui` is available,
then invoke it with `/craft-ui` or mention the skill in your prompt.

## [OpenAI Codex](https://developers.openai.com/codex/skills/)

Codex loads project skills from `.agents/skills/` and personal skills from
`$CODEX_HOME/skills/`. `CODEX_HOME` defaults to `~/.codex`.

### Project install

```bash
npx skills add salarkhannn/no-slop --agent codex
```

Manual install:

```bash
mkdir -p .agents/skills
git clone --depth 1 \
  https://github.com/salarkhannn/no-slop.git \
  .agents/skills/craft-ui
```

### Personal install

```bash
npx skills add salarkhannn/no-slop --agent codex --global
```

Manual install:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
git clone --depth 1 \
  https://github.com/salarkhannn/no-slop.git \
  "${CODEX_HOME:-$HOME/.codex}/skills/craft-ui"
```

Restart Codex after a personal install. Invoke the skill by naming `$craft-ui` in
your request.

## [OpenCode](https://opencode.ai/docs/skills/)

OpenCode loads project skills from `.opencode/skills/`, `.agents/skills/`, and
`.claude/skills/`. It loads personal skills from
`~/.config/opencode/skills/`, `~/.agents/skills/`, and `~/.claude/skills/`.

### Project install

```bash
npx skills add salarkhannn/no-slop --agent opencode
```

Manual install:

```bash
mkdir -p .opencode/skills
git clone --depth 1 \
  https://github.com/salarkhannn/no-slop.git \
  .opencode/skills/craft-ui
```

### Personal install

```bash
npx skills add salarkhannn/no-slop --agent opencode --global
```

Manual install:

```bash
mkdir -p ~/.config/opencode/skills
git clone --depth 1 \
  https://github.com/salarkhannn/no-slop.git \
  ~/.config/opencode/skills/craft-ui
```

Use `/craft-ui` in OpenCode V2 or ask the agent to use the `craft-ui` skill.

## Other supported harnesses

The skills CLI knows the install paths for these harnesses:

| Harness | `--agent` value | Project path | Personal path |
| --- | --- | --- | --- |
| Cursor | `cursor` | `.agents/skills/craft-ui` | `~/.cursor/skills/craft-ui` |
| Gemini CLI | `gemini-cli` | `.agents/skills/craft-ui` | `~/.gemini/skills/craft-ui` |
| GitHub Copilot | `github-copilot` | `.agents/skills/craft-ui` | `~/.copilot/skills/craft-ui` |
| Cline | `cline` | `.agents/skills/craft-ui` | `~/.agents/skills/craft-ui` |
| Roo Code | `roo` | `.roo/skills/craft-ui` | `~/.roo/skills/craft-ui` |
| Windsurf | `windsurf` | `.windsurf/skills/craft-ui` | `~/.codeium/windsurf/skills/craft-ui` |
| Kiro CLI | `kiro-cli` | `.kiro/skills/craft-ui` | `~/.kiro/skills/craft-ui` |
| OpenHands | `openhands` | `.openhands/skills/craft-ui` | `~/.openhands/skills/craft-ui` |

Replace `AGENT_NAME` in this command with a value from the table:

```bash
npx skills add salarkhannn/no-slop --agent AGENT_NAME
```

Add `--global` for the personal path. You can also clone this repository into the
listed directory if you do not want to use Node.js or the skills CLI.

## Use the skill

The skill triggers on interface design, implementation, refinement, and review
tasks. You can also invoke it by name:

```text
Use $craft-ui to design a responsive analytics dashboard for this app.
```

```text
Use the craft-ui skill to audit this page's layout, hierarchy, spacing, and
accessibility. Keep the review read-only.
```

```text
Use $craft-ui to match the bundled canonical React components exactly.
```

The package includes:

- design, layout, component, responsive, accessibility, and motion guidance;
- a canonical React component kit and selection data;
- scripts for repository scanning, spacing audits, component selection, dependency
  resolution, and asset verification.

Agents load the supporting files only when the task needs them.

## Update

If you installed with the skills CLI:

```bash
npx skills update craft-ui
```

If you installed with `git clone`, pull from inside the installed directory:

```bash
git -C /path/to/craft-ui pull --ff-only
```

## Security

Review `SKILL.md` and the scripts before installing any third-party skill. This
skill's scripts inspect source files and local metadata; they do not require API
keys.

## License

[MIT](LICENSE)
