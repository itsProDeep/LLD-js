import { Wallet } from '../exercise';

describe('02 Wallet', () => {
  it('tracks balance through credits and debits', () => {
    const w = new Wallet();
    w.addMoney(500);
    w.pay(200);
    expect(w.balance).toBe(300);
  });

  it('rejects non-positive amounts', () => {
    const w = new Wallet();
    expect(() => w.addMoney(0)).toThrow('Amount must be positive');
    expect(() => w.pay(-5)).toThrow('Amount must be positive');
  });

  it('rejects overspending and leaves the balance unchanged', () => {
    const w = new Wallet();
    w.addMoney(100);
    expect(() => w.pay(150)).toThrow('Insufficient balance');
    expect(w.balance).toBe(100);
  });

  it('records history and protects it from outside changes', () => {
    const w = new Wallet();
    w.addMoney(100);
    w.pay(40);
    const h = w.history;
    expect(h).toEqual([
      { type: 'CREDIT', amount: 100 },
      { type: 'DEBIT', amount: 40 },
    ]);
    h.push({ type: 'CREDIT', amount: 1_000_000 });
    expect(w.history).toHaveLength(2);
  });
});
