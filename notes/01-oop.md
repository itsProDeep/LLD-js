# OOP Revision Notes

Quick revision before an interview. Each topic has a plain definition, the key points, a one-line interview answer, and where the code lives in `fundamentals/oop/`.

---

## 1. Class and object

**Definition:** A **class** is a blueprint that describes what data something has and what it can do. An **object** is one real thing built from that blueprint.

- `constructor` sets up a new object.
- **Parameter properties** (`constructor(public name: string)`) declare and assign a field in one line.
- `readonly` fields can be set only once, in the constructor. Use them for identity like `id` and `createdAt`.
- `static` members belong to the class, not to each object, for example an ID counter.
- A **static factory** (`User.fromEmail()`) is a named way to create an object that can validate first.

**Say it:** "A class defines state and behaviour; objects are instances. I make identity fields readonly and keep business state out of statics because statics are shared and hard to test."

Code: `01-classes-objects`

---

## 2. Encapsulation

**Definition:** An object keeps its data private and lets the outside world change it only through methods the object controls. Those methods enforce the rules, so the object can never end up in an invalid state.

- **Invariant:** a rule that must always be true, like "balance is never negative".
- Hide the data (`private` / `#private`) and expose **behaviour** (`deposit`, `withdraw`), not setters.
- Put validation inside the class, so every caller goes through the same checks.
- Use getters for read-only access.
- Never return an internal array or object directly. Return a copy, or callers can change it behind your back.
- `private` is checked only by TypeScript at compile time. `#field` is also hidden at runtime.

**Example:** `BankAccount` keeps `balance` private. The only way to change it is `deposit()` or `withdraw()`, which reject invalid amounts, a wrong PIN, or overdrawing.

**Say it:** "State is private, the class exposes intent-revealing methods, and every invariant is enforced inside the class, so no caller can break it."

Code: `02-encapsulation`

---

## 3. Abstraction

**Definition:** Showing **what** something does and hiding **how** it does it. Callers depend on a simple contract, not on the details.

- **Interface:** a pure contract with no code and no state. A class can implement many interfaces.
- **Abstract class:** a contract plus some shared code and state. It can't be created with `new`, and a class can extend only one.
- Example: `checkout(method: PaymentMethod)` works with UPI, card or anything new, because it knows only the `pay()` contract.

**Interface vs abstract class:**

| | Interface | Abstract class |
|---|---|---|
| Contains | Method signatures only | Signatures + shared code + fields |
| How many per class | Many | One |
| Exists at runtime | No (erased by TS) | Yes |
| Use for | Capabilities, dependency boundaries (Repository, Strategy) | Subclasses that genuinely share an algorithm |

**Say it:** "I start with an interface. I use an abstract class only when the subclasses really share code."

Code: `03-abstraction`

---

## 4. Inheritance

**Definition:** A class (child) reuses and specialises another class (parent). It models an **"is-a"** relationship: a Manager *is an* Employee.

- `extends` to inherit, `super(...)` to call the parent's constructor or methods.
- `protected` members are visible to children but hidden from outside.
- `override` marks a method that replaces the parent's version.
- **Danger:** a child that can't keep the parent's promise. A `Penguin` that throws in `fly()` breaks every caller that trusts `Bird.fly()`. This is a Liskov violation, covered in SOLID.
- Deep hierarchies are fragile: a change at the top ripples down everywhere.

**Say it:** "I use inheritance only for a true is-a where the child can replace the parent anywhere, and I keep it to one or two levels."

Code: `04-inheritance`

---

## 5. Polymorphism

**Definition:** "Many forms". The same method call does different things depending on which object receives it.

- **Runtime (subtype):** `rule.apply(total)` runs FlatOff's or PercentOff's version depending on the actual object. This is what removes `if/else` and `switch` on type.
- **Compile-time (overloading):** one function with several signatures, like `area(side)` and `area(width, height)`. In TS there's still only one runtime implementation.
- **Parametric (generics):** the same code works for any type, like `first<T>(items: T[])`.

**Say it:** "When I see a switch on a type field, I replace it with a polymorphic call. Adding a new type then means adding a class, not editing existing code."

Code: `05-polymorphism`

---

## 6. Composition over inheritance

**Definition:** Build an object by **giving it** other objects that do parts of the work ("has-a"), instead of inheriting behaviour from a parent ("is-a").

