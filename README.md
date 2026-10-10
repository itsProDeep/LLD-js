# LLD-js

Low-level design practice for SDE-2 interviews, in TypeScript. See [PLAN.md](PLAN.md) for the study plan.

## Setup
```bash
npm install
```

## Start a new problem
```bash
cp -R _template parking-lot
```
Fill in `parking-lot/README.md` (requirements + class diagram) before writing code.

## Commands
| Command | What it does |
|---|---|
| `npm run build` | Type-check every `.ts` file |
| `npm test` | Run all tests |
| `npx jest parking-lot` | Run one problem's tests |
| `npx ts-node parking-lot/src/index.ts` | Run one problem's demo |

Phase 1 lessons and exercises: [fundamentals/oop](fundamentals/oop/README.md).

Revision notes, one file per phase: [notes/](notes/) (starting with [OOP](notes/01-oop.md)).

`currency-conversion/` is the earlier plain-JS solution and is excluded from the TS build and tests.
