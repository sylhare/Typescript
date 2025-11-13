import { jwtValidator, userValidator } from '../src/auth';

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authentication', () => {
    const middleware = jwtValidator();
    const next = jest.fn();
    const res: any = {};

    it('returns unless for jwtValidator', () => expect(middleware.unless).toBeDefined());
    it('returns unless for userValidator', () => expect(userValidator().unless).toBeDefined());

    it('sends 401 if jwt is not present', async () => {
      const req: any = { headers: {} };
      await middleware(req, res, next);
      expect(req.user).toBeUndefined();
      expect(next).toHaveBeenCalledTimes(0);
    });
  });
});
