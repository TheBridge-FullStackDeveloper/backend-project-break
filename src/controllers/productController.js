const Product = require('../models/Product')
let dash, token;

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
    if (token) {
        html += `
            <a href="/dashboard/new">Nuevo Producto</a>
            <a href="/logout">logout</a>
        </nav>    
    </header>`
    } else {
        html += `
            <a href="/login">login</a>
        </nav>    
    </header>`
    }

    return html;
}

function getProductCards(products) {
    console.log('products dash', dash)
    let option;
    let html = `<div class="cardContainer">`;
    if (token){option = 'dashboard'}else{option = 'products'}
    for (let product of products) {
        html += `
        <div class="productCard">
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">        
        <a href="/${option}/${product._id}" class="boton">Ver detalle</a>    
           
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
            <p>${product.size}</p>
            <p>${product.category}</p>
            `

    if (token){
        html += `        
            <a href="/dashboard/${product._id}/edit" class="boton">actualizar</a>
            <a href="/dashboard/${product._id}/delete" class="boton">eliminar</a>                          
         `
    }
    
    return html + '</div>';
}

const ProductController = {
    async showProducts(req, res) {
        try {
            // controlar con dashboard
            console.log('showproducts token', token)
           
            const products = await Product.find();
            const productCards = getProductCards(products, token);
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
            const idProduct = req.params.productId;
            const product = await Product.findById(idProduct);
            console.log('product', product)
            const productCards = getProductOneCard(product, token)

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
                <form class="formulario" action="/dashboard" method="post">
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
                <button class="boton" type="submit">Enviar</button>
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
    async showProductCategory(req, res) {
        try {
            const tipo = req.params;
            console.log('TIPO', tipo);
            const productCategory = await Product.find({ category: tipo.category });
            console.log('productCategory', productCategory)
            const productCards = getProductCards(productCategory);
            const html = htmlHead + getNavBar() + productCards + htmlEnd
            res.send(html);
            

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
                <div class="formContainer">                
                <form class="formulario" action="/dashboard/${idProduct}" method="post">
                    <label for="name">Nombre</label>
                    <input type="text" id="name" name="name"   value="${product.name}">

                    <label for="description">Descripción</label>
                    <input type="text" id="description" name="description"  value="${product.description}">

                    <label for="price">Precio</label>
                    <input type="number" id="price" name="price"  value="${product.price}">

                    <label for="image">Imagen</label>
                    <input type="text" id="image" name="image"  value="${product.image}">

                    <label for="category">Categoria: <strong>${product.category}</strong> </label>
                    <select name="category">                    
                        <option value="camisetas">Camisetas</option>
                        <option value="zapatos">Zapatos</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                    <label for="size">Talla:<strong>${product.size}</strong></label>
                    <select name="size">
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>                   

                    <button  class="boton" type="submit">Actualizar</button>
                </form>
                </div>
                    
            
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
            const pBody = req.body
            console.log('pBody', pBody)
            const updateProduct = await Product.findByIdAndUpdate(
                idProduct, { pBody
            }, { new: true })
            console.log('UpDate', updateProduct);
            if (!updateProduct) {
                return res.status(404).json({ mensaje: 'Product id not found' })
            }
            
            res.redirect(`${idProduct}`)



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
    },
    async login(req, res){
        token = true;
        res.redirect('/dashboard')
    },

    async logout(req, res){
        token=false;
        res.redirect('/products')
    }
}


module.exports = ProductController