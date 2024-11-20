const express = require('express');
const upload = require('../config/multerconfig');
const router = express.Router();
const adminAuthController = require('../controllers/admin/adminAuthController');
const staffController = require('../controllers/admin/staffController');
const clientController = require('../controllers/admin/clientController');
const categoryController = require('../controllers/admin/categoryController');
const animeController = require('../controllers/admin/animeController');
const ProductController = require('../controllers/admin/productController');
const LuxeBathController = require('../controllers/admin/luxeBathController');

const AuthenticateAdmin = require('../middleware/AuthenticateAdmin');

const authMiddleware = new AuthenticateAdmin(process.env.JWT_SECRET);

router.post('/login', adminAuthController.login);
router.post('/login/refresh', adminAuthController.refreshToken);
router.get('/details', authMiddleware.authenticate.bind(authMiddleware), adminAuthController.getAdminDetails);

//Staff Routes
router.post('/staff/create',authMiddleware.authenticate.bind(authMiddleware), staffController.createStaff);
router.get('/staffs', authMiddleware.authenticate.bind(authMiddleware), staffController.getAllStaff);
router.get('/staff/:id',authMiddleware.authenticate.bind(authMiddleware), staffController.getStaffById);
router.put('/staff/update/:id',authMiddleware.authenticate.bind(authMiddleware), staffController.updateStaff);
router.delete('/staff/delete/:id',authMiddleware.authenticate.bind(authMiddleware), staffController.deleteStaff);

//Client Routes
router.get('/clients/',authMiddleware.authenticate.bind(authMiddleware), clientController.getAllUsers);
router.get('/client/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.getUserById);
router.put('/client/disable/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.disableUser);
router.put('/client/enable/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.enableUser);
router.delete('/client/delete/:id',authMiddleware.authenticate.bind(authMiddleware), clientController.deleteUser);

//Category Routes
router.post('/category/create',authMiddleware.authenticate.bind(authMiddleware), categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id',authMiddleware.authenticate.bind(authMiddleware), categoryController.getCategoryById);
router.put('/category/update/:id',authMiddleware.authenticate.bind(authMiddleware), categoryController.updateCategory);
router.delete('/category/delete/:id',authMiddleware.authenticate.bind(authMiddleware), categoryController.deleteCategory);

//Anime Routes
router.post('/anime/create',authMiddleware.authenticate.bind(authMiddleware), upload.array('images', 10), animeController.createAnime);
router.get('/animes', animeController.getAllAnimes);
router.get('/anime/:id',authMiddleware.authenticate.bind(authMiddleware), animeController.getAnimeById);
router.put('/anime/update/:id',authMiddleware.authenticate.bind(authMiddleware),upload.array('images', 10), animeController.updateAnime);
router.delete('/anime/delete/:id',authMiddleware.authenticate.bind(authMiddleware), animeController.deleteAnime);

// Product Routes
// General Product Controller for read operations
router.get('/products', (req, res) => {
    const controller = new ProductController(req, res, [], "read");
    controller.getAllProducts();
});
router.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }

    const controller = new ProductController(req, res, [], "read");
    controller.getProductsByCategory(category);
});

// LuxeBath Routes
router.post('/luxebath/create',authMiddleware.authenticate.bind(authMiddleware),upload.array('images', 10), (req, res) => {
    const luxeBathController = new LuxeBathController(req, res);
    luxeBathController.createLuxeBath();
  });
router.put('/luxebath/update/:id',authMiddleware.authenticate.bind(authMiddleware),upload.array('images', 10), (req, res) => {
    const luxeBathController = new LuxeBathController(req, res, [], "update");
    const productId = req.params.id;
    luxeBathController.updateLuxeBath(productId);
  });
router.delete('/luxebath/delete/:id', authMiddleware.authenticate.bind(authMiddleware), (req, res) => {
    const luxeBathController = new LuxeBathController(req, res, [], "delete");
    const productId = req.params.id;

    luxeBathController.deleteLuxeBath(productId);
});

module.exports = router;
