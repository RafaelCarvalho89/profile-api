import { connection, Connection } from './db/MysqlConfig';
import express, { Application as ExpressApplication } from 'express';

export class Application {
  private readonly dbConnection: Promise<Connection>;
  private readonly apiServer = express();
  private readonly host: string;
  private readonly port: number;

  constructor(host: string, port: number) {
    this.dbConnection = connection;
    this.host = host;
    this.port = port;
  }

  async start() {
    try {
      (await this.dbConnection).connect();

      this.apiServer.get('/ping', (req, res) => {
        return res.send('pong');
      });
      
      this.apiServer.listen(this.port, () => {
        console.log(`[LOG] EXPRESS - Http server listen on http://${this.host}:${this.port}`);
      });
    } catch (error) {
      (await this.dbConnection).end();
      console.error(error);
      throw error;
    }
  }
}
