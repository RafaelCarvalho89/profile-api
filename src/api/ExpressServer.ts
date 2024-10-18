import express, { Request, RequestHandler, Response, json } from 'express';
import { ControllerInterface } from './Controller.interface';
import { RequestMethodType } from './Request.types';
import { RouteMapType } from './Routes';
import { Connection } from '../db/MysqlConfig';
import cors from 'cors';

export class ExpressServer {
  private readonly server = express();

  constructor(
    private readonly PORT: number,
    private readonly HOST: string,
    private readonly routes: RouteMapType,
    private readonly dataSource: Connection,
  ) {
    this.server.use(cors(), json());
    this.setRoutes(this.routes);
  }

  async start(): Promise<void> {
    this.server.listen(this.PORT, this.HOST).on('listening', () => {
      console.log(`[LOG] EXPRESS - Http server listen on http://${this.HOST}:${this.PORT}`);
    });
  }

  private setRoutes(routes: RouteMapType): void {
    for(const [routePath, controllerFactory] of Array.from(routes.entries())) {
      const splitedRoutePath = routePath.split(' ');

      const method = splitedRoutePath[0] as RequestMethodType;
      const path = splitedRoutePath[1];

      this.server[method](path, this.adaptRoute(controllerFactory(this.dataSource)));

      console.log(`[LOG] EXPRESS - Configured Route ${method.toUpperCase()} ${path}`);
    }
  }

  private adaptRoute(controller: ControllerInterface): RequestHandler {
    return async (req: Request, res: Response) => {
      const { body, headers, params, query } = req;

      const response = await controller.handle({ body, headers, params, query });

      res.status(response.statusCode).json(response.body);
    };
  }
}
