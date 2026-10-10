# Phase 1: OOP in TypeScript

Ten short topics. Each folder has:

- `example.ts`: a runnable, commented example. Read it top to bottom, run it, then tweak it.
- `exercise.ts`: stubs that throw `TODO`. Replace them with your implementation.
- `test/exercise.test.ts`: tests that tell you when the exercise is done. Don't edit them.

## How to work through a topic (30 to 60 min each)

```bash
npx ts-node fundamentals/oop/01-classes-objects/example.ts   # 1. run the example
npx jest fundamentals/oop/01 --watch                          # 2. keep tests running while you code
```

1. Read and run `example.ts`. Read the "Interview soundbites" at the bottom out loud.
2. Solve `exercise.ts` until its tests go green. Don't look up solutions first.
3. Answer that topic's question in the checklist below **out loud, in under 2 minutes**, as if an interviewer asked it.
4. Commit: `git add fundamentals/oop/01-classes-objects && git commit -m "oop: 01 classes"`.

`npm test` runs every test in the repo, so it will show failures for topics you haven't done yet. That's expected.

## Order and checklist

| # | Topic | Exercise | Interview question to answer out loud | Done |
|---|---|---|---|---|
| 01 | Classes & objects | Product with auto IDs | What do `readonly`, `static` and parameter properties give you? | ☐ |
| 02 | Encapsulation | Wallet | Why no setters? How do you stop callers mutating a returned array? | ☐ |
| 03 | Abstraction | Shapes | **Interface vs abstract class: when do you pick which?** | ☐ |
| 04 | Inheritance | Parking fees | When is inheritance the wrong choice? (Bird/Penguin) | ☐ |
| 05 | Polymorphism | Notification channels + overloads | How does polymorphism remove `switch` on type? | ☐ |
| 06 | Composition vs inheritance | Game characters | **Why composition over inheritance? Show an example.** | ☐ |
| 07 | Relationships | Library | Aggregation vs composition: how do you tell them apart? Draw the diagram in its README. | ☐ |
| 08 | Generics | Repository + groupBy | Why `Repository<T>`, and what do constraints buy you? | ☐ |
| 09 | Enums & unions | Order lifecycle + discounts | How do you model an entity's state and stop illegal transitions? | ☐ |
| 10 | Errors | Bank transfers | How do you keep a failed operation from leaving partial state? | ☐ |

The two bold questions are the Phase 1 exit check from [PLAN.md](../../PLAN.md).

## Where these show up later

| Topic | Shows up in |
|---|---|
| Encapsulation, errors | Every problem: Wallet, Splitwise, BookMyShow |
| Abstraction, polymorphism, composition | Strategy, State and Factory patterns (Phase 4) and most Tier 1 and 2 problems |
| Relationships | Every class diagram you draw from now on |
| Generics | `Repository<T>`, LRU Cache, Pub-Sub |
| Enums & unions | Order, Booking, Elevator, Vending Machine lifecycles |

When you finish a topic, share it in the thread and I'll review your solution the way an interviewer would.
