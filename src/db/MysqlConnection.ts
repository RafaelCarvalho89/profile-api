import { ConnectionOptions, createConnection } from 'mysql2/promise';

export class MysqlConnection {
  readonly dataSource;

  constructor(private readonly connectionOptions: ConnectionOptions) {
    this.dataSource = createConnection(this.connectionOptions);
  }

  async connect() {
    (await this.dataSource)
      .connect()
      .then(() => { console.log('[LOG] DATA BASE CONNECTION - start!') })
      .catch((error) => { throw error });
  }

  async end() {
    (await this.dataSource).end();
  }
}
