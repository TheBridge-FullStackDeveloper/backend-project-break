const Product = require('../models/Product')
const {signIn, singUp} = require('../controllers/authController');
const {getAuth } = require("firebase/auth");
const fireBaseApp = require('../config/firebase');
const {generateToken} = require('../middlewares/authMiddleware');

const htmlHead = `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/styles.css">
                    <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
                    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />       
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
                    <title>Document</title>
                </head>
                <body>`;

const htmlEnd = `</body></html>`

function getNavBar(token) {
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

function getProductCards(products, token) {
    if (!products) {
        throw new Error('El producto esta vacio o nulo')
    }
    let option;
    let html = `<div class="cardContainer">`;
    if (token) { option = 'dashboard' } else { option = 'products' }
    for (let product of products) {
        html += `
        <div class="productCard">
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">      
        <div class="containerBoton">   
        <a href="/${option}/${product._id}" class="boton">Ver detalle</a>    
        </div>
        </div>           
        `
    }
    return html + '<div>';
}

function getProductOneCard(product, token) {
    if (!product) {
        throw new Error('El producto esta vacio o nulo')
    }
    let html = `<div class="cardContainer">
        <div class="productCard">
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Precio: ${product.price}€</p>
            <p>Talla: ${product.size.toString().toUpperCase()}</p>
            <p>Categoria: ${product.category}</p>
            `
    if (token) {
        html += ` 
            <div class="containerBoton">       
            <a href="/dashboard/${product._id}/edit" class="boton">actualizar</a>
            <a href="/dashboard/${product._id}/delete" class="boton">eliminar</a> 
            </div>                         
         `
    }

    return html + '</div>';
}

const ProductController = {
    async showProducts(req, res) {
        try {
            // controlar con dashboard    
            const token = req.session.token;            
            const products = await Product.find();
            if (!products) {
                throw new Error('error de busqueda de productos')
            }
            const productCards = getProductCards(products, token);
            const html = htmlHead + getNavBar(token) + productCards + htmlEnd
            res.send(html);
        } catch (error) {
            console.error(error)
            res.status(500).send('error de busqueda de productos')
        }
    },
    async showProductById(req, res) {
        try {
            // controlar con dashboard
            const token = req.session.token;
            const idProduct = req.params.productId;

            const product = await Product.findById(idProduct);

            const productCards = getProductOneCard(product, token)

            const html = htmlHead + getNavBar(token) + productCards + htmlEnd
            res.send(html);


        } catch (error) {
            console.error(error)
            res.status(500).send('error de busqueda de producto por ID')
        }
    },
    async showNewProduct(req, res) {
        try {
            const token = req.session.token;
            if (token){
            const form = `
                <h2> Crear nuevo producto</h2>
                <div class="formContainer">
                <form class="formulario" action="/dashboard" method="post">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="name" required>
                <label for="description">Descripción</label>
                <input type="text" id="description" name="description" required>
                <label for="price">Precio</label>
                <input type="number" id="price" name="price" required>
                <label for="image">Imagen</label>
                <input type="url" id="image" name="image" required>
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
                </div>
                      
            
            `;

            html = htmlHead + getNavBar(token) + form + htmlEnd

            res.send(html);
            }

        } catch (error) {
            console.error(error)
            res.status(500).send('error de articulo nuevo')
        }
    },
    async showProductCategory(req, res) {
        try {
            const token = req.session.token;
            const tipo = req.params;
            const productCategory = await Product.find({ category: tipo.category });
            const productCards = getProductCards(productCategory, token);
            const html = htmlHead + getNavBar(token) + productCards + htmlEnd
            res.send(html);

        } catch (error) {
            console.error(error)
            res.status(500).send('error de articulo nuevo')
        }

    },
    async createProduct(req, res) {
        
        const token = req.session.token;
        if(token){
            const product = await Product.create({ ...req.body });
            if (!product) {
                throw new Error('Error al añadir un articulo')
            }
            res.redirect('/dashboard');
        }else{
            const html = htmlHead + getNavBar(token) + '<h2>Credenciales incorrectas</h2>'+ htmlEnd;
            res.send(html);
        }
        

    },
    async showEditProduct(req, res) {
        try {
            const token = req.session.token;
            if (token){
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
                    <input type="number" id="price" name="price" value="${product.price}">

                    <label for="image">Imagen</label>
                    <input type="url" id="image" name="image"  value="${product.image}">

                    <div class="formcategory">
                    <p>Categoria:<p>
                        <input type="radio" id="category" name="category" value="camisetas">
                        <label for="category">Camisetas</label>

                        <input type="radio" id="category" name="category" value="zapatos">
                        <label for="category">Zapatos</label>

                        <input type="radio" id="category" name="category" value="pantalones">
                        <label for="category">Pantalones</label>

                        <input type="radio" id="category" name="category" value="accesorios">
                        <label for="category">Accesorios</label>
                        </div>
                    <div class="formcategory">
                    <p>Tallas:<p>
                        <input type="radio" id="category" name="size" value="xs">
                        <label for="category">XS</label>

                        <input type="radio" id="category" name="size" value="s">
                        <label for="category">S</label>

                        <input type="radio" id="category" name="size" value="m">
                        <label for="category">M</label>

                        <input type="radio" id="category" name="size" value="l">
                        <label for="category">L</label>

                        <input type="radio" id="category" name="size" value="xl">
                        <label for="category">XL</label>
                        </div>
                    <button  class="boton" type="submit">Actualizar</button>
                </form>
                </div>                    
            
            `;

            html = htmlHead + getNavBar(token) + form + htmlEnd
            res.send(html)
            }


        } catch (error) {
            console.error(error)
            res.status(500).send('error de edicion articulo nuevo')
        }
    },


    async updateProduct(req, res) {
        try {
            const token = req.session.token;
            if(token){
            const idProduct = req.params.productId;
            const pBody = req.body
            const updateProduct = await Product.findByIdAndUpdate(
                idProduct, {
                name: pBody.name,
                description: pBody.description,
                category: pBody.category,
                price: pBody.price,
                image: pBody.image,
                size: pBody.size
            }, { new: true })
            if (!updateProduct) {
                return res.status(404).json({ mensaje: 'Product id not found' })
            }

            res.redirect(`${idProduct}`)

        }

        } catch (error) {
            console.error(error)
            res.status(500).send('error de actualización articulo')
        }
    },
    async deleteProduct(req, res) {
        try {
            const token = req.session.token;
            if(token){
            const idProduct = req.params.productId;
            const deletedProduct = await Product.findByIdAndDelete(idProduct)
            if (!deletedProduct) {
                throw new Error('Producto no encontrado')
            }
            let message = `<h2>Producto eliminado correctamente</h2>`
            html = htmlHead + getNavBar(token) + message + htmlEnd
            res.send(html)
        }

        } catch (error) {
            res.status(500).send('error de eliminacion articulo')
        }
    },
    async login(req, res) {
        const form = `
            <h2>Acceso usuario</h2>
            <div class="formContainer">
            <form class="formulario" action="/login" method="post">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
                <div class="botonesform">    
                    <button  class="boton" type="submit">Ingresar</button>
                    <a href="/register" class="boton">Registrarse</a>
                </div>         
            </form>
                      
            </div>
        `

        const html = htmlHead + getNavBar() + form + htmlEnd;

        res.send(html);        
        
    },
    async register(req, res) {
        const form = `
            <h2>Registro de usuario</h2>
            <div class="formContainer">
            <form class="formulario" action="/register" method="post">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>    
                <button  class="boton" type="submit">Ingresar</button>                       
            </form>                        
            </div>
        `
        const html = htmlHead + getNavBar() + form + htmlEnd;
        res.send(html);        
        
    },

    async loginFirebase (req, res){
        try {
            const {email, password} = req.body; 
            const auth = getAuth(fireBaseApp);   
            const user = await signIn(auth, email, password);         
            console.log(user.uid);
            if(user){
                const token = generateToken(user);
                req.session.token = token;
                res.redirect('/dashboard')
            }            
            
        } catch (error) {
            const htmlError = error
            html = htmlHead + getNavBar()+ htmlError + htmlEnd
            res.send(html)
            
        }
    },
    async singupFirebase (req, res){
        try {
            const {email, password} = req.body; 
            const auth = getAuth(fireBaseApp);
            const user = await singUp(auth, email, password)
            if(user){
                const token = generateToken(user);
                req.session.token = token;
                res.redirect('/dashboard')
            } 
                        
        } catch (error) {
            const htmlError = error
            html = htmlHead + getNavBar()+ htmlError + htmlEnd
            res.send(html)
        }

    },

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = {
    ProductController,
    getProductOneCard,
    getProductCards
}