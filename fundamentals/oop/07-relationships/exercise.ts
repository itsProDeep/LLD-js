// Exercise: Library
// Model these relationships, then draw them in README.md:
// - Library COMPOSES Shelves: library.addShelf(name) creates and returns a Shelf.
// - Shelf AGGREGATES Books: shelf.addBook(book) takes a Book created outside.
// - Member is ASSOCIATED with the Books they've borrowed.
// - BorrowSlipPrinter DEPENDS on Member only in print(member).
//
// Behaviour:
// - library.findBook(title): Book | undefined – searches every shelf.
// - member.borrow(book): throws Error('Book not available') if it's already borrowed,
//   otherwise marks it unavailable and records it on the member.
// - member.returnBook(book): makes it available again and removes it from the member.
// - member.borrowedTitles(): string[]
// - new BorrowSlipPrinter().print(member) -> `${member.name}: ${titles joined with ", "}` or `${member.name}: none`
// Test: npx jest fundamentals/oop/07

export class Book {
  isAvailable = true;
  constructor(readonly title: string) {}
}

export class Shelf {
  constructor(readonly name: string) {}

  addBook(book: Book): void {
    throw new Error('TODO');
  }

  findBook(title: string): Book | undefined {
    throw new Error('TODO');
  }
}

export class Library {
  addShelf(name: string): Shelf {
    throw new Error('TODO');
  }

  findBook(title: string): Book | undefined {
    throw new Error('TODO');
  }
}

export class Member {
  constructor(readonly name: string) {}

  borrow(book: Book): void {
    throw new Error('TODO');
  }

  returnBook(book: Book): void {
    throw new Error('TODO');
  }

  borrowedTitles(): string[] {
    throw new Error('TODO');
  }
}

export class BorrowSlipPrinter {
  print(member: Member): string {
    throw new Error('TODO');
  }
}
