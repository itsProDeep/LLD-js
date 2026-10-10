import { applyDiscount, Order, OrderStatus } from '../exercise';

describe('09 Order lifecycle', () => {
  it('follows the happy path and records history', () => {
    const o = new Order();
    expect(o.status).toBe(OrderStatus.CREATED);
    o.transition(OrderStatus.PAID);
    o.transition(OrderStatus.SHIPPED);
    o.transition(OrderStatus.DELIVERED);
    expect(o.history).toEqual(['CREATED', 'PAID', 'SHIPPED', 'DELIVERED']);
  });

  it('rejects invalid transitions', () => {
    const o = new Order();
    expect(o.canTransition(OrderStatus.SHIPPED)).toBe(false);
    expect(() => o.transition(OrderStatus.SHIPPED)).toThrow('Invalid transition CREATED -> SHIPPED');
    o.transition(OrderStatus.CANCELLED);
    expect(o.canTransition(OrderStatus.PAID)).toBe(false);
  });

  it('cannot cancel once shipped', () => {
    const o = new Order();
    o.transition(OrderStatus.PAID);
    o.transition(OrderStatus.SHIPPED);
    expect(o.canTransition(OrderStatus.CANCELLED)).toBe(false);
  });
});

describe('09 Discounts', () => {
  it('applies each discount kind', () => {
    expect(applyDiscount(100, 3, { kind: 'FLAT', amount: 50 })).toBe(250);
    expect(applyDiscount(100, 1, { kind: 'FLAT', amount: 500 })).toBe(0);
    expect(applyDiscount(999, 1, { kind: 'PERCENT', percent: 10 })).toBe(899);
    expect(applyDiscount(100, 3, { kind: 'BOGO' })).toBe(200);
    expect(applyDiscount(100, 4, { kind: 'BOGO' })).toBe(200);
  });
});
