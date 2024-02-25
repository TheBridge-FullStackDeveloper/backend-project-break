const Product = require('../models/Product');

//Mostrar todos los productos
exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        const html = getProductCards(products);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//Devolver el detalle de un producto
exports.showProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId); // Usar `findById` para buscar por ID
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        
        let html = `
            <html>
                <head>
                    <title>Productos</title>
                    <link rel="stylesheet" type="text/css" href="/styles.css">
                </head>
                <body>
            `;
        html += '<h1>Detalle de producto</h1>';
        html += '<div class="product-container">'; 
        html += `
            <div class="product-card">
                <img src="${product.imagen}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>${product.descripcion}</p>
                <p>${product.categoria}</p>
                <p>${product.talla}</p>
                <p>${product.precio}€</p>
                <p>ID: ${product._id}</p>
                <a href="/products/${product._id}">Ver detalle</a>
            </div>
        `;
        html += '</div>'; 
        html += '</body></html>';

        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos
getProductCards = (products) => {
    let html = `
        <html>
            <head>
                <title>Productos</title>
                <link rel="stylesheet" type="text/css" href="/styles.css">
            </head>
            <body>
        `;
    html += '<h1>Lista de Productos</h1>';
    html += '<div class="product-container">'; 
    for (let product of products) {
        html += `
            <div class="product-card">
                <img src="${product.imagen}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>${product.descripcion}</p>
                <p>${product.categoria}</p>
                <p>${product.talla}</p>
                <p>${product.precio}€</p>
                <p>ID: ${product._id}</p>
                <a href="/products/${product._id}">Ver detalle</a>
            </div>
        `;
    }
    html += '</div>'; 
    html += '</body></html>';
    return html;
}

/*
const ProductController = {
    async showProducts(req, res) {
        try {
            const products = await Product.find()
            res.json(products)
        } catch (error) {
            res.status(500).json({ mensaje: 'Servidor no disponible' });
        }
    },
    async showProductById (req, res) {
        try {
            const product = await Product.findById(req.params.productId);
            if (!product) {
                return res.status(404).json({ mensaje: 'No se ha podido encontrar el producto solicitado' });
            }
            res.json(product)
        } catch (error) {
            res.status(500).json({ mensaje: 'Servidor no disponible' });
        }
    },
    async showDashboard (req, res) {
        try {
            res.render('dashboard', { Product })
        } catch (error) {
            res.status(500).json({ mensaje: 'Servidor no disponible' });
        }
    }
}
*/