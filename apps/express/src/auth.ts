import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import express, { NextFunction, Response, Request } from 'express';
import { Params as UnlessOptions, unless } from 'express-unless';

type UnlessRequestHandler = express.RequestHandler & { unless: typeof unless };

export const jwtValidator = (): UnlessRequestHandler => expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksUri: 'https://my-authz-server/.well-known/jwks.json'
  }) as GetVerificationKey,
  requestProperty: 'user',
  getToken,
  algorithms: ['RS256']
});

export function getToken(req: Request): string | undefined {
  const header = req && req.headers && req.headers['Authorization'] as string | undefined;
  const splitHeader = header?.split(' ');
  return splitHeader && splitHeader[0] === 'Bearer' ? splitHeader[1] : undefined;
}

export const userValidator = (): UnlessRequestHandler => {
  const middleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) res.status(401).send('Unauthorized').end();
    return next();
  };
  middleware.unless = unless;
  return middleware;
};

export const addAuthorizationMiddleware = (app: express.Application, unlessOptions: UnlessOptions): void => {
  app.use(jwtValidator().unless(unlessOptions));
  app.use(userValidator().unless(unlessOptions));
};
