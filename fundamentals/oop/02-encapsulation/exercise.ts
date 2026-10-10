// Exercise: Wallet
// - balance starts at 0, exposed only through a `balance` getter.
// - addMoney(amount): throws Error('Amount must be positive') if amount <= 0.
// - pay(amount): throws Error('Amount must be positive') if amount <= 0,
//   throws Error('Insufficient balance') if amount > balance.
// - every successful addMoney/pay is recorded as { type: 'CREDIT' | 'DEBIT', amount }.
// - `history` getter returns a COPY, so callers can't change the wallet's record.
// Test: npx jest fundamentals/oop/02

export interface WalletEntry {
  type: 'CREDIT' | 'DEBIT';
  amount: number;
}

export class Wallet {
  private balancePoint: number = 0;
  private record: WalletEntry[] = [];

  get balance(): number {
    return this.balancePoint;
  }

  get history(): WalletEntry[] {
    return [...this.record];
  }

  addMoney(amount: number): void {
    if (amount <= 0) throw new Error('Amount must be positive');
    this.balancePoint += amount;
    this.record.push({ type: 'CREDIT', amount })
  }

  pay(amount: number): void {
    if (amount <= 0) throw new Error('Amount must be positive');
    if (amount > this.balancePoint) throw new Error('Insufficient balance');
    this.balancePoint -= amount;
    this.record.push({ type: "DEBIT", amount })
  }
}
