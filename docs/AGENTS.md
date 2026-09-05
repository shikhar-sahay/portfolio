# docs/AGENTS.md

> **Multi-Agent Working Guidelines**
> The canonical agent instruction set is the root `AGENTS.md`. This file extends it with multi-agent session protocol details (read order per agent type, conflict resolution, onboarding). Where this file and the root `AGENTS.md` disagree, the root file wins.
> This repository will be worked on by multiple AI coding agents across many sessions:
>
> - **Claude Code** (primary)
> - **GitHub Copilot** (VS Code / CLI)
> - **Gemini** (CLI / IDE)
> - **Other agents** as needed
>
> The repository itself is the persistent source of truth. Documentation is the coordination mechanism.

---

## Mandatory Protocol for EVERY Agent Session

Every agent, every session, MUST complete these steps **in order** before making any code changes:

### 1. Read `CLAUDE.md`

- Permanent instructions for all Claude Code sessions
- Contains core constraints, documentation protocol, decision markers
- **Time:** ~30 seconds

### 2. Read `docs/HANDOFF.md`

- Current state, recent changes, current milestone
- Decisions made, known issues, next steps
- Files to know, testing status
- **Time:** ~1 minute

### 3. Read `docs/ROADMAP.md`

- Understand milestone context and dependencies
- Know what's in scope for current milestone
- Understand exit criteria
- **Time:** ~1 minute

### 4. Read Relevant Design/Architecture Documentation

Based on current milestone:

- **M0:** `ARCHITECTURE.md` (tooling, folder structure)
- **M1:** `DESIGN_SYSTEM.md` (typography, color, hero), `ANIMATION.md` (entrance)
- **M2:** `ARCHITECTURE.md` (scroll), `ANIMATION.md` (scroll-driven), `DESIGN_SYSTEM.md` (nav)
- **M3 to M6:** Relevant section docs + `CONTENT.md` (data structures)
- **M7 to M8:** `PERFORMANCE.md`, `ANIMATION.md` (reduced motion), `DESIGN_SYSTEM.md` (polish)
- **Time:** 2 to 5 minutes

### 5. Inspect Existing Code Before Making Changes

- Read relevant files in `src/`, `app/`, `components/`, `lib/`
- Understand current patterns, imports, conventions
- Check for existing components that should be reused
- **Time:** 2 to 10 minutes depending on scope

### 6. Preserve FINALIZED Decisions

- Any decision marked `FINALIZED` in `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ANIMATION.md`, `DECISIONS.md` is **binding**
- Do not change `FINALIZED` decisions without explicit discussion and documentation update
- If you believe a `FINALIZED` decision is wrong, document the concern in `DECISIONS.md` and flag in `HANDOFF.md`: do not silently override

### 7. Avoid Major Undocumented Design Decisions

- If a design/architecture choice is not documented, **do not invent it**
- Mark it `UNDECIDED` in the relevant doc
- Flag in `HANDOFF.md` as needing decision
- Escalate to owner if blocking
- Exception: Trivial implementation details (variable names, internal structure): use judgment

### 8. Update Documentation After Meaningful Work

At the end of every session with code changes:

- Update `docs/HANDOFF.md`:
  - `CURRENT STATE`: what exists now
  - `RECENT CHANGES`: add entry with date, session, changes
  - `CURRENT MILESTONE`: update progress
  - `DECISIONS MADE`: any new decisions
  - `KNOWN ISSUES`: update
  - `NEXT STEPS`: update
  - `FILES TO KNOW`: update
  - `TESTING STATUS`: update
- Update relevant design/architecture docs:
  - Mark decisions `FINALIZED` with actual values
  - Add new patterns to `ANIMATION.md`, `DESIGN_SYSTEM.md`
  - Record decisions in `DECISIONS.md`
- **Commit message format:** `type(scope): description` (e.g., `feat(hero): add entrance animation`, `docs: finalize hero typography`)

### 9. Leave the Repository Runnable

- `pnpm install` must work
- `pnpm dev` must start without errors
- `pnpm build` must succeed (or documented known failures in `HANDOFF.md`)
- No broken imports, missing files, or syntax errors
- If you introduce a breaking change, fix it or document it clearly in `HANDOFF.md`

---

## Agent-Specific Notes

### Claude Code

- Primary agent for this project
- Has full tool access (Read, Write, Edit, Bash, Glob, Grep, Task, etc.)
- Follows this protocol exactly
- Updates `HANDOFF.md` at session end

