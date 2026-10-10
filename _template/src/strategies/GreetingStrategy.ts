import { Example } from '../models/Example';

export interface GreetingStrategy {
  greet(example: Example): string;
}

export class FormalGreeting implements GreetingStrategy {
  greet(example: Example): string {
    return `Hello, ${example.name}.`;
  }
}
