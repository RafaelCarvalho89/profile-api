import { Connection, ConnectionOptions } from 'mysql2/promise';
import 'dotenv/config'

const mysqlConfig: ConnectionOptions = {
  host: process.env.MYSQLDB_HOST,
  port: Number(process.env.MYSQLDB_PORT),
  database: process.env.MYSQLDB_DATABASE,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
};

export { mysqlConfig, Connection };
