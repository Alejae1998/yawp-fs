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
  it('#POST /users should create a new user if none exists', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual(
      'Successfully logged in as a new user!'
    );
  });

  afterAll(() => {
    pool.end();
  });
});
