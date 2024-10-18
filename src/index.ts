import { Application } from './Application';
import 'dotenv/config';

const main = async () => {
  const host = process.env.API_HOST || 'localhost';
  const port = Number(process.env.API_PORT) || 4568;

  const app = new Application(host, port);
  await app.start();
};

main();
