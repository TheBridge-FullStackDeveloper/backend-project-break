const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/productController');
const {authenticate} = require('../middlewares/authMiddleware')

router.get('/', ProductController.showProducts);
router.get('/products', ProductController.showProducts);
router.get('/products/:productId', ProductController.showProductById);

router.get('/products/category/:category', ProductController.showProductCategory);

// dashboard
router.get('/login', ProductController.login);
router.post('/login', ProductController.loginFirebase);
router.get('/register', ProductController.register);
router.post('/register', ProductController.singupFirebase)
router.get('/dashboard', authenticate, ProductController.showProducts);
router.get('/dashboard/new', authenticate, ProductController.showNewProduct);

router.post('/dashboard', authenticate,  ProductController.createProduct);
router.get('/dashboard/:productId',  authenticate, ProductController.showProductById);

router.get('/dashboard/:productId/edit',  authenticate, ProductController.showEditProduct);
router.post('/dashboard/:productId', authenticate,  ProductController.updateProduct);

router.get('/dashboard/:productId/delete', authenticate,  ProductController.deleteProduct);
router.get('/logout', ProductController.logout)



module.exports = router;