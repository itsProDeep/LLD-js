// Run: npx ts-node fundamentals/oop/07-relationships/example.ts

export {}; // makes this file a module so its names don't clash with other files
// See README.md in this folder for the UML symbol of each relationship.

// 1) DEPENDENCY ("uses temporarily"): a class uses another only inside a method, without keeping it.
class InvoicePrinter {
  print(order: Order): string {
    return `Invoice for ${order.id}: ${order.total()}`;
  }
}

// 2) ASSOCIATION ("knows about"): a long-lived link between independent objects.
//    A Customer and an Order refer to each other but neither owns the other.
class Customer {
  constructor(readonly name: string) {}
}

// 3) COMPOSITION ("owns, same lifetime"): Order CREATES its line items and they die with it.
//    Nobody outside holds an OrderItem on its own.
class OrderItem {
  constructor(readonly sku: string, readonly qty: number, readonly pricePaise: number) {}
}

class Order {
  private items: OrderItem[] = [];
  constructor(readonly id: string, readonly customer: Customer /* association */) {}

  addItem(sku: string, qty: number, pricePaise: number) {
    this.items.push(new OrderItem(sku, qty, pricePaise)); // composition: created inside
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.qty * i.pricePaise, 0);
  }
}

// 4) AGGREGATION ("has, but doesn't own"): a Team holds Players that exist on their own.
//    Delete the team and the players still exist (and can join another team).
class Player {
  constructor(readonly name: string) {}
}
class Team {
  private players: Player[] = [];
  constructor(readonly name: string) {}
  add(p: Player) {
    this.players.push(p); // aggregation: passed in from outside
  }
  size() {
    return this.players.length;
  }
}

const vivek = new Customer('Vivek');
const order = new Order('O-1', vivek);
order.addItem('PEN', 2, 1000);
order.addItem('BOOK', 1, 25000);
console.log(new InvoicePrinter().print(order)); // Invoice for O-1: 27000

const rohit = new Player('Rohit');
const india = new Team('India');
const mi = new Team('MI');
india.add(rohit);
mi.add(rohit); // the same player in two teams: only possible because it's aggregation
console.log(india.size(), mi.size());

/*
 Interview soundbites
 - "Composition vs aggregation is about lifetime: if the part can't exist without the whole, it's composition."
 - "In code, composition usually means the whole creates the part; aggregation means the part is passed in."
 - "Dependency is the weakest link: a method parameter or local. Prefer it when you don't need to hold state."
*/
