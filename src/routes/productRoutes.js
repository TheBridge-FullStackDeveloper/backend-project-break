const express = require("express");
const router = express.Router();
const controller = require('../controllers/productController');

//Mostrar todos los productos
router.get('/', controller.showProducts);
router.get('/products', controller.showProducts);

//Devuelve el formulario para subir un artículo nuevo.
router.get('/dashboard/new', controller.formNewProduct);

// Crear un nuevo producto
router.post("/dashboard", controller.createProduct)

//Devolver el detalle de un producto
router.get('/products/:productId', controller.showProductById);
router.get('/dashboard/:productId', controller.showProductById);

//Devuelve el dashboard del administrador con todos los productos
router.get('/dashboard', controller.showProducts);

//Mostrar formulario de actualización producto
router.get('/dashboard/:productId/edit', controller.showEditProduct);

//Eliminar un producto
router.get('/dashboard/:productId/delete', controller.deleteProduct);

//Mostrar productos por categoría
router.get('/categoria/:categoria', controller.showProductsByCategory);


// Crear un nuevo producto
// router.post("/dashboard", async(req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(201).send({ mensaje: 'Producto añadido', product});
//     } catch (error) {
//         console.error(error);
//         res
//             .status(500)
//             .send({ message: "Error al crear un nuevo producto" });
//     }
// });


//Actualizar un producto
/*
router.put("/dashboard/:productId", async(req, res) => {
    try {
        const idProduct = await req.params.productId;
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const imagen = req.body.imagen;
        const categoria = req.body.categoria;
        const talla = req.body.talla;
        const precio = req.body.precio;
        const product = await Product.findByIdAndUpdate(
            idProduct, { nombre, descripcion, imagen, categoria, talla, precio }, { new: true }
        );
        res.json(product)
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error al actualizar un producto" });
    }
});
*/

module.exports = router;