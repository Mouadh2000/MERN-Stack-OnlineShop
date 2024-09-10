
const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/user/userAuthController');
const categoryController = require('../controllers/admin/categoryController');
const AuthenticateUser = require('../middleware/AuthenticateUser');

const authMiddleware = new AuthenticateUser(process.env.JWT_SECRET);

router.post('/signup', userAuthController.signup);
router.post('/login', userAuthController.login);
router.post('/login/refresh', userAuthController.refreshToken);
router.get('/details', authMiddleware.authenticate.bind(authMiddleware), userAuthController.getUserDetails);
router.get('/verify-email', userAuthController.verifyEmail);

//Category Routes
router.get('/categories', categoryController.getAllCategories);

module.exports = router;
