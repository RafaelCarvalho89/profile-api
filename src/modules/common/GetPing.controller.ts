import { apiResponseFactory } from '../../api/Response.factory';
import { Connection } from '../../db/MysqlConfig';

class GetPingController {
  async handle(request: any): Promise<any> {
    return apiResponseFactory('OK', { message: 'pong' });
  }
}

export const GetPongControllerFactory = (dataSource: Connection) => {
  return new GetPingController();
};
