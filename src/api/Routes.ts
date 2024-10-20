import { ControllerFactoryType } from './Controller.interface';
import { GetPongControllerFactory } from '../modules/common/GetPing.controller';
import { PostProfileCompanyControllerFactory } from '../modules/profile-company/PostProfileCompany.factory';

export type RouteMapType = Map<string, ControllerFactoryType>;

export const routes: RouteMapType = new Map<string, ControllerFactoryType>([
  ['get /api/v1/ping', GetPongControllerFactory],
  ['post /api/v1/profiles/companies/:profileCategory', PostProfileCompanyControllerFactory],
]);
