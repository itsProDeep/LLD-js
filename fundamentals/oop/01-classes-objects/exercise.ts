// Exercise: Product
// - constructor(name: string, pricePaise: number) – both public readonly.
//   Store money as integer paise, never floats.
// - readonly id auto-generated as "P1", "P2", ... using a static counter.
// - static resetIds(): resets the counter to 1 (used by tests).
// - priceWithTax(ratePercent: number): number – price including tax, rounded to the nearest paisa.
//   e.g. 10000 paise at 18% -> 11800.
// Test: npx jest fundamentals/oop/01

export class Product {
  static nextId = 1;
  readonly id: string;

  constructor(public readonly name: string, public readonly pricePaise: number) {
    this.id = `P${Product.nextId++}`; 
  }

  static resetIds(): void {
    this.nextId = 1;
  }

  priceWithTax(ratePercent: number): number {
    const amount: number = Math.round((ratePercent * this.pricePaise ) / 100 + this.pricePaise);
      return amount;
  }
}
