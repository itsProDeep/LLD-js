// Run: npx ts-node fundamentals/oop/06-composition-vs-inheritance/example.ts

export {}; // makes this file a module so its names don't clash with other files

// The problem with inheritance for combinations of behaviour:
//   Duck -> FlyingDuck, SwimmingDuck, FlyingSwimmingDuck, QuackingFlyingDuck ...
// Every new combination needs a new subclass ("class explosion").

// Composition = "has-a". The object HOLDS behaviour objects and delegates to them.
interface FlyBehaviour {
  fly(): string;
}
class FlyWithWings implements FlyBehaviour {
  fly() {
    return 'flaps wings';
  }
}
class CannotFly implements FlyBehaviour {
  fly() {
    return 'stays on the ground';
  }
}
class RocketPowered implements FlyBehaviour {
  fly() {
    return 'zooms with a rocket';
  }
}

interface SoundBehaviour {
  sound(): string;
}
class Quack implements SoundBehaviour {
  sound() {
    return 'quack';
  }
}
class Squeak implements SoundBehaviour {
  sound() {
    return 'squeak';
  }
}

class Duck {
  constructor(readonly name: string, private flyer: FlyBehaviour, private voice: SoundBehaviour) {}

  perform(): string {
    return `${this.name} ${this.flyer.fly()} and says ${this.voice.sound()}`;
  }

  // Behaviour can change at RUNTIME, which inheritance can't do.
  setFlyBehaviour(f: FlyBehaviour) {
    this.flyer = f;
  }
}

const mallard = new Duck('Mallard', new FlyWithWings(), new Quack());
const rubber = new Duck('Rubber duck', new CannotFly(), new Squeak());
console.log(mallard.perform());
console.log(rubber.perform());
rubber.setFlyBehaviour(new RocketPowered());
console.log(rubber.perform());

/*
 Interview answer: composition over inheritance
 - Inheritance fixes behaviour at compile time and couples the child to the parent's internals.
 - Composition lets me mix behaviours freely, swap them at runtime, and test each piece alone
   (inject a fake FlyBehaviour in a unit test).
 - 2 fly options x 2 sound options = 4 small classes instead of 4+ subclasses, and it grows additively.
 - I still use inheritance for a clean, shallow is-a (Car is a Vehicle). For "can do X", I compose.
 - This is exactly the Strategy pattern, which you'll use in most LLD problems.
*/
