const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/productController');

router.get('/', ProductController.showProducts);
router.get('/products', ProductController.showProducts);
router.get('/products/:productId', ProductController.showProductById);

router.get('/products/category/:category', ProductController.showProductCategory);

// dashboard
router.get('/login', ProductController.login)
router.get('/dashboard', ProductController.showProducts);
router.get('/dashboard/new', ProductController.showNewProduct);

router.post('/dashboard', ProductController.createProduct);
router.get('/dashboard/:productId', ProductController.showProductById);

router.get('/dashboard/:productId/edit', ProductController.showEditProduct);
router.post('/dashboard/:productId', ProductController.updateProduct);

router.get('/dashboard/:productId/delete', ProductController.deleteProduct);
router.get('/logout', ProductController.logout)



module.exports = router;