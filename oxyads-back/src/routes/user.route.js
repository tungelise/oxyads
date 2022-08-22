const express = require('express');
const { forgotPassword, resetPassword, createUser, login } = require("../middlewares/validations/user.validation");
const userController = require('../controllers/user.controller');
const {loginHandler} = require("../middlewares/authentication");
const {isAuth} = require('../middlewares/authentication');
const passport = require('passport');

const router = express.Router();

router.post('/signup', [createUser], userController.createUser);
router.post('/signin', [login, loginHandler(passport)], userController.login);
// forgot password
router.post('/forgot-password', [forgotPassword], userController.forgotPassword);
// reset password
router.post('/reset-password', [resetPassword], userController.resetPassword);
//activate user
router.post('/activate-user', userController.activateUser);
// user info
router.get('/user-info', [isAuth], userController.getUserInfo);
router.get('/health', userController.checkHealth);

module.exports = router;