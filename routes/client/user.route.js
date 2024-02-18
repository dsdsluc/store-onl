const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get('/register', controller.register);

router.post('/register',validate.register, controller.registerPost);

router.get('/login', controller.login);

router.post('/login',validate.loginPost, controller.loginPost);

router.get('/logout', controller.logout);

router.get('/password/forgot', controller.forgotPassword);

router.post('/password/forgot',validate.forgotPassword, controller.forgotPasswordPost);

router.get('/password/otp', controller.otp);

router.post('/password/otp', controller.otpPost);

router.get('/password/reset', controller.resetPassword);

router.patch('/password/reset',validate.resetPassword, controller.resetPasswordPatch);

router.get('/infor',authMiddleware.requireAuth, controller.inforUser);

module.exports = router