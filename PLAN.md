# LLD Study Plan (SDE-2)

A step-by-step plan to go from OOP basics to confidently solving the low-level design (machine coding) rounds asked at SDE-2 level.

**Language: TypeScript.** It is what you use daily (Node.js/NestJS), and LLD interviews reward interfaces, abstract classes, access modifiers and enums, which plain JS does not enforce. Interviewers accept TS anywhere they accept Java.

The existing `currency-conversion/` stays as is (plain JS). Optional exercise in Phase 2: port it to TS and refactor it against SOLID.

---

## How to use this repo

Every problem gets its own folder with the same layout, so each one doubles as interview revision notes:

```
<problem-name>/
  README.md        # requirements, assumptions, class diagram (Mermaid), patterns used, trade-offs
  src/
    models/        # entities + enums
    services/      # business logic
    strategies/    # pluggable behaviour (pricing, allocation, etc.)
    index.ts       # small driver/demo
  test/            # a few unit tests for the core flows
```

Shared tooling at the root (set up once in Phase 0): `typescript`, `ts-node` (or `tsx`), and `jest` with `ts-jest` (or `vitest`).

Rules for every problem:
1. Write the README (requirements + class diagram) **before** any code.
2. Time-box the first attempt to **90 minutes**, the same as a real machine-coding round.
3. After it works, do one "extension" (the follow-up interviewers ask) without rewriting existing classes. If you have to rewrite, note why in the README; that is the lesson.

---

## Phase 0: Setup (1 day)

- [ ] Root `package.json`, `tsconfig.json` (`strict: true`), test runner, `npm test` running across folders.
- [ ] A `_template/` folder with the layout above to copy for each new problem.
- [ ] A Mermaid class-diagram snippet in the template README (GitHub renders it).

## Phase 1: OOP in TypeScript (week 1)

Learn each concept, then write a tiny example under `fundamentals/oop/`.

| Topic | What to be able to explain and show |
|---|---|
| Classes, objects, constructors | Parameter properties, `readonly`, static members |
| Encapsulation | `private` / `protected` / `#private`, getters/setters, why invariants live inside the class |
| Abstraction | `interface` vs `abstract class`, when to pick which |
| Inheritance | `extends`, `super`, method overriding, why deep hierarchies hurt |
| Polymorphism | Runtime (override + interface) vs compile-time (overloads, generics) |
| Composition vs inheritance | "Has-a" vs "is-a"; rewrite one inheritance example using composition |
| Relationships | Association, aggregation, composition, dependency (you will draw these in UML) |
| Generics | `Repository<T>`, constraints (`T extends Entity`) |
| Enums & union types | Modelling states (`OrderStatus`) and type-safe switches with exhaustive checks |
| Errors | Custom error classes, fail-fast validation |

Exit check: explain "interface vs abstract class" and "composition over inheritance" with a code example in under 2 minutes each.

## Phase 2: SOLID + design principles (week 1 to 2)

For each principle: one "bad" file, one "good" file under `fundamentals/solid/`, and a one-line note on what changed.

- [ ] **S**ingle Responsibility
- [ ] **O**pen/Closed (usually solved with Strategy)
- [ ] **L**iskov Substitution (classic: Rectangle/Square, Bird/Penguin)
- [ ] **I**nterface Segregation
- [ ] **D**ependency Inversion (constructor injection; connect it to how NestJS DI works)
- [ ] Also: DRY, KISS, YAGNI, Law of Demeter, "program to an interface"
- [ ] Exercise: port `currency-conversion/` to TS and fix its SOLID issues (e.g. `RatesProvider` interface, fees as a strategy, money as integer minor units instead of floats).

## Phase 3: UML, class modelling and the interview framework (week 2)

**UML you actually need:**
- Class diagram: classes, attributes, methods, visibility, and the four relationships (association, aggregation, composition, inheritance/realisation) with multiplicity.
- Sequence diagram for one key flow (e.g. "book a ticket").
- State diagram for entities with a lifecycle (order, elevator, vending machine).

**The answer framework for every LLD round** (practise saying it out loud):
1. **Clarify requirements** (5 min): functional scope, what is out of scope, scale, concurrency expectations.
2. **Identify entities** (nouns) and **behaviours** (verbs).
3. **Relationships + class diagram**: draw before coding.
4. **Define interfaces/APIs** of the main services.
5. **Pick patterns** only where a requirement asks for flexibility; say why.
6. **Code the core flow** end to end, then fill in the rest.
7. **Edge cases + concurrency**: double booking, race conditions, idempotency.
8. **Extensibility**: walk through how a new requirement plugs in.

## Phase 4: Design patterns (weeks 3 to 4)

Under `fundamentals/patterns/<pattern>/`. For each: the problem it solves, a minimal TS implementation, and a real place you have seen it (NestJS, Node, your own work).

**Must know (appear in most LLD problems):**

| Pattern | Typical use in interviews |
|---|---|
| Strategy | Pricing, payment, parking-spot allocation, split types |
| Factory / Factory Method | Creating vehicles, notifications, payment methods |
| Singleton | Config, logger, in-memory store (and why it hurts testing) |
| Observer | Notifications, event bus, stock price alerts |
| State | Vending machine, elevator, order lifecycle |
| Builder | Complex objects (pizza order, HTTP request, query) |
| Decorator | Add-ons (coffee/pizza toppings), logging/caching wrappers |
| Command | Undo/redo, task queues, remote control |

**Good to know:**

