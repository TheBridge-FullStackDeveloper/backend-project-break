const express = require("express");
const router = express.Router();
const controller = require('../controllers/productController');
const Product = require('../models/Product'); 

//Mostrar todos los productos
router.get('/products', controller.showProducts);

//Devolver el detalle de un producto
router.get('/dashboard/:productId', controller.showProductById);

//Devuelve el dashboard del administrador. Aparecerán todos los artículos que se hayan subido.
router.get("/dashboard", async(req, res) => {
    try{
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.error(error);
        res.
            status(500).
            send({ message: 'Servidor no disponible' });
    }
});

//Devuelve el formulario para subir un artículo nuevo. (No disponible a falta de front)

//Crear un nuevo producto
router.post("/dashboard", async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send({ mensaje: 'Producto añadido', product});
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error al crear un nuevo producto" });
    }
});

//Actualizar un producto
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

//Eliminar un producto
router.delete("/dashboard/:productId/delete", async(req, res) => {
    try {
        const idProduct = await req.params.productId;
        const product = await Product.findByIdAndDelete(idProduct);
        res.send({mensaje: "Producto eliminado: ", product})
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error al eliminar un producto" });
    }
});

module.exports = router;