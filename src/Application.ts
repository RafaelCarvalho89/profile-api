import { connection, Connection } from './db/MysqlConfig';
import { RouteMapType, routes } from './api/Routes';
import { ExpressServer } from './api/ExpressServer';

export class Application {
  private readonly dbConnection: Promise<Connection>;
  private readonly routes: RouteMapType;
  private readonly apiServer;

  constructor(host: string, port: number) {
    this.dbConnection = connection;
    this.routes = routes;
    this.apiServer = new ExpressServer(port, host, this.routes, this.dbConnection);
  }

  async start() {
    try {
      (await this.dbConnection).connect();
      await this.apiServer.start();
    } catch (error) {
      (await this.dbConnection).end();
      console.error(error);
      throw error;
    }
  }
}