| Pattern | Typical use |
|---|---|
| Adapter | Wrapping third-party payment/rates APIs |
| Facade | One entry point over several subsystems |
| Chain of Responsibility | Logger levels, ATM cash dispenser, approval flows, middleware |
| Template Method | Fixed workflow with overridable steps |
| Composite | File system, org chart, menu trees |
| Proxy | Lazy loading, access control, caching |
| Iterator, Visitor, Memento, Mediator, Prototype, Flyweight | Know the intent and one example each |

Exit check: given a requirement like "support a new payment method without changing checkout", name the pattern and sketch it in 2 minutes.

## Phase 5: Concurrency and robustness in Node/TS (week 4)

SDE-2 rounds often ask "what if two users book the same seat?". Node is single-threaded, but the question still applies.

- [ ] Why race conditions still happen in Node (interleaved `await`s, multiple instances).
- [ ] An in-process mutex/lock (write a small `Mutex` class with promises) and when you'd use a Redis lock or DB constraint instead.
- [ ] Optimistic vs pessimistic locking, idempotency keys, retries.
- [ ] Producer/consumer with a bounded queue; worker pools (`worker_threads`) at a conceptual level.
- [ ] Be ready to explain how the same design looks in Java (`synchronized`, `ReentrantLock`, `ConcurrentHashMap`) since some interviewers think in Java.

## Phase 6: Interview problems (weeks 5 to 10)

Ordered from easier to harder. Each line lists the concepts it drills. Aim for 2 to 3 problems a week.

### Tier 1: warm-up (entities, enums, basic patterns)

| # | Problem | Key concepts |
|---|---|---|
| 1 | Parking Lot | Strategy (spot allocation, fees), Factory, enums, concurrency on spot assignment |
| 2 | Tic-Tac-Toe / N×N | Board modelling, winner check in O(1), player strategy |
| 3 | Snake and Ladder | Game loop, dice abstraction, extensible board entities |
| 4 | Library Management | CRUD services, fines, search, Observer for reservations |
| 5 | Vending Machine | State pattern, inventory, change-making |
| 6 | Logger / Logging Framework | Chain of Responsibility, Singleton, sinks (Strategy) |

### Tier 2: most asked at SDE-2

| # | Problem | Key concepts |
|---|---|---|
| 7 | LRU / LFU Cache | HashMap + doubly linked list, eviction policy as Strategy, generics (ties to your Redis work) |
| 8 | Rate Limiter | Token bucket, sliding window, fixed window as strategies; per-user limits (ties to your API work) |
| 9 | Splitwise (expense sharing) | Split strategies (equal, exact, percent), balance simplification |
| 10 | BookMyShow / Movie Ticket Booking | Seat locking, concurrency, payments, booking state machine |
| 11 | Elevator System | State pattern, scheduling strategy, multiple elevators |
| 12 | Pub-Sub / Message Queue | Topics, partitions, consumer groups, offsets (ties to your Kafka work) |
| 13 | Notification Service | Factory + Strategy per channel, retries, templates, Observer |
| 14 | Food Delivery (Zomato/Swiggy) | Order lifecycle, restaurant/menu modelling, delivery assignment strategy |
| 15 | Ride Sharing (Uber/Ola) | Driver matching strategy, trip state, pricing/surge |

### Tier 3: advanced / company favourites

| # | Problem | Key concepts |
|---|---|---|
| 16 | In-memory Key-Value Store | Get/put/delete, TTL, transactions (begin/commit/rollback) |
| 17 | Chess | Piece hierarchy, move validation, polymorphism done right |
| 18 | Hotel / Meeting-Room Booking | Interval overlap, availability search, cancellation |
| 19 | Online Shopping Cart / Inventory | Cart, discounts (Decorator/Strategy), inventory reservation |
| 20 | Task Scheduler / Job Scheduler | Priority queue, cron-like recurrence, retries |
| 21 | File System (in-memory) | Composite pattern, path parsing, permissions |
| 22 | ATM | State + Chain of Responsibility for cash dispense |
| 23 | Stack Overflow / Social Feed | Users, posts, votes, reputation, feed ranking |
| 24 | Digital Wallet / Payment System | Ledger, idempotency, transactions, refunds |
| 25 | Snake game / Cricbuzz scoreboard / Car rental | Pick based on the target company's known questions |

## Phase 7: Mock rounds and revision (ongoing from week 6)

- [ ] One timed mock a week: pick an unseen problem, 90 minutes, talk out loud, then review against the framework in Phase 3.
- [ ] Keep a `MISTAKES.md`: what you missed (requirement, pattern, edge case) per mock.
- [ ] Before each real interview: reread the READMEs of 5 to 6 Tier 2 problems (diagrams + trade-offs), not the code.

---

## Progress tracker

| Phase | Status |
|---|---|
| 0. Setup | ✅ |
| 1. OOP in TS | 🟡 in progress |
| 2. SOLID | ☐ |
| 3. UML + framework | ☐ |
| 4. Design patterns | ☐ |
| 5. Concurrency | ☐ |
| 6. Problems (0/25) | ☐ |
| 7. Mocks | ☐ |

## Resources

- *Head First Design Patterns* (patterns intuition) and refactoring.guru (pattern reference with TS examples).
- Grokking the Object Oriented Design Interview / similar course for problem walkthroughs.
- GitHub: `ashishps1/awesome-low-level-design` (problem list with solutions in multiple languages, including TS).
- Mermaid class diagram docs for drawing diagrams inside READMEs.