### GitHub Copilot

- Works in VS Code / CLI context
- **Must still read:** `CLAUDE.md`, `HANDOFF.md`, `ROADMAP.md` before starting
- **Must still update:** `HANDOFF.md` after changes (via VS Code or CLI)
- Uses same folder structure, conventions, patterns
- Commits follow same format

### Gemini CLI

- Works in terminal context
- **Must still read:** `CLAUDE.md`, `HANDOFF.md`, `ROADMAP.md` before starting
- **Must still update:** `HANDOFF.md` after changes
- Uses same folder structure, conventions, patterns
- Commits follow same format

### Other Agents

- Any agent working on this repo follows the same protocol
- The 9-step protocol is **universal**: not Claude-specific

---

## Coordination Mechanisms

### 1. `HANDOFF.md`: Primary Sync Point

- **Read first, write last** every session
- Contains all context needed to continue
- Never skip updating it

### 2. `DECISIONS.md`: Decision Log

- Every significant decision recorded with rationale
- Prevents re-litigation
- Agents check here before proposing alternatives

### 3. Git History: Implementation Truth

- Commits are the ground truth for what was built
- Commit messages should be descriptive
- `git log --oneline -20` gives quick context

### 4. Branch Strategy (UNDECIDED)

- TBD: trunk-based? feature branches? PRs required?
- Will be decided in M0 and documented here

---

## Conflict Resolution

If two agents make conflicting changes:

1. **Git handles merge conflicts**: standard resolution
2. **Design conflicts**: check `DECISIONS.md` and `DESIGN_SYSTEM.md` for `FINALIZED` rulings
3. **Undocumented conflicts**: escalate to owner, document in `HANDOFF.md` as `KNOWN ISSUE`
4. **Process conflicts**: refer to this `AGENTS.md` protocol

---

## Onboarding Checklist for New Agents

Before first contribution, a new agent should:

- [ ] Read `CLAUDE.md` completely
- [ ] Read `docs/HANDOFF.md` completely
- [ ] Read `docs/ROADMAP.md` completely
- [ ] Read `docs/DECISIONS.md` completely
- [ ] Skim `docs/DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ANIMATION.md`, `PERFORMANCE.md`
- [ ] Run `pnpm install` and `pnpm dev` locally
- [ ] Explore `src/` folder structure
- [ ] Confirm understanding of `FINALIZED` vs `UNDECIDED` markers

---

## Anti-Patterns (What NOT To Do)

| Anti-Pattern                       | Why It's Harmful                           | Correct Approach                                       |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| Skip reading `HANDOFF.md`          | Miss context, duplicate work, break things | Always read first                                      |
| Change `FINALIZED` design tokens   | Inconsistency, wasted work, confusion      | Respect `FINALIZED`; propose change via `DECISIONS.md` |
| Invent undocumented patterns       | Fragmentation, unreviewed decisions        | Mark `UNDECIDED`, flag in `HANDOFF.md`                 |
| Leave broken build                 | Blocks other agents, CI fails              | Fix before commit; document if can't                   |
| Don't update `HANDOFF.md`          | Next agent starts blind                    | Update every session                                   |
| Commit without descriptive message | Hard to trace history                      | `type(scope): description` format                      |
| Assume "someone else will fix it"  | Technical debt accumulates                 | Own your changes end-to-end                            |

---

## Emergency Protocol

If you discover a critical issue (security, data loss, major regression):

1. **Stop**: do not continue feature work
2. **Document** in `HANDOFF.md` under `KNOWN ISSUES` with 🚨 CRITICAL
3. **Fix if possible**: minimal fix to restore stability
4. **Commit** with `fix: critical - <description>`
5. **Notify**: add note for owner in `HANDOFF.md`
6. **Resume** only after stability restored

---

## Version Control Hygiene

- **Commit often**: small, atomic commits
- **Descriptive messages**: `feat(hero): add entrance animation with stagger`
- **One logical change per commit**: not "fixes and refactors"
- **Reference decisions**: `docs: finalize hero typography per DECISIONS.md#12`
- **No WIP commits on main**: use feature branches if needed (TBD in M0)

---

## Notes

This protocol exists because the project spans **many sessions, many agents, and many weeks**. The cost of reading 5 docs (5 minutes) is trivial compared to the cost of a session going off-track (hours/days).

**Every agent is responsible for the protocol.** No exceptions.
