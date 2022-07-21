
const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../controllers/admin_controller');

// get admin page
router.get('/admin-page', passport.checkAuthentication, adminController.adminPage);

// set reviewers to employee
router.post('/set-Reviewers', passport.checkAuthentication, adminController.setReviewrs);

// make new admin to employee
router.post('/newAdmin', passport.checkAuthentication, adminController.newAdmin);

// for viewing all employees list
router.get('/view-employees', passport.checkAuthentication, adminController.viewEmployees);

// delete an employee
router.get('/delete-employee/:id', passport.checkAuthentication, adminController.deleteEmployee);

module.exports = router;