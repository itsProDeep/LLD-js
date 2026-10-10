import { Product } from '../exercise';

describe('01 Product', () => {
  beforeEach(() => Product.resetIds());

  it('assigns sequential ids', () => {
    expect(new Product('Pen', 1000).id).toBe('P1');
    expect(new Product('Book', 25000).id).toBe('P2');
  });

  it('restarts ids after reset', () => {
    new Product('Pen', 1000);
    Product.resetIds();
    expect(new Product('Ink', 500).id).toBe('P1');
  });

  it('adds tax rounded to the nearest paisa', () => {
    expect(new Product('Pen', 10000).priceWithTax(18)).toBe(11800);
    expect(new Product('Gum', 999).priceWithTax(5)).toBe(1049);
  });
});
