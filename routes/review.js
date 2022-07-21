
const express = require("express");
const passport = require("passport");
const router = express.Router();

const reviewController = require('../controllers/review_controller');

// for creating new rweview
router.get('/newReview/:id', reviewController.createReview);

module.exports = router;