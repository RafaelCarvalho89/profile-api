import { RouteMapType, routes } from './api/Routes';
import { ExpressServer } from './api/ExpressServer';
import { MysqlConnection } from './db/MysqlConnection';
import { mysqlConfig } from './db/MysqlConfig';

export class Application {
  private readonly dbConnection: MysqlConnection;
  private readonly routes: RouteMapType;
  private apiServer: ExpressServer | null = null;

  constructor(private readonly host: string, private readonly port: number) {
    this.dbConnection = new MysqlConnection(mysqlConfig);
    this.routes = routes;
  }

  async start() {
    try {
      await this.dbConnection.connect();

      if (!this.dbConnection.dataSource) {
        throw new Error('Database connection failed');
      }

      this.apiServer = new ExpressServer(
        this.port,
        this.host,
        this.routes,
        this.dbConnection.dataSource
      );

      await this.apiServer.start();
    } catch (error) {
      await this.dbConnection.end();
      console.error(error);
      throw error;
    }
  }
}
