const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
//const User = require('../models/User');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;


module.exports = Router().post('/', async (req, res, next) => {
  try {
    const [token, user] = await UserService.create(req.body);
    
    console.log(user);
    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .json({ user, message: 'Successfully logged in as a new user!' });
  } catch (error) {
    next(error);
  }
});


