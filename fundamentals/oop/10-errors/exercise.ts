// Exercise: Bank transfers with domain errors
// - abstract class DomainError extends Error with `abstract readonly code: string`, and name = class name
// - InvalidAmountError      code 'INVALID_AMOUNT'      message 'Amount must be positive'
// - AccountNotFoundError    code 'ACCOUNT_NOT_FOUND'   message `Account ${id} not found`
// - InsufficientFundsError  code 'INSUFFICIENT_FUNDS'  message `Account ${id} has insufficient funds`
// - class Bank
//     open(id: string, initialBalance = 0): void
//     balanceOf(id): number                    (throws AccountNotFoundError)
//     transfer(fromId, toId, amount): void      validates EVERYTHING before moving money,
//                                              so a failed transfer changes no balance.
// Test: npx jest fundamentals/oop/10

export abstract class DomainError extends Error {
  abstract readonly code: string;
}

export class InvalidAmountError extends DomainError {
  readonly code = 'TODO';
}

export class AccountNotFoundError extends DomainError {
  readonly code = 'TODO';
  constructor(id: string) {
    super('TODO');
  }
}

export class InsufficientFundsError extends DomainError {
  readonly code = 'TODO';
  constructor(id: string) {
    super('TODO');
  }
}

export class Bank {
  open(id: string, initialBalance = 0): void {
    throw new Error('TODO');
  }

  balanceOf(id: string): number {
    throw new Error('TODO');
  }

  transfer(fromId: string, toId: string, amount: number): void {
    throw new Error('TODO');
  }
}
