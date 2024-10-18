import { ConnectionOptions, createConnection, Connection } from 'mysql2/promise';

export class MysqlConnection {
  public dataSource: Connection | null = null;

  constructor(private readonly connectionOptions: ConnectionOptions) {}

  async connect() {
    try {
      this.dataSource = await createConnection(this.connectionOptions);
      console.log('[LOG] DATA BASE CONNECTION - start!');
    } catch (error) {
      console.error('[ERROR] DATA BASE CONNECTION - failed!');
      throw error;
    }
  }

  async end() {
    if (this.dataSource) {
      await this.dataSource.end();
    }
  }
}
