import { AccountNotFoundError, Bank, DomainError, InsufficientFundsError, InvalidAmountError } from '../exercise';

function makeBank() {
  const bank = new Bank();
  bank.open('A', 1000);
  bank.open('B');
  return bank;
}

function catchError(fn: () => void): unknown {
  try {
    fn();
  } catch (e) {
    return e;
  }
  throw new Error('Expected an error');
}

describe('10 Bank errors', () => {
  it('transfers money', () => {
    const bank = makeBank();
    bank.transfer('A', 'B', 400);
    expect(bank.balanceOf('A')).toBe(600);
    expect(bank.balanceOf('B')).toBe(400);
  });

  it('throws typed errors with codes and names', () => {
    const bank = makeBank();
    const e1 = catchError(() => bank.transfer('A', 'B', 0));
    expect(e1).toBeInstanceOf(InvalidAmountError);
    expect(e1).toBeInstanceOf(DomainError);
    expect((e1 as DomainError).code).toBe('INVALID_AMOUNT');
    expect((e1 as Error).name).toBe('InvalidAmountError');

    const e2 = catchError(() => bank.transfer('A', 'Z', 10));
    expect(e2).toBeInstanceOf(AccountNotFoundError);
    expect((e2 as Error).message).toBe('Account Z not found');

    const e3 = catchError(() => bank.transfer('B', 'A', 10));
    expect(e3).toBeInstanceOf(InsufficientFundsError);
    expect((e3 as DomainError).code).toBe('INSUFFICIENT_FUNDS');
    expect((e3 as Error).message).toBe('Account B has insufficient funds');
  });

  it('leaves balances unchanged when a transfer fails', () => {
    const bank = makeBank();
    expect(() => bank.transfer('A', 'Z', 500)).toThrow();
    expect(() => bank.transfer('A', 'B', 5000)).toThrow();
    expect(bank.balanceOf('A')).toBe(1000);
    expect(bank.balanceOf('B')).toBe(0);
  });
});
