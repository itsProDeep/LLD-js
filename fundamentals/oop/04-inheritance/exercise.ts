// Exercise: Vehicles for a parking lot (a warm-up for the Parking Lot problem)
// - class Vehicle(licensePlate: string)
//     protected ratePerHour(): number           -> 0 in the base class
//     parkingFee(hours: number): number          -> Math.ceil(hours) * ratePerHour()
// - Bike  overrides ratePerHour -> 10
// - Car   overrides ratePerHour -> 20
// - Truck overrides ratePerHour -> 50 AND overrides parkingFee to add a flat 100 surcharge,
//   reusing the parent's calculation with super.
// Note: tsconfig has noImplicitOverride, so write `protected override ratePerHour()`.
// Test: npx jest fundamentals/oop/04

export class Vehicle {
  constructor(readonly licensePlate: string) {}

  protected ratePerHour(): number {
    throw new Error('TODO');
  }

  parkingFee(hours: number): number {
    throw new Error('TODO');
  }
}

export class Bike extends Vehicle {}

export class Car extends Vehicle {}

export class Truck extends Vehicle {}
