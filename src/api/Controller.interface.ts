import { RequestType, ResponseType } from './Request.types';

export interface ControllerInterface {
  handle(request: RequestType): Promise<ResponseType<Record<string, any>>>;
}

export type ControllerFactoryType = (dataSource: any) => ControllerInterface;
