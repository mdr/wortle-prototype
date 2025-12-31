# Wortle

Use `nix develop -c <command>` to run commands, e.g. `nix develop -c task check`.

Run `task check` to verify work before finishing (runs tsc, lint, format, and tests).

## Coding Standards

- Prefer `undefined` over `null` where possible.
- Name functions that may return `undefined` with a `find` prefix (e.g. `findPuzzle`).
- Prefer arrow function properties for class methods (e.g. `load = () => { ... }`).
- Prefer single expression body form for arrow functions with one-liner returns (e.g., `const fn = (x: string) => x.trim()` over `const fn = (x: string) => { return x.trim() }`).

## Task Commands

- `task install`: install dependencies.
- `task dev`: run the dev server.
- `task tsc`: type check.
- `task lint`: lint.
- `task format`: format code.
- `task format:check`: check formatting.
- `task test:unit`: run unit tests.
- `task test:ct`: run component tests.
- `task build`: build.
- `task analyze`: build with bundle analysis.
- `task knip`: unused code scan.
- `task check`: run all checks.
