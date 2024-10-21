import { ErrorHandlerInterface } from '../Error.type';
import { ErrorHandler } from '../ErrorHandler';

export class ConflictValueError extends ErrorHandler implements ErrorHandlerInterface {
  constructor(paramName: string, extraMessage?: string) {
    const messageBase = `Conflict value of: ${paramName}.`;
    const message = extraMessage ? messageBase.concat(` ${extraMessage}`) : messageBase;
    super('CONFLICT', 'CONFLICT', message);
  }
}