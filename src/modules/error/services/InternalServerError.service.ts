import { ErrorHandlerInterface } from '../Error.type';
import { ErrorHandler } from '../ErrorHandler';

export class InternalServerError extends ErrorHandler implements ErrorHandlerInterface {
  constructor(stack: string | undefined) {
    super('INTERNAL_SERVER_ERROR', 'INTERNAL_SERVER_ERROR', 'Internal server error', stack);
  }
}
