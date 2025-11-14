import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import express, { NextFunction, Response, Request, RequestHandler } from 'express';
import { Params as UnlessOptions, UnlessRequestHandler, unless } from 'express-unless';

export const jwtValidator = (): UnlessRequestHandler => expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksUri: 'https://my-authz-server/.well-known/jwks.json'
  }) as GetVerificationKey,
  requestProperty: 'user', // To force it on 'req.user', default changed to 'req.auth'
  getToken,
  algorithms: ['RS256']
}) as UnlessRequestHandler;

export function getToken(req: Request): string | undefined {
  const header = req && req.headers && req.headers['authorization'] as string | undefined;
  const splitHeader = header?.split(' ');
  return splitHeader && splitHeader[0] === 'Bearer' ? splitHeader[1] : undefined;
}

export const userValidator = (): UnlessRequestHandler => {
  const middleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) res.status(401).send('Unauthorized').end();
    return next();
  };
  middleware.unless = unless;
  return middleware as UnlessRequestHandler;
};

export const addAuthorizationMiddleware = (app: express.Application, unlessOptions: UnlessOptions): void => {
  app.use(jwtValidator().unless(unlessOptions) as RequestHandler);
  app.use(userValidator().unless(unlessOptions) as RequestHandler);
};
