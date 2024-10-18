import mysql, { Connection } from 'mysql2/promise';
import 'dotenv/config'

const connection: Promise<Connection> = mysql.createConnection({
  host: process.env.MYSQLDB_HOST,
  port: Number(process.env.MYSQLDB_PORT),
  database: process.env.MYSQLDB_DATABASE,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
});

export { connection, Connection };
