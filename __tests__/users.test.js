const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'test@example.com',
  password: '123456',
};

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;
//   const agent = request.agent(app);
//   const user = await UserService.create({ ...mockUser, ...userProps });

//   const { email } = user;
//   await agent.post('/api/v1/users/sessions').send({ email, password });
//   return [agent, user];
// };


describe('users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  // it('POST /api/v1/users/ creates a new user', async  () => {
  //   const res = await (await request(app).post('/api/v1/users')).setEncoding(mockUser);
  //   const { email } = mockUser;
  //   expect(res.body).toEqual({
  //     id: expect.any(String),
  //     email,
  //   });
});
afterAll(() => {
  pool.end();
});
// });
