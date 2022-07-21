
const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/', passport.checkAuthentication, userController.home);

router.use('/users', require('./user'));

router.use('/admin', require('./admin'));

router.use('/reviews', require('./review'));


module.exports = router;