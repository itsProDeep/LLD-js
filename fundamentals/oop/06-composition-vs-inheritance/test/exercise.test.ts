import { Attack, Bow, Character, Fly, Sword, Teleport, Walk } from '../exercise';

describe('06 Composition', () => {
  it('combines behaviours', () => {
    expect(new Character('Knight', new Walk(), new Sword()).act()).toBe('Knight walks and swings a sword');
    expect(new Character('Elf', new Fly(), new Bow()).act()).toBe('Elf flies and shoots an arrow');
  });

  it('swaps behaviour at runtime', () => {
    const mage = new Character('Mage', new Walk(), new Bow());
    mage.setMovement(new Teleport());
    expect(mage.act()).toBe('Mage teleports and shoots an arrow');
  });

  it('accepts any Attack, including a test fake', () => {
    const fake: Attack = { attack: () => 'tickles' };
    const c = new Character('Jester', new Walk(), new Sword());
    c.setAttack(fake);
    expect(c.act()).toBe('Jester walks and tickles');
  });
});
