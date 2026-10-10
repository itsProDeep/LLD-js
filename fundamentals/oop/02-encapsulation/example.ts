// Run: npx ts-node fundamentals/oop/02-encapsulation/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Encapsulation = hide state, expose behaviour, and keep invariants inside the class.
// Invariant here: balance is never negative. No caller can break it, because no caller can touch it.
class BankAccount {
  private balancePaise = 0; // TS `private`: checked at compile time only.
  #pin: string; // JS `#private`: truly hidden at runtime as well.

  constructor(readonly owner: string, pin: string) {
    this.#pin = pin;
  }

  // Getter: read-only view. There's no setter, so balance changes only through deposit/withdraw.
  get balance(): number {
    return this.balancePaise;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Deposit must be positive');
    this.balancePaise += amount;
  }

  withdraw(amount: number, pin: string): void {
    if (pin !== this.#pin) throw new Error('Wrong PIN');
    if (amount <= 0) throw new Error('Withdrawal must be positive');
    if (amount > this.balancePaise) throw new Error('Insufficient balance');
    this.balancePaise -= amount;
  }
}

const acc = new BankAccount('Vivek', '1234');
acc.deposit(5000);
acc.withdraw(2000, '1234');
console.log(acc.balance); // 3000
try {
  acc.withdraw(10000, '1234');
} catch (e) {
  console.log((e as Error).message); // Insufficient balance
}
// acc.balance = 1_000_000; // compile error: no setter

// Leaky encapsulation, a common interview mistake: returning an internal array lets callers mutate it.
class Cart {
  private items: string[] = [];
  add(item: string) {
    this.items.push(item);
  }
  getItems(): readonly string[] {
    return [...this.items]; // return a copy (or ReadonlyArray), never the field itself
  }
}
const cart = new Cart();
cart.add('pen');
console.log(cart.getItems());

/*
 Interview soundbites
 - "State is private; the class exposes intent-revealing methods (deposit/withdraw), not setters."
 - "Validation lives where the data lives, so every path is protected."
 - "TS `private` is compile-time only; `#field` is enforced at runtime. In interviews either is fine."
*/
