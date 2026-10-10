import { Example } from './models/Example';
import { ExampleService } from './services/ExampleService';
import { FormalGreeting } from './strategies/GreetingStrategy';

const service = new ExampleService(new FormalGreeting());
console.log(service.welcome(new Example('1', 'LLD')));
