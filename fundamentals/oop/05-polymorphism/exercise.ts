// Exercise A: notification channels (runtime polymorphism)
// - interface NotificationSender { send(to: string, message: string): string }
// - EmailSender: returns `EMAIL to ${to}: ${message}`
// - SmsSender:   returns `SMS to ${to}: ${message cut to the first 20 characters}`
// - PushSender:  returns `PUSH to ${to}: ${message}`
// - broadcast(senders, to, message): string[] – calls each sender. No if/else on sender type!
//
// Exercise B: overloads
// - parseDuration(minutes: number): number   -> returns minutes unchanged
// - parseDuration(text: string): number      -> "2h" -> 120, "45m" -> 45, "1h30m" -> 90
// Test: npx jest fundamentals/oop/05

export interface NotificationSender {
  send(to: string, message: string): string;
}

export class EmailSender implements NotificationSender {
  send(to: string, message: string): string {
    throw new Error('TODO');
  }
}

export class SmsSender implements NotificationSender {
  send(to: string, message: string): string {
    throw new Error('TODO');
  }
}

export class PushSender implements NotificationSender {
  send(to: string, message: string): string {
    throw new Error('TODO');
  }
}

export function broadcast(senders: NotificationSender[], to: string, message: string): string[] {
  throw new Error('TODO');
}

export function parseDuration(minutes: number): number;
export function parseDuration(text: string): number;
export function parseDuration(value: number | string): number {
  throw new Error('TODO');
}
