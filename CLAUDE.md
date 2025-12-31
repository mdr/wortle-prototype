# Wortle

Use `nix develop -c <command>` to run commands, e.g. `nix develop -c task check`.

Run `task check` to verify work before finishing (runs tsc, lint, format, and tests).

## Coding Standards

- Prefer `undefined` over `null` where possible.
- Name functions that may return `undefined` with a `find` prefix (e.g. `findPuzzle`).
- Prefer single expression body form for arrow functions with one-liner returns (e.g., `const fn = (x: string) => x.trim()` over `const fn = (x: string) => { return x.trim() }`).
