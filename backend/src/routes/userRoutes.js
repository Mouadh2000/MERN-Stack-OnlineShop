const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/user/userAuthController');
const categoryController = require('../controllers/admin/categoryController');
const ProductController = require('../controllers/admin/productController');
const animeController = require('../controllers/admin/animeController');




const AuthenticateUser = require('../middleware/AuthenticateUser');

const authMiddleware = new AuthenticateUser(process.env.JWT_SECRET);

router.post('/signup', userAuthController.signup);
router.post('/login', userAuthController.login);
router.post('/login/refresh', userAuthController.refreshToken);
router.get('/details', authMiddleware.authenticate.bind(authMiddleware), userAuthController.getUserDetails);
router.get('/verify-email', userAuthController.verifyEmail);

//Category Routes
router.get('/categories', categoryController.getAllCategories);
// Product Routes
// General Product Controller for read operations
router.get('/products', (req, res) => {
    const controller = new ProductController(req, res, [], "read");
    controller.getAllProducts();
});
router.get('/product/:id', (req, res) => {
    const controller = new ProductController(req, res, [], "read");
    controller.getProductById(req.params.id);
});
router.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }

    const controller = new ProductController(req, res, [], "read");
    controller.getProductsByCategory(category);
});
router.get('/product/:id/stock', (req, res) => {
    const controller = new ProductController(req, res, [], "read");
    controller.checkStock(req.params.id);
});
// Anime Routes
router.get('/animes', animeController.getAllAnimes);
router.get('/anime/:id', animeController.getAnimeById);




module.exports = router;
