import { Book, BorrowSlipPrinter, Library, Member } from '../exercise';

describe('07 Library relationships', () => {
  it('finds books across shelves', () => {
    const lib = new Library();
    lib.addShelf('Tech').addBook(new Book('Clean Code'));
    lib.addShelf('Fiction').addBook(new Book('Dune'));
    expect(lib.findBook('Dune')?.title).toBe('Dune');
    expect(lib.findBook('Missing')).toBeUndefined();
  });

  it('lets one member borrow and return a book', () => {
    const book = new Book('Clean Code');
    const a = new Member('Asha');
    const b = new Member('Ravi');
    a.borrow(book);
    expect(book.isAvailable).toBe(false);
    expect(() => b.borrow(book)).toThrow('Book not available');
    a.returnBook(book);
    expect(book.isAvailable).toBe(true);
    expect(a.borrowedTitles()).toEqual([]);
    b.borrow(book);
    expect(b.borrowedTitles()).toEqual(['Clean Code']);
  });

  it('prints a borrow slip', () => {
    const m = new Member('Asha');
    const printer = new BorrowSlipPrinter();
    expect(printer.print(m)).toBe('Asha: none');
    m.borrow(new Book('Dune'));
    m.borrow(new Book('Refactoring'));
    expect(printer.print(m)).toBe('Asha: Dune, Refactoring');
  });
});
