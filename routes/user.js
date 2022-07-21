
const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller')

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/logout', userController.destroySession);

router.post('/create-user', userController.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/login'}
), userController.createSession);

module.exports = router;