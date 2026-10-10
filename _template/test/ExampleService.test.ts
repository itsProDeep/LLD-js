import { Example } from '../src/models/Example';
import { ExampleService } from '../src/services/ExampleService';
import { FormalGreeting } from '../src/strategies/GreetingStrategy';

describe('ExampleService', () => {
  it('greets using the injected strategy', () => {
    const service = new ExampleService(new FormalGreeting());
    expect(service.welcome(new Example('1', 'LLD'))).toBe('Hello, LLD.');
  });
});
