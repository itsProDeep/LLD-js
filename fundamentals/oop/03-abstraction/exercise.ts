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
  constructor(readonly name: string) { }

  abstract area(): number;

  describe(): string {
    return `${this.name} with area ${this.area().toFixed(2)}`;
  }
}

export class Circle extends Shape implements Resizable {
  constructor(public radius: number) {
    super('Circle');
  }

  area(): number {
    const areaTemp: number = Math.PI * this.radius * this.radius;
    return areaTemp;
  }

  scale(factor: number): void {
    this.radius = factor;
  }
}

export class Rectangle extends Shape {
  constructor(readonly width: number, readonly height: number) {
    super('Rectangle');
  }

  area(): number {
    return this.width * this.height;
  }
}
