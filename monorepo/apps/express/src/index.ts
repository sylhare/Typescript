import { app, publicPath } from './app';
import { addAuthorizationMiddleware } from './auth';
import { Params as UnlessOptions } from 'express-unless';

const unlessOptions: UnlessOptions = {
  path: publicPath,
};

addAuthorizationMiddleware(app, unlessOptions);

app.listen(8080, () => {
  console.log('The application is listening on port 8080!');
});
