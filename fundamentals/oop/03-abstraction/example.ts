// Run: npx ts-node fundamentals/oop/03-abstraction/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Abstraction = callers depend on WHAT something does, not HOW it does it.
// TypeScript gives two tools for this.

// 1) interface: a pure contract. No code, no state. A class can implement many.
interface PaymentMethod {
  pay(amountPaise: number): string;
}

class UpiPayment implements PaymentMethod {
  constructor(private vpa: string) {}
  pay(amountPaise: number): string {
    return `Paid ₹${amountPaise / 100} via UPI ${this.vpa}`;
  }
}

class CardPayment implements PaymentMethod {
  constructor(private last4: string) {}
  pay(amountPaise: number): string {
    return `Paid ₹${amountPaise / 100} with card **${this.last4}`;
  }
}

// Checkout knows only the interface, so adding NetBanking later changes nothing here.
function checkout(method: PaymentMethod, amountPaise: number) {
  console.log(method.pay(amountPaise));
}
checkout(new UpiPayment('vivek@upi'), 49900);
checkout(new CardPayment('4242'), 120000);

// 2) abstract class: a partial implementation. It can hold shared state and code,
//    and forces subclasses to fill in the abstract parts. A class can extend only one.
abstract class Notification {
  constructor(protected recipient: string) {}

  // shared, concrete behaviour
  send(message: string): string {
    const body = this.format(message);
    return `[${this.channel()}] to ${this.recipient}: ${body}`;
  }

  // the parts each subclass must provide
  protected abstract channel(): string;
  protected abstract format(message: string): string;
}

class SmsNotification extends Notification {
  protected channel() {
    return 'SMS';
  }
  protected format(message: string) {
    return message.slice(0, 160);
  }
}

class EmailNotification extends Notification {
  protected channel() {
    return 'EMAIL';
  }
  protected format(message: string) {
    return `<p>${message}</p>`;
  }
}

console.log(new SmsNotification('+91-90000').send('Your OTP is 1234'));
console.log(new EmailNotification('a@b.com').send('Welcome!'));
// new Notification('x'); // compile error: cannot instantiate an abstract class

/*
 Interview answer: interface vs abstract class
 - Interface: a contract only, with no state or code; a class can implement many; erased at runtime in TS.
   Use it for capabilities and for dependency boundaries (PaymentMethod, Repository, Strategy).
 - Abstract class: a contract PLUS shared state/code; single inheritance; exists at runtime.
   Use it when subclasses genuinely share an algorithm or fields (Notification.send above).
 - Default: start with an interface. Reach for an abstract class only when there's real shared code.
*/
