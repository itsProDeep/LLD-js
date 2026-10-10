// Exercise: generic repository + helpers
// - class InMemoryRepository<T extends { id: string }>
//     save(item): void (insert or replace by id)
//     findById(id): T | undefined
//     findAll(): T[] (in insertion order)
//     delete(id): boolean (true if something was removed)
//     findBy(predicate: (item: T) => boolean): T[]
// - groupBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]>
//     groups items by the value of `key`, keeping order inside each group.
// Test: npx jest fundamentals/oop/08

export class InMemoryRepository<T extends { id: string }> {
  save(item: T): void {
    throw new Error('TODO');
  }

  findById(id: string): T | undefined {
    throw new Error('TODO');
  }

  findAll(): T[] {
    throw new Error('TODO');
  }

  delete(id: string): boolean {
    throw new Error('TODO');
  }

  findBy(predicate: (item: T) => boolean): T[] {
    throw new Error('TODO');
  }
}

export function groupBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]> {
  throw new Error('TODO');
}
