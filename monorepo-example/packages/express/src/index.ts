import { addPaths, app, publicPath } from './app';
import { addAuthorizationMiddleware } from './auth';
import { Params as UnlessOptions } from 'express-unless';

export const unlessOptions: UnlessOptions = {
  path: publicPath,
};

addAuthorizationMiddleware(app, unlessOptions);
addPaths(app);

app.listen(8080, () => {
  console.log('The application is listening on port 8080!');
});
