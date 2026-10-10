import { Circle, Rectangle, Shape } from '../exercise';

describe('03 Shapes', () => {
  it('computes areas through the abstract type', () => {
    const shapes: Shape[] = [new Circle(1), new Rectangle(2, 3)];
    expect(shapes.map((s) => s.area())).toEqual([Math.PI, 6]);
  });

  it('describes with two decimals using shared code', () => {
    expect(new Circle(1).describe()).toBe('Circle with area 3.14');
    expect(new Rectangle(2, 3).describe()).toBe('Rectangle with area 6.00');
  });

  it('scales a circle', () => {
    const c = new Circle(1);
    c.scale(2);
    expect(c.area()).toBeCloseTo(4 * Math.PI);
  });
});
