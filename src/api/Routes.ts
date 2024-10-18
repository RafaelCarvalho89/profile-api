import { ControllerFactoryType } from './Controller.interface';
import { GetPongControllerFactory } from '../modules/common/GetPing.controller';

export type RouteMapType = Map<string, ControllerFactoryType>;

export const routes: RouteMapType = new Map<string, ControllerFactoryType>([
  ['get /api/v1/ping', GetPongControllerFactory],
]);
