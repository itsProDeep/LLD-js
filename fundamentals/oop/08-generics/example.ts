// Run: npx ts-node fundamentals/oop/08-generics/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Generics = write the logic once and keep full type safety for every type that uses it.

// A constraint: T must at least have an id.
interface Entity {
  id: string;
}

// The Repository interface is something you'll write in almost every LLD problem.
interface Repository<T extends Entity> {
  save(item: T): void;
  findById(id: string): T | undefined;
  findAll(): T[];
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private store = new Map<string, T>();
  save(item: T) {
    this.store.set(item.id, item);
  }
  findById(id: string) {
    return this.store.get(id);
  }
  findAll() {
    return [...this.store.values()];
  }
}

interface Driver extends Entity {
  name: string;
  rating: number;
}
interface Ride extends Entity {
  driverId: string;
  fare: number;
}

const drivers = new InMemoryRepository<Driver>();
const rides = new InMemoryRepository<Ride>();
drivers.save({ id: 'D1', name: 'Ravi', rating: 4.8 });
rides.save({ id: 'R1', driverId: 'D1', fare: 250 });
console.log(drivers.findById('D1')?.name); // typed as Driver, so .name autocompletes
// drivers.save({ id: 'R2', driverId: 'D1', fare: 1 }); // compile error: not a Driver

// keyof constraint: K must be a real key of T, and the return type follows it.
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((i) => i[key]);
}
const ratings: number[] = pluck(drivers.findAll(), 'rating');
console.log(ratings);
// pluck(drivers.findAll(), 'salary'); // compile error: not a key of Driver

// Generic class with a default type parameter.
class Result<T, E = Error> {
  private constructor(readonly ok: boolean, readonly value?: T, readonly error?: E) {}
  static success<T>(value: T) {
    return new Result<T>(true, value);
  }
  static failure<T>(error: Error) {
    return new Result<T>(false, undefined, error);
  }
}
console.log(Result.success(42).value, Result.failure<number>(new Error('nope')).error?.message);

/*
 Interview soundbites
 - "I define Repository<T> once and reuse it for every entity. Swapping it for a Mongo-backed one later
    doesn't change the services, because they depend on the interface."
 - "Constraints (T extends Entity, K extends keyof T) keep generic code type-safe instead of falling back to any."
*/
