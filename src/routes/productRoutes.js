const express = require("express");
const router = express.Router();
const controller = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

//Mostrar todos los productos
router.get('/', controller.showProducts);
router.get('/products', controller.showProducts);

//Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/new', authMiddleware.checkSessionMiddleware, controller.formNewProduct);

// Crear un nuevo producto
router.post("/dashboard", authMiddleware.checkSessionMiddleware, controller.createProduct)

//Devolver el detalle de un producto
router.get('/products/:productId', controller.showProductById);
router.get('/dashboard/:productId', authMiddleware.checkSessionMiddleware, controller.showProductById);

//Devuelve el dashboard del administrador con todos los productos
router.get('/dashboard', authMiddleware.checkSessionMiddleware, controller.showProducts);

//Mostrar formulario de actualización producto
router.get('/dashboard/:productId/edit', authMiddleware.checkSessionMiddleware, controller.showEditProduct);

//Eliminar un producto
router.get('/dashboard/:productId/delete', authMiddleware.checkSessionMiddleware, controller.deleteProduct);

//Mostrar productos por categoría
router.get('/categoria/:categoria', controller.showProductsByCategory);

module.exports = router;