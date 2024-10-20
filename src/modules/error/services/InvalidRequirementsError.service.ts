import { ErrorHandlerInterface } from '../Error.type';
import { ErrorHandler } from '../ErrorHandler';

export class InvalidRequirementsError extends ErrorHandler implements ErrorHandlerInterface {
  constructor(paramName: string, extraMessage?: string) {
    const messageBase = `Invalid requirements of: ${paramName}.`;
    const message = extraMessage ? messageBase.concat(` ${extraMessage}`) : messageBase;
    super('INVALID_REQUIREMENTS', 'BAD_REQUEST', message);
  }
}
