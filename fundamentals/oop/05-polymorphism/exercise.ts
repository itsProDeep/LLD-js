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
    return `EMAIL to ${to}: ${message}`;
  }
}

export class SmsSender implements NotificationSender {
  send(to: string, message: string): string {
    return `SMS to ${to}: ${message.slice(0, 20)}`
  }
}

export class PushSender implements NotificationSender {
  send(to: string, message: string): string {
    return `PUSH to ${to}: ${message}`
  }
}

export function broadcast(senders: NotificationSender[], to: string, message: string): string[] {
  const res: string[] = [];
  senders.forEach((sender) => {
    res.push(sender.send(to, message));
  })
  return res;
}

export function parseDuration(minutes: number): number;
export function parseDuration(text: string): number;
export function parseDuration(value: number | string): number {
  if(typeof(value) === 'string') {
    const regex = /^(?:(\d+)h)?(?:(\d+)m)?$/;
    const matches = value.match(regex);
    if (!matches) {
      throw new Error("Invalid duration format. Expected format like '2h30m', '2h', or '45m'.");
    }

    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;

    return (hours * 60) + minutes;
  }
  return value;
}
