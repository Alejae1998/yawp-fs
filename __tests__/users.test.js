const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@example.com',
  password: '123456',
};

describe('users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it.skip('#POST /users should create a new user if none exists', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Successfully logged in as a new user!',
      user: {
        id: expect.any(String),
        email,
      },
    });
    it('#POST /users/session should log in is user already exist', async () => {
      const res = await (
        await request(app).post('/api/v1/users/sessions')
      ).setEncoding({
        email: 'test2@example.com',
        password: 'fakePasswordHash',
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual('Welcome!');
    });
  });
});
