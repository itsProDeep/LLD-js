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
  constructor(readonly licensePlate: string) { }

  protected ratePerHour(): number {
    return 0;
  }

  parkingFee(hours: number): number {
    return Math.ceil(hours) * this.ratePerHour();
  }
}

export class Bike extends Vehicle {
  constructor(liscensePlate: string) {
    super(liscensePlate);
  }

  protected override ratePerHour(): number {
    return 10
  }
}

export class Car extends Vehicle {

  constructor(liscenseplate: string) {
    super(liscenseplate);
  }

  protected override ratePerHour(): number {
    return 20;
  }

}

export class Truck extends Vehicle {
  constructor(liscenseplate: string) {
    super(liscenseplate);
  }

  protected override ratePerHour(): number {
    return 50
  }

  override parkingFee(hour: number): number {
    return super.parkingFee(hour) + 100;
  }
}
