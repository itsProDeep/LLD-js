import { groupBy, InMemoryRepository } from '../exercise';

interface Spot {
  id: string;
  floor: number;
  size: 'SMALL' | 'LARGE';
  free: boolean;
}

const spots: Spot[] = [
  { id: 'S1', floor: 1, size: 'SMALL', free: true },
  { id: 'S2', floor: 1, size: 'LARGE', free: false },
  { id: 'S3', floor: 2, size: 'SMALL', free: true },
];

describe('08 Generics', () => {
  it('saves, finds, replaces and deletes', () => {
    const repo = new InMemoryRepository<Spot>();
    spots.forEach((s) => repo.save(s));
    expect(repo.findById('S2')?.size).toBe('LARGE');
    repo.save({ ...spots[1], free: true });
    expect(repo.findById('S2')?.free).toBe(true);
    expect(repo.findAll().map((s) => s.id)).toEqual(['S1', 'S2', 'S3']);
    expect(repo.delete('S1')).toBe(true);
    expect(repo.delete('S1')).toBe(false);
    expect(repo.findAll()).toHaveLength(2);
  });

  it('filters with a predicate', () => {
    const repo = new InMemoryRepository<Spot>();
    spots.forEach((s) => repo.save(s));
    expect(repo.findBy((s) => s.free && s.size === 'SMALL').map((s) => s.id)).toEqual(['S1', 'S3']);
  });

  it('groups by a key', () => {
    const byFloor = groupBy(spots, 'floor');
    expect(byFloor.get(1)?.map((s) => s.id)).toEqual(['S1', 'S2']);
    expect(byFloor.get(2)?.map((s) => s.id)).toEqual(['S3']);
  });
});
