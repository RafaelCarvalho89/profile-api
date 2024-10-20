import { ErrorHandlerInterface, ErrorCauseType, ErrorNameType } from './Error.type';

export class ErrorHandler extends Error implements ErrorHandlerInterface {
  cause: ErrorCauseType;

  constructor(name: ErrorNameType, cause: ErrorCauseType, message?: string, stack?: string) {
    super(message);
    this.name = name;
    this.stack = stack;
    this.cause = cause;
  }
}
