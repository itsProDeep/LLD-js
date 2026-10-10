// Run: npx ts-node fundamentals/oop/10-errors/example.ts

export {}; // makes this file a module so its names don't clash with other files

// Custom errors make failures part of your design: callers can catch a specific failure,
// and the API layer can map each one to an HTTP status (like NestJS exception filters do).

abstract class DomainError extends Error {
  abstract readonly code: string;
  constructor(message: string) {
    super(message);
    this.name = new.target.name; // shows "SeatUnavailableError" in logs instead of "Error"
  }
}

class SeatUnavailableError extends DomainError {
  readonly code = 'SEAT_UNAVAILABLE';
  constructor(readonly seatId: string) {
    super(`Seat ${seatId} is already booked`);
  }
}

class ValidationError extends DomainError {
  readonly code = 'VALIDATION';
}

class Show {
  private booked = new Set<string>();

  book(seatIds: string[]): void {
    // Fail fast: validate everything BEFORE changing any state, so a failure leaves nothing half-done.
    if (seatIds.length === 0) throw new ValidationError('Select at least one seat');
    if (seatIds.length > 10) throw new ValidationError('Max 10 seats per booking');
    const taken = seatIds.find((s) => this.booked.has(s));
    if (taken) throw new SeatUnavailableError(taken);

    seatIds.forEach((s) => this.booked.add(s));
  }
}

const show = new Show();
show.book(['A1', 'A2']);
for (const attempt of [['A2', 'A3'], []]) {
  try {
    show.book(attempt);
  } catch (e) {
    if (e instanceof SeatUnavailableError) console.log(e.name, e.code, e.seatId);
    else if (e instanceof DomainError) console.log(e.name, e.code, e.message);
    else throw e; // never swallow errors you don't understand
  }
}

/*
 Interview soundbites
 - "Validate inputs first, then mutate, so a failed call never leaves partial state (A3 wasn't booked above)."
 - "Domain errors carry a code. The controller maps codes to HTTP statuses, so services stay HTTP-agnostic."
 - "Use exceptions for exceptional paths; for expected outcomes like 'no driver found', return undefined or a Result."
*/