- The problem with inheritance: every mix of behaviours needs a new subclass (FlyingQuackingDuck, NonFlyingSqueakingDuck...). This is called class explosion.
- With composition, a `Duck` holds a `FlyBehaviour` and a `SoundBehaviour` and delegates to them.
- You can swap behaviour **at runtime** (`setFlyBehaviour(...)`).
- Each behaviour is small and testable alone, and you can inject a fake in tests.
- This is exactly the **Strategy pattern**, used in most LLD problems.

**Say it:** "Inheritance locks behaviour in at compile time and couples child to parent. Composition lets me mix and swap behaviours freely. I inherit for a clean is-a and compose for 'can do X'."

Code: `06-composition-vs-inheritance`

---

## 7. Relationships between classes

**Definition:** How classes are connected. You draw these in every UML class diagram.

| Relationship | Plain meaning | Lifetime | Example |
|---|---|---|---|
| **Dependency** | Uses it briefly | No link kept | `InvoicePrinter.print(order)` gets Order as a parameter |
| **Association** | Knows about it | Both independent | Order refers to its Customer |
| **Aggregation** | Has it, but doesn't own it | Part can outlive the whole | Team has Players; a player can be in two teams |
| **Composition** | Owns it | Part dies with the whole | Order creates its OrderItems |
| **Inheritance** | Is a | n/a | Car extends Vehicle |
| **Realisation** | Implements | n/a | UpiPayment implements PaymentMethod |

- Quick test for **aggregation vs composition:** can the part exist without the whole? Yes means aggregation, no means composition.
- In code, composition usually means the whole **creates** the parts; aggregation means the parts are **passed in**.

**Say it:** "Composition vs aggregation is about lifetime: if the part can't exist without the whole, it's composition."

Code: `07-relationships` (its README has the UML symbols)

---

## 8. Generics

**Definition:** Write code once with a **type placeholder** (`T`), and get full type safety for every type that uses it.

- `Repository<T>` gives one in-memory store for Users, Drivers, Rides and so on.
- **Constraints** limit what `T` can be: `T extends { id: string }` guarantees every item has an `id`.
- `K extends keyof T` means `K` must be a real property name of `T`, so typos fail at compile time.
- Generics avoid `any`, which would throw away type checking.

**Say it:** "I define Repository<T> once and reuse it for every entity. Services depend on the interface, so swapping in a Mongo-backed repository later doesn't change them."

Code: `08-generics`

---

## 9. Enums and union types

**Definition:** Ways to say a value can be **only one of a fixed set** of options.

- **Enum:** a named set of constants, like `OrderStatus.PAID`. Great for lifecycles.
- **String-literal union:** `type SeatType = 'REGULAR' | 'PREMIUM'`. Lighter, with no runtime object.
- **Discriminated union:** each variant has a `kind` field and its own data. TS knows which fields exist after you check `kind`.
- **Exhaustive check (`assertNever`):** if someone adds a new variant and forgets to handle it, the code fails to compile.
- **State + transition table:** list which status can move to which, and reject everything else in one place.

**Say it:** "I model lifecycles as an enum plus a transition table, so illegal transitions fail in one place. When per-state logic grows, I switch to the State pattern."

Code: `09-enums-unions`

---

## 10. Errors

**Definition:** Custom error classes turn failures into a deliberate, named part of your design instead of generic crashes.

- A base `DomainError` with a `code`, and specific subclasses like `InsufficientFundsError`.
- Callers can catch a specific failure with `instanceof`.
- An API layer can map each code to an HTTP status, like NestJS exception filters.
- **Fail fast:** validate everything **before** changing any state, so a failed operation never leaves half-done changes.
- Never silently swallow an error you don't understand. Rethrow it.
- Use exceptions for exceptional cases. For expected outcomes like "no driver found", return `undefined` or a Result.

**Say it:** "I validate first and mutate last, so a failure leaves no partial state. Domain errors carry a code, and the controller maps codes to HTTP statuses."

Code: `10-errors`

---

## The four pillars in one breath

- **Encapsulation:** hide data, protect rules.
- **Abstraction:** expose what, hide how.
- **Inheritance:** reuse through is-a.
- **Polymorphism:** one call, many behaviours.

Plus the rule that ties them together for LLD: **prefer composition over inheritance, and program to interfaces.**
