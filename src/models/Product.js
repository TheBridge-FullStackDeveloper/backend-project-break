const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    categoria: {
        type: String,
        enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"], // Opciones de selecciona válidas para Categoria
        required: [true, 'Es necesaria informar de categoría de la prenda según Camisetas, Pantalones, Zapatos, Accesorios']
    },
    talla: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'], // Opciones de selecciona válidas para la talla
        required: [true, 'Es necesaria informar de talla de la prenda según S, M, L, XL']
    },
    precio: {
        type: mongoose.Types.Decimal128
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;