import express, { Request, Response } from 'express';
import { up } from '@monorepo/example';

export const app = express();

app.get('/.well-known/health', (req: Request, res: Response): void => {
  res.status(200).send(up);
});

app.get('/hello', (req: Request, res: Response): void => {
  res.send(`Hello ${req.query.name}\n`);
});

app.get('/', (req: Request, res: Response): void => {
  res.send('App is running');
});

export const publicPath = [
  '/.well-known/health',
  '/',
];
