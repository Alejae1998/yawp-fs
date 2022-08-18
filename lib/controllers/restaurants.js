const { Router } = require('express');
const Restaurant = require('../models/Restaurant');
// const Review = require('../models/Review');
// const authenticated = require('../middleware/authenticated');

module.exports = Router()
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.restId);
      await restaurant.getReviews();
      res.json(restaurant);
    } catch (err) {
      next(err);
    }
  })
  .get('/?type=', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getByType(req.body);
      const restaurant = restaurants.map((restaurant) => ({
        name: restaurant.name,
        type: restaurant.type
      }));
      res.json(restaurant);
    }catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  });
