const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authUser = require('../middleware/authUser');
const Review = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  authenticate,
  authUser,
  async (req, res, next) => {
    try {
      const review = await Review.deleteReview({
        user_id: req.user.id,
      });
      res.json(review);
    } catch (err) {
      next(err);
    }
  }
);
