const Product = require('../models/Product');

//Mostrar todos los productos
exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        let html = getProductCards(products, req.url);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        console.error(error);
        res.status(500).send(err.message);
    }
}

//Devolver el detalle de un producto
exports.showProductById = async (req, res) => {
    try {
        const navBarHTML = getNavBar();
        const product = await Product.findById(req.params.productId);
        
        if (product) {
            let html = `
                        ${baseHtml()}
                        <title>Productos</title>                        
                    </head>
                    <body>
                        <div class="header">
                            <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        </div>
                        ${navBarHTML}
                        <h1>Detalle</h1>
                        <div class="product-container show-product">
                    `;

            if (req.url.includes('/dashboard')) {          
                html += `
                    <div class="product-card">
                        <img src="${product.imagen}" alt="${product.nombre}">
                        <h2>${product.nombre}</h2>
                        <p>${product.descripcion}</p>
                        <p><b>Categoría: </b>${product.categoria}</p>
                        <p><b>Talla: </b>${product.talla}</p>
                        <p><b>Precio: </b>${product.precio.toFixed(2)}€</p>
                        <a class="edit" href="/dashboard/${product._id}/edit">Modificar</a>
                        <a class="delete" href="/dashboard/${product._id}/delete">Eliminar</a>
                        <a class="home" href="/dashboard">Volver</a>
                    </div>
                `;        
            } else {           
                html += `
                    <div class="product-card">
                        <img src="${product.imagen}" alt="${product.nombre}">
                        <h2>${product.nombre}</h2>
                        <p>${product.descripcion}</p>
                        <p><b>Categoría: </b>${product.categoria}</p>
                        <p><b>Talla: </b>${product.talla}</p>
                        <p><b>Precio: </b>${product.precio.toFixed(2)}€</p>
                        <a class="home" href="/products">Volver</a>
                    </div>
                `;   
            }

            html += `
                    </div> 
                </body>
            </html>
            `;

            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        }

    } catch (err) {
        console.error(error);
        res.status(500).send(err.message);
    }
}

