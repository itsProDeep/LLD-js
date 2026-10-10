// Run: npx ts-node fundamentals/oop/01-classes-objects/example.ts

export {}; // makes this file a module so its names don't clash with other files

// A class is a blueprint; an object is one instance built from it.
class User {
  // static: belongs to the class, shared by all instances.
  private static nextId = 1;

  // readonly: can be set only in the constructor.
  readonly id: string;
  readonly createdAt = new Date();

  // Parameter properties: `public name` declares AND assigns the field in one go.
  constructor(public name: string, private email: string) {
    this.id = `U${User.nextId++}`;
  }

  // Static factory: a named alternative to `new` that can validate first.
  static fromEmail(email: string): User {
    if (!email.includes('@')) throw new Error(`Invalid email: ${email}`);
    return new User(email.split('@')[0], email);
  }

  // Instance method: works on this object's state via `this`.
  describe(): string {
    return `${this.id}: ${this.name} <${this.email}>`;
  }
}

const a = new User('Vivek', 'vivek@example.com');
const b = User.fromEmail('asha@example.com');
console.log(a.describe()); // U1: Vivek <vivek@example.com>
console.log(b.describe()); // U2: asha <asha@example.com>
// a.id = 'X';     // compile error: readonly
// a.email;        // compile error: private

/*
 Interview soundbites
 - "Parameter properties keep entity classes short, which matters in a 90-minute machine-coding round."
 - "I use readonly for identity fields (id, createdAt) so they can't change after creation."
 - "Static members are for class-level state like ID generators; I avoid static for business state
    because it is shared and hard to test."
*/
