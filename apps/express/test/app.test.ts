import request from 'supertest';
import { addPaths, app } from '../src/app';
import { addAuthorizationMiddleware } from '../src/auth';
import express from 'express';

describe('App', () => {
  const testApp = app;
  addPaths(testApp);

  it('return 404 on unknown path', async () =>
    expect((await request(testApp).get('/unknown')).status).toEqual(404));

  // eslint-disable-next-line jest/expect-expect
  it('return 200 on root', async () =>
    request(testApp).get('/').expect(200));

  it('should return UP on health check', async () => {
    const response = await request(testApp).get('/.well-known/health');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('UP');
  });

  describe('without authentication', () => {
    it('returns hello world when queried', async () => {
      const response = await request(testApp).get('/hello?name=world');
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('Hello world\n');
    });
  });

  describe('with authentication', () => {
    const appWithAuth = express();
    addAuthorizationMiddleware(appWithAuth, { path: ['/.well-known/health'] });
    addPaths(appWithAuth);

    it('returns 200 on unless paths', async () => {
      const response = await request(appWithAuth).get('/.well-known/health');
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('UP');
    });

    it('returns 401 without jwt token', async () => {
      const response = await request(appWithAuth).get('/hello?name=world');
      expect(response.status).toEqual(401);
    });
  });
});
