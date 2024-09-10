const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/admin/adminAuthController');
const staffController = require('../controllers/admin/staffController');
const clientController = require('../controllers/admin/clientController');
const categoryController = require('../controllers/admin/categoryController');
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

module.exports = router;
