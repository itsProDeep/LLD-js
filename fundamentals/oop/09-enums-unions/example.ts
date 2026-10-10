// Run: npx ts-node fundamentals/oop/09-enums-unions/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Almost every LLD entity has a lifecycle: Order, Booking, Ride, Elevator, Payment.
// Model it explicitly with an enum + an allowed-transitions table, never with loose strings.

enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

const ALLOWED: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.PENDING]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED, BookingStatus.EXPIRED],
  [BookingStatus.CONFIRMED]: [BookingStatus.CANCELLED],
  [BookingStatus.CANCELLED]: [],
  [BookingStatus.EXPIRED]: [],
};

class Booking {
  private _status = BookingStatus.PENDING;
  get status() {
    return this._status;
  }
  moveTo(next: BookingStatus) {
    if (!ALLOWED[this._status].includes(next)) {
      throw new Error(`Cannot go from ${this._status} to ${next}`);
    }
    this._status = next;
  }
}

const b = new Booking();
b.moveTo(BookingStatus.CONFIRMED);
try {
  b.moveTo(BookingStatus.EXPIRED);
} catch (e) {
  console.log((e as Error).message); // Cannot go from CONFIRMED to EXPIRED
}

// String-literal union: a lighter alternative to an enum with no runtime object.
type SeatType = 'REGULAR' | 'PREMIUM' | 'RECLINER';

// Discriminated union: each variant carries different data and `kind` tells them apart.
type PaymentEvent =
  | { kind: 'INITIATED'; amount: number }
  | { kind: 'SUCCEEDED'; amount: number; txnId: string }
  | { kind: 'FAILED'; reason: string };

// Exhaustiveness check: if someone adds a new `kind` and forgets a case, this line fails to COMPILE.
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

function describeEvent(e: PaymentEvent): string {
  switch (e.kind) {
    case 'INITIATED':
      return `Started ₹${e.amount}`;
    case 'SUCCEEDED':
      return `Paid ₹${e.amount} (${e.txnId})`; // TS knows txnId exists only here
    case 'FAILED':
      return `Failed: ${e.reason}`;
    default:
      return assertNever(e);
  }
}

const seat: SeatType = 'PREMIUM';
console.log(seat, describeEvent({ kind: 'SUCCEEDED', amount: 500, txnId: 'T1' }));

/*
 Interview soundbites
 - "I model lifecycles as an enum plus a transition table, so illegal transitions fail loudly in one place."
 - "When the logic per state grows big, I move to the State pattern (Phase 4): one class per state."
 - "Discriminated unions with assertNever give compile-time safety when a new variant is added."
*/
