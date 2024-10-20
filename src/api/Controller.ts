import { ErrorHandler } from '../modules/error/ErrorHandler';
import { InternalServerError } from '../modules/error/services/InternalServerError.service';
import { NotImplementedError } from '../modules/error/services/NotImplementedError.service';
import { ControllerInterface } from './Controller.interface';
import { RequestType, ResponseType } from './Request.types';
import { apiResponseFactory } from './Response.factory';

export abstract class Controller implements ControllerInterface {
  async handle(request: RequestType): Promise<ResponseType<Record<string, any>>> {
    try {
      throw new NotImplementedError();
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(error: any) {
    const handledError =
      error instanceof ErrorHandler ? error : new InternalServerError(error.stack);

    return apiResponseFactory(
      handledError.cause,
      {
        data: null,
        error: {
          error: handledError.name,
          message: handledError.message,
        }
      },
    );
  }
}
