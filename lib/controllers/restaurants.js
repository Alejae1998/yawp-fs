const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

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
        type: restaurant.type,
      }));
      res.json(restaurant);
    } catch (err) {
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
  })
  .post('/restId/review', authenticate, async (req, res, next) => {
    try {
      const review = await Review.insertReview({
        restaurant_id: req.params.restId,
        user_id: req.user.id,
        ...req.body,
      });
      res.json(review);
    } catch (err) {
      next(err);
    }
  });
