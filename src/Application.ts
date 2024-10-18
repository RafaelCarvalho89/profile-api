import { RouteMapType, routes } from './api/Routes';
import { ExpressServer } from './api/ExpressServer';
import { MysqlConnection } from './db/MysqlConnection';
import { mysqlConfig } from './db/MysqlConfig';

export class Application {
  private readonly dbConnection;
  private readonly routes: RouteMapType;
  private readonly apiServer;

  constructor(host: string, port: number) {
    this.dbConnection = new MysqlConnection(mysqlConfig);
    this.routes = routes;
    this.apiServer = new ExpressServer(port, host, this.routes, this.dbConnection.dataSource);
  }

  async start() {
    try {
      await this.dbConnection.connect();
      await this.apiServer.start();
    } catch (error) {
      await this.dbConnection.end();
      console.error(error);
      throw error;
    }
  }
}
