// Exercise: game characters built by composition (no subclasses of Character!)
// - interface Movement { move(): string }   Walk -> "walks", Fly -> "flies", Teleport -> "teleports"
// - interface Attack   { attack(): string } Sword -> "swings a sword", Bow -> "shoots an arrow"
// - class Character(name, movement, attack)
//     act(): string -> `${name} ${movement.move()} and ${attack.attack()}`
//     setMovement(m) / setAttack(a) swap behaviour at runtime
// Test: npx jest fundamentals/oop/06

export interface Movement {
  move(): string;
}

export interface Attack {
  attack(): string;
}

export class Walk implements Movement {
  move(): string {
    throw new Error('TODO');
  }
}

export class Fly implements Movement {
  move(): string {
    throw new Error('TODO');
  }
}

export class Teleport implements Movement {
  move(): string {
    throw new Error('TODO');
  }
}

export class Sword implements Attack {
  attack(): string {
    throw new Error('TODO');
  }
}

export class Bow implements Attack {
  attack(): string {
    throw new Error('TODO');
  }
}

export class Character {
  constructor(readonly name: string, movement: Movement, attack: Attack) {}

  act(): string {
    throw new Error('TODO');
  }

  setMovement(movement: Movement): void {
    throw new Error('TODO');
  }

  setAttack(attack: Attack): void {
    throw new Error('TODO');
  }
}
