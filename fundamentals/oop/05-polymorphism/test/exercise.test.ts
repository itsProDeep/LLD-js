import { broadcast, EmailSender, parseDuration, PushSender, SmsSender } from '../exercise';

describe('05 Polymorphism', () => {
  it('broadcasts through every channel', () => {
    const out = broadcast([new EmailSender(), new SmsSender(), new PushSender()], 'vivek', 'Your order has been shipped');
    expect(out).toEqual([
      'EMAIL to vivek: Your order has been shipped',
      'SMS to vivek: Your order has been ',
      'PUSH to vivek: Your order has been shipped',
    ]);
  });

  it('parses durations from numbers and strings', () => {
    expect(parseDuration(15)).toBe(15);
    expect(parseDuration('2h')).toBe(120);
    expect(parseDuration('45m')).toBe(45);
    expect(parseDuration('1h30m')).toBe(90);
  });
});
