const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('restaurant routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('#GET /api/v1/restaurants, displays a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
    });
  });

  it('#GET /api/v1/restaurants?type= returns status 200', async () => {
    const res = await request(app).get('/api/v1/restaurants?type=Cuban');
    expect(res.status).toBe(200);
  });

  it('#GET /api/v1/restaurants?type= returns specific types of restaurants as a list', async () => {
    const res = await request(app).get('/api/v1/restaurants?type=Cuban');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'Cubo',
        type: 'Cuban',
      },
    ]);
  });
  it('#GET restaurants/:restId, one restaurant with nested reviews', async () => {
    const res = await request(app).get('/api/restaurants/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Cubo',
      type: 'Cuban',
      reviews: expect.any(Array),
    });
  });

  describe('backend-express-template routes', () => {
    let agent = null;
    beforeEach(async () => {
      const user = {
        email: 'test23@example.com',
        password: '123456',
      };
      agent = request.agent(app);
      const res = await agent.post('/api/v1/users').send(user);
      expect(res.status).toBe(200);
    });
    it('#POST route should return a status 200', async () => {
      const newRev = {
        starts: '5',
        detail: 'Love this place',
      };
      const res = await (
        await request(app).post('/api/v1/restaurants/1/reviews')
      ).send(newRev);
      expect(res.status).toBe(401);
    });
    it('#POST restaurants/:rest:Id/reviews should create a new review', async () => {
      const newRev = {
        starts: '5',
        detail: 'Love this place',
      };
      const res = await agent
        .post('/api/v1/restaurants/1/reviews')
        .send(newRev);
      expect(res.body).toEqual({
        starts: '5',
        detail: 'Love this place',
      });
    });
  });
});
