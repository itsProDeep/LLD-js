// Exercise: Shapes
// - abstract class Shape with:
//     constructor(readonly name: string)
//     abstract area(): number
//     describe(): string -> `${name} with area ${area rounded to 2 decimals}`, e.g. "Circle with area 3.14"
// - interface Resizable { scale(factor: number): void }
// - class Circle extends Shape implements Resizable  (constructor(radius)) – name "Circle"
// - class Rectangle extends Shape                   (constructor(width, height)) – name "Rectangle"
//   Rectangle is NOT resizable.
// Test: npx jest fundamentals/oop/03

export interface Resizable {
  scale(factor: number): void;
}

export abstract class Shape {
  constructor(readonly name: string) {}

  abstract area(): number;

  describe(): string {
    throw new Error('TODO');
  }
}

export class Circle extends Shape implements Resizable {
  constructor(public radius: number) {
    super('Circle');
  }

  area(): number {
    throw new Error('TODO');
  }

  scale(factor: number): void {
    throw new Error('TODO');
  }
}

export class Rectangle extends Shape {
  constructor(readonly width: number, readonly height: number) {
    super('Rectangle');
  }

  area(): number {
    throw new Error('TODO');
  }
}
