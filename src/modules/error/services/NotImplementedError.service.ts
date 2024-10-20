import { ErrorHandlerInterface } from '../Error.type';
import { ErrorHandler } from '../ErrorHandler';

export class NotImplementedError extends ErrorHandler implements ErrorHandlerInterface {
  constructor() {
    super('NOT_IMPLEMENTED', 'NOT_IMPLEMENTED', 'Not implemented.');
  }
}
