import express, { Request, Response } from 'express';
import { up } from '@project/example';

export const app = express();

export const addPaths = (app: express.Application): void => {
  app.get('/.well-known/health', (req: Request, res: Response): void => {
    res.status(200).send(up);
  });

  app.get('/hello', (req: Request, res: Response): void => {
    res.send(`Hello ${req.query.name}\n`);
  });

  app.get('/', (req: Request, res: Response): void => {
    res.send('App is running');
  });
};

export const publicPath = [
  '/.well-known/health',
  '/',
];
