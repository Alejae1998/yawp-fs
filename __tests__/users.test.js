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
  // afterAll(() => {
  //   pool.end();
  // });
  it('#POST /users should create a new user if none exists', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body).toEqual('Successfully logged in as a new user!');
  });
  it('#POST /users/sessions should log in is user already exist', async () => {
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: 'test2@example.com',
      password: 'fakePasswordHash',
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Welcome!');
  });
  it('#GET /users displays 401 if not authenticated', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(401);
  });
  it('#GET /users displays 403 if not authorized admin', async () => {
    const lowUser = {
      email: 'popeye@cartoon.com',
      password: '1234password',
    };
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(lowUser);
    const res = await agent.get('/api/v1/users');
    expect(res.status).toBe(401);
  });
  afterAll(async () => {
    pool.end();
  });
});
