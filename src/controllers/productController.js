const Product = require('../models/Product')
let dash;

const htmlHead = `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <title>Document</title>
                </head>
                <body>`;

const htmlEnd = `</body></html>`

function getNavBar() {
    let html = `<header>
    <nav class="nav">
        <a href="/products">Productos</a>
        <a href="/products/category/camisetas">Camisetas</a>
        <a href="/products/category/pantalones">Pantalones</a>
        <a href="/products/category/zapatos">Zapatos</a>
        <a href="/products/category/accesorios">Accesorios</a>`;
    if (dash) {
        html += `
            <a href="/dashboard/new">Nuevo Producto</a>
            <a href="/dashboard">logout</a>
        </nav>    
    </header`
    } else {
        html +=
            `
            <a href="/dashboard">login</a>
        </nav>    
    </header`
    }

    return html;
}

function getProductCards(products) {
    let html = `<div class="cardContainer">`;
    for (let product of products) {
        html += `
        <div class="productCard">
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">        
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products/${product._id}">Ver detalle</a>               
        </div>           
        `
    }
    return html + '<div>';
}

function getProductOneCard(product) {
    let html = `<div class="cardContainer">
        <div class="productCard">
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">        
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <a href="/products/${product._id}">Ver detalle</a>               
        </div> 
    
    
    `


}

const ProductController = {
    async showProducts(req, res) {
        try {
            // controlar con dashboard
            let path = req.path;
            path.substr(0, 10) == '/dashboard' ? dash = true : dash = false

            const products = await Product.find();
            const productCards = getProductCards(products);
            const html = htmlHead + getNavBar() + productCards + htmlEnd
            res.send(html);
        } catch (error) {
            console.error(error)
            res.status(500).send('error de busqueda de productos')
        }
    },
    async showProductById(req, res) {
        try {
            // controlar con dashboard
            let path = req.path;
            path.substr(0, 10) == '/dashboard' ? dash = true : dash = false
            const idProduct = req.params.productId;
            const product = [await Product.findById(idProduct)];
            const productCards = getProductCards(product)

            const html = htmlHead + getNavBar() + productCards + htmlEnd
            res.send(html);


        } catch (error) {
            console.error(error)
            res.status(500).send('error de busqueda de producto por ID')
        }
    },
    async showNewProduct(req, res) {
        try {
            const form = `
                <h2> Crear nuevo producto</h2>
                <form action="/dashboard" method="post">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="name" required><br>
                <label for="description">Descripción</label>
                <input type="text" id="description" name="description" required><br>
                <label for="price">Precio</label>
                <input type="number" id="price" name="price" required><br>
                <label for="image">Imagen</label>
                <input type="text" id="image" name="image" required><br>
                <label for="category">Categoria</label>
                <select name="category">
                    <option value="camisetas">Camisetas</option>
                    <option value="pantalones">Pantalones</option>
                    <option value="zapatos">Zapatos</option>
                    <option value="accesorios">Accesorios</option>
                </select>
                <select name="size">
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                </select>
                <br>
                <button type="submit">Enviar</button>
                </form>
                      
            
            `;

            html = htmlHead + getNavBar() + form + htmlEnd

            res.send(html)
                ;

        } catch (error) {
            console.error(error)
            res.status(500).send('error de articulo nuevo')
        }
    },
    async createProduct(req, res) {

        const product = await Product.create({ ...req.body });
        res.redirect('/products');

    },
    async showEditProduct(req, res) {
        try {
            const idProduct = req.params.productId;
            const product = await Product.findById(idProduct);

            const form = `
                <h2>Actualizar producto</h2>
                <form action="/dashboard/${idProduct}" method="post">
                    <label for="name">Nombre</label>
                    <input type="text" id="${product.name}" name="${product.name}" required placeholder="${product.name}"><br>

                    <label for="description">Descripción</label>
                    <input type="text" id="${product.description}" name="${product.description}" required placeholder="${product.description}"><br>

                    <label for="price">Precio</label>
                    <input type="number" id="${product.price}" name="${product.price}" required placeholder="${product.price}"><br>

                    <label for="image">Imagen</label>
                    <input type="text" id="${product.image}" name="${product.image}" required placeholder="${product.image}"><br>
                    <select name="category">
                        <option value="camiseta">Camisetas</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="zapatos">Zapatos</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                    <select name="size">
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>                   

                    <button type="submit">Actualizar</button>
                </form>
                    
            
            `;

            html = htmlHead + getNavBar() + form + htmlEnd

            res.send(html)



        } catch (error) {
            console.error(error)
            res.status(500).send('error de edicion articulo nuevo')
        }
    },


    async updateProduct(req, res) {
        try {
            const idProduct = req.params.productId;
            const updateProduct = await Product.findByIdAndUpdate(
                idProduct, {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                category: req.body.category,
                size: req.body.size,
                price: req.body.price
            }, { new: true }
            )
            console.log('UpDate', updateProduct);
            if (!updateProduct) {
                return res.status(404).json({ mensaje: 'Product id not found' })
            }
            res.send(updateProduct)



        } catch (error) {
            console.error(error)
            res.status(500).send('error de actualización articulo')
        }
    },
    async deleteProduct(req, res) {
        try {
            const idProduct = req.params.productId;
            console.log('delete', req.params.productId)
            const deletedProduct = await Product.findByIdAndDelete(idProduct)
            if (!deletedProduct) {
                return res.status(404).json({ mensaje: 'Product with that idProduct not found' })
            }
            let message = `<h2>Producto eliminado correctamente</h2>`
            html = htmlHead + getNavBar() + message + htmlEnd
            res.send(html)

        } catch (error) {
            console.error(error)
            res.status(500).send('error de eliminacion articulo')
        }
    }
}


module.exports = ProductController