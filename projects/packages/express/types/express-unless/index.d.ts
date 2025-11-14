declare module 'express-unless' {
  import { RequestHandler, Request, Response, NextFunction } from 'express';

  export interface Params {
    path?: string | string[] | RegExp | RegExp[];
    method?: string | string[];
    ext?: string | string[];
    custom?: (req: any) => boolean;
    useOriginalUrl?: boolean;
  }

  export type UnlessRequestHandler = {
    (req: Request, res: Response, next: NextFunction): void | Promise<void>;
    unless: typeof unless;
  };

  export function unless(this: RequestHandler, options: Params): RequestHandler;
}

