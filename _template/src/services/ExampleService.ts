import { Example } from '../models/Example';
import { GreetingStrategy } from '../strategies/GreetingStrategy';

export class ExampleService {
  constructor(private readonly greeting: GreetingStrategy) {}

  welcome(example: Example): string {
    return this.greeting.greet(example);
  }
}