// Devuelve la vista con el formulario para subir un artículo nuevo.
exports.formNewProduct = (req, res) => {
    try {
        const navBarHTML = getNavBar();
        let html = `
                    ${baseHtml()}
                    <title>Productos</title>
                </head>
                <body>
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                    </div>
                    ${navBarHTML}
                    <h1>Crear nuevo producto</h1>
                    <div class="product-container">
                        <form action="/dashboard" method="POST">
                            <input type="text" id="productName" name="productName" placeholder="Nombre">
                            <br><br>
                            <input type="text" id="productDescription" name="productDescription" placeholder="Descripción">
                            <br><br>
                            <select id="productCategory" name="productCategory" >
                                <option value="" disabled selected>Categoría</option>
                                <option value="Camisetas">Camisetas</option>
                                <option value="Pantalones">Pantalones</option>
                                <option value="Zapatos">Zapatos</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                            <br><br>
                            <select id="productSize" name="productSize">
                                <option value="" disabled selected>Talla</option>
                                <option value="S" >S</option>
                                <option value="M" >M</option>
                                <option value="L" >L</option>
                                <option value="XL" >XL</option>
                            </select>
                            <br><br>
                            <input type="text" id="productPrice" name="productPrice" placeholder="Precio">
                            <br><br>
                            <input type="file" id="productImagen" name="productImagen" accept="image/*">
                            <button class="update" type="submit">Crear</button>
                        </form>
                    </div>
                </body>
            </html>            
        `;
    
        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Crear nuevo producto
exports.createProduct = async (req, res) => {
    try {
        
        const { productName, productDescription, productCategory, productSize, productPrice, productImagen } = req.body;

        const newProduct = new Product({
            nombre: productName,
            descripcion: productDescription,
            categoria: productCategory,
            talla: productSize,
            precio: productPrice,
            imagen: '/images/'+productImagen
        });

        await newProduct.save();
        res.redirect('/');

    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

//Mostrar formulario de actualización producto
exports.showEditProduct = async (req, res) => {
    try {
        const navBarHTML = getNavBar();
        const productId = req.params.productId;
        const product = await Product.findById(req.params.productId);

        let html = `
                    ${baseHtml()}
                    <title>Productos</title>
                </head>
                <body>
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                    </div>
                    ${navBarHTML}
                    <h1>Modificar producto</h1>
                    <div class="product-container show-product">
                        <form action="/dashboard/${productId}?_method=PUT" method="POST">
                            <input type="hidden" name="productId" value="${productId}">
                            <input type="text" id="productName" name="productName" value="${product.nombre}">
                            <br><br>
                            <input type="text" id="productDescription" name="productDescription" value="${product.descripcion}">
                            <br><br>
                            <select id="productCategory" name="productCategory" >
                                <option value="" disabled selected>${product.categoria}</option>
                                <option value="Camisetas">Camisetas</option>
                                <option value="Pantalones">Pantalones</option>
                                <option value="Zapatos">Zapatos</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                            <br><br>
                            <select id="productSize" name="productSize">
                                <option value="" disabled selected>${product.talla}</option>
                                <option value="S" >S</option>
                                <option value="M" >M</option>
                                <option value="L" >L</option>
                                <option value="XL" >XL</option>
                            </select>
                            <br><br>
                            <input type="text" id="productPrice" name="productPrice" value="${product.precio.toFixed(2)}">
                            <br><br>
                            <input type="file" id="productImagen" name="productImagen" accept="image/*">
                            <button class="update" type="submit">Actualizar</button>
                        </form>
                    </div>
                    <script>
                        const input = document.getElementById('productImagen');
                        input.addEventListener('change', function(event) {
                            const file = event.target.files[0];
                            const pathImage = URL.createObjectURL(file);
                        });
                    </script>
                </body>
            </html>
        `;
            
        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        let { productName, productDescription, productCategory, productSize, productPrice, productImagen } = req.body;
        let existingProduct = await Product.findById(productId);

        // Si alguno de los campos no se modificó, conservamos los datos existentes
        if (!productName) productName = existingProduct.nombre;
        if (!productDescription) productDescription = existingProduct.descripcion;
        if (!productSize)  productSize = existingProduct.talla;
        if (!productPrice) productPrice = existingProduct.precio;

        await Product.findByIdAndUpdate(productId, { nombre: productName, descripcion: productDescription, categoria: productCategory, talla: productSize, precio: productPrice, imagen: `/images/${productImagen}` } , { new: true });

        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const navBarHTML = getNavBar();
        const product = await Product.findById(req.params.productId);
        const idProduct = await req.params.productId;
        await Product.findByIdAndDelete(idProduct);

        if (product) {
            let html = `
                        ${baseHtml()}
                        <title>Productos</title>
                    </head>
                    <body>
                        <div class="header">
                            <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        </div>
                        ${navBarHTML}
                        <h1>Detalle del producto eliminado</h1>
                        <div class="product-container show-product">
                            <div class="product-card">
                                <img src="${product.imagen}" alt="${product.nombre}">
                                <h2>${product.nombre}</h2>
                                <p>${product.descripcion}</p>
                                <p><b>Categoría: </b>${product.categoria}</p>
                                <p><b>Talla: </b>${product.talla}</p>
                                <p><b>Precio: </b>${product.precio.toFixed(2)}€</p>
                                <a class="home" href="/dashboard">Volver</a>
                            </div>
                        </div>
                    </body
                </html>
            `;
 
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}

//Mostrar productos por categoría
exports.showProductsByCategory = async (req, res) => {
    const categoria = req.params.categoria;

    try {
        const products = await Product.find({ categoria: categoria });
        let html = getProductCards(products, req.url);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los productos por categoría');
    }
}
//Cargar estilos HTML
baseHtml = () => {
    let html = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="/styles.css">
    `;
    return html;
}

//Genera barra de navegación con las categorías de los productos
getNavBar = () => {
    try {
        let categorias = ["Camisetas", "Pantalones", "Zapatos", "Accesorios"];

        let html = `
            <nav>
                <ul class="barra-navegacion">
            `;

            categorias.forEach(categoria => {
                html += `
                        <li><a href="/categoria/${categoria}">${categoria}</a></li>
                `;
            });

            html += `
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            `;
        
        return html;
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos
getProductCards = (products, url) => {
    const navBarHTML = getNavBar();
    let html = `
        ${baseHtml()}
                <title>Productos</title>
            </head>
            <body>
        `;

    if (url == '/dashboard') {
        html += `
            <div class="header">
                <a href="/"><img src="/images/home.png" alt="home-icon"></a>
            </div>
            ${navBarHTML}
            <h1>Panel de Administración</h1>
            <div class="button">
                <a class="add" href="/dashboard/new">Añadir Producto</a>
            </div>
            <div class="product-container">
        `;
   
        for (let product of products) {
            html += `
                <div id="product-card" class="product-card">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h2>${product.nombre}</h2>
                    <a class="detail" href="/dashboard/${product._id}">Ver</a>
                    <a class="edit" href="/dashboard/${product._id}/edit">Modificar</a>
                    <a class="delete" href="/dashboard/${product._id}/delete">Eliminar</a>
                </div>
            `;
        }
    } else {
        html += `
            <div class="header">
                <a href="/"><img src="/images/home.png" alt="home-icon"></a>
            </div>
            ${navBarHTML}
            <h1>Listado de Productos</h1>
            <div class="product-container">
        `;

        for (let product of products) {
            html += `
                <div id="product-card" class="product-card">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h2>${product.nombre}</h2>
                    <a class="detail" href="/products/${product._id}">Ver</a>
                </div>
            `;
        }
    }
    
    html += '</div>'; 
    html += '</body></html>';
    return html;
}

/* CONTROLADORES PARA API */

// Obtener todos los productos API
exports.showProductsAPI = async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Servidor no encontrado' });
    }
  };

  // Crear un nuevo producto API
  exports.createProductAPI = async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        await nuevoProducto.save();
        res.status(201).json({ mensaje: ' Nuevo producto añadido ' + nuevoProducto});
    } catch (error) {
        res.status(500).json({ error: ' Servidor no encontrado ' });
    }
  };
  
  // Actualizar un nuevo producto API
  exports.updateProductAPI = async (req, res) => {
    try {
        const productoActualizado = await Product.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true }
        );
        res.json({mensaje: ' Producto actualizado correctamente ' + productoActualizado});
    } catch (error) {
        res.status(500).json({ error: ' Producto no encontrado por :id ' });
    }
  };

  // Eliminar un producto API
  exports.deleteProductAPI = async(req, res) => {
    try {
        const productoEliminado = await Product.findByIdAndDelete(req.params._id);
        res.send({ message: ' Producto eliminado correctamente ' + productoEliminado });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: ' Producto no eliminado ' });
    }
}
