// Exercise A: order lifecycle
// - enum OrderStatus { CREATED, PAID, SHIPPED, DELIVERED, CANCELLED } (string values = names)
// - Allowed: CREATED -> PAID | CANCELLED,  PAID -> SHIPPED | CANCELLED,  SHIPPED -> DELIVERED.
//   DELIVERED and CANCELLED are final.
// - class Order: starts CREATED.
//     canTransition(to): boolean
//     transition(to): throws Error(`Invalid transition ${from} -> ${to}`) when not allowed
//     history: OrderStatus[] – every status the order has been in, starting with CREATED
//
// Exercise B: discounts as a discriminated union
// - type Discount = { kind: 'FLAT'; amount: number } | { kind: 'PERCENT'; percent: number } | { kind: 'BOGO' }
// - applyDiscount(unitPrice, qty, discount): number
//     FLAT:    unitPrice*qty - amount (never below 0)
//     PERCENT: unitPrice*qty reduced by percent, rounded
//     BOGO:    buy one get one free -> pay for Math.ceil(qty / 2) units
//   Use a switch with an assertNever default.
// Test: npx jest fundamentals/oop/09

export enum OrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class Order {
  get status(): OrderStatus {
    throw new Error('TODO');
  }

  get history(): OrderStatus[] {
    throw new Error('TODO');
  }

  canTransition(to: OrderStatus): boolean {
    throw new Error('TODO');
  }

  transition(to: OrderStatus): void {
    throw new Error('TODO');
  }
}

export type Discount = { kind: 'FLAT'; amount: number } | { kind: 'PERCENT'; percent: number } | { kind: 'BOGO' };

export function applyDiscount(unitPrice: number, qty: number, discount: Discount): number {
  throw new Error('TODO');
}
