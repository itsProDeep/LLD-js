import { Bike, Car, Truck, Vehicle } from '../exercise';

describe('04 Vehicles', () => {
  it('charges per started hour by vehicle type', () => {
    expect(new Bike('KA01').parkingFee(2)).toBe(20);
    expect(new Car('KA02').parkingFee(1.5)).toBe(40);
  });

  it('adds a surcharge for trucks on top of the base calculation', () => {
    expect(new Truck('KA03').parkingFee(2)).toBe(200);
  });

  it('works through the base type', () => {
    const vs: Vehicle[] = [new Bike('a'), new Car('b'), new Truck('c')];
    expect(vs.map((v) => v.parkingFee(1))).toEqual([10, 20, 150]);
  });
});
