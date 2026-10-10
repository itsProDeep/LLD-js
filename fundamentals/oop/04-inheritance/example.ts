// Run: npx ts-node fundamentals/oop/04-inheritance/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Inheritance = "is-a". A subclass reuses and specialises its parent.
class Employee {
  constructor(readonly name: string, protected baseSalary: number) {}

  // protected: visible to subclasses, hidden from outside callers.
  protected bonus(): number {
    return 0;
  }

  monthlyPay(): number {
    return this.baseSalary + this.bonus();
  }

  toString(): string {
    return `${this.name} earns ${this.monthlyPay()}`;
  }
}

class Manager extends Employee {
  private reports: Employee[] = [];

  constructor(name: string, baseSalary: number, private bonusPerReport: number) {
    super(name, baseSalary); // must call super() before using `this`
  }

  addReport(e: Employee) {
    this.reports.push(e);
  }

  // `override` (enabled by noImplicitOverride) makes intent explicit and catches typos.
  protected override bonus(): number {
    return this.reports.length * this.bonusPerReport;
  }

  override toString(): string {
    return `${super.toString()} and manages ${this.reports.length}`; // reuse parent logic via super
  }
}

const m = new Manager('Asha', 100000, 5000);
m.addReport(new Employee('Ravi', 60000));
m.addReport(new Employee('Neha', 65000));
console.log(m.toString()); // Asha earns 110000 and manages 2

// Where inheritance goes wrong: a subclass that can't honour the parent's promise.
class Bird {
  fly(): string {
    return 'flying';
  }
}
class Penguin extends Bird {
  override fly(): string {
    throw new Error("Penguins can't fly"); // breaks callers that trust Bird.fly(): an LSP violation (Phase 2)
  }
}
try {
  [new Bird(), new Penguin()].forEach((b) => console.log(b.fly()));
} catch (e) {
  console.log((e as Error).message);
}

/*
 Interview soundbites
 - "I use inheritance only for a true is-a relationship where the subclass can be used anywhere the parent is."
 - "I keep hierarchies shallow, 1-2 levels. Deep trees are fragile: a change in the base ripples everywhere."
 - "When different subclasses need different combinations of behaviour, I switch to composition (topic 06)."
*/
