// Run: npx ts-node fundamentals/oop/05-polymorphism/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Polymorphism = one call, many behaviours.

// 1) Runtime polymorphism (subtype): the object decides at runtime which method runs.
interface DiscountRule {
  apply(totalPaise: number): number;
}
class NoDiscount implements DiscountRule {
  apply(total: number) {
    return total;
  }
}
class FlatOff implements DiscountRule {
  constructor(private off: number) {}
  apply(total: number) {
    return Math.max(0, total - this.off);
  }
}
class PercentOff implements DiscountRule {
  constructor(private pct: number) {}
  apply(total: number) {
    return Math.round(total * (1 - this.pct / 100));
  }
}

// No if/else on "type": each rule knows its own behaviour. This is the root of the Strategy pattern.
const rules: DiscountRule[] = [new NoDiscount(), new FlatOff(5000), new PercentOff(10)];
rules.forEach((r) => console.log(r.constructor.name, r.apply(100000)));

// 2) Compile-time polymorphism: overloads. Several signatures, one implementation.
function area(side: number): number;
function area(width: number, height: number): number;
function area(a: number, b?: number): number {
  return b === undefined ? a * a : a * b;
}
console.log(area(4), area(2, 5)); // 16 10

// 3) Parametric polymorphism: generics. The same code works for any type (more in topic 08).
function first<T>(items: T[]): T | undefined {
  return items[0];
}
console.log(first([3, 2, 1]), first(['x', 'y']));

/*
 Interview soundbites
 - "Whenever I see a switch on a type field, I ask whether it should be a polymorphic call instead.
    Adding a new type then means adding a class, not editing a switch (Open/Closed)."
 - "TS overloads are compile-time only: there's one runtime implementation that branches on its arguments."
*/
