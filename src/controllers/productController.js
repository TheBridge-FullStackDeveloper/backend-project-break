const Product = require('../models/Product');

//Mostrar todos los productos
exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        let html = getProductCards(products, req.url);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//Devolver el detalle de un producto
exports.showProductById = async (req, res) => {
    try {
        const navBarHTML = getNavBar();
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <title>Productos</title>                        
                    </head>
                    <body>
                        ${navBarHTML}
                `;
        html += `
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        <h1>Detalle</h1>
                    </div>
                `;
        html += '<div class="product-container">'; 

        if (req.url == '/dashboard') {
            
            html += `
                <div class="product-card">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h2>${product.nombre}</h2>
                    <p>${product.descripcion}</p>
                    <p><b>Categoría: </b>${product.categoria}</p>
                    <p><b>Talla: </b>${product.talla}</p>
                    <p><b>Precio: </b>${product.precio}€</p>
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
                    <p><b>Precio: </b>${product.precio}€</p>
                    <a class="edit" href="/dashboard/${product._id}/edit">Modificar</a>
                    <a class="delete" href="/dashboard/${product._id}/delete">Eliminar</a>
                </div>
            `;
            
        }

        html += '</div>'; 
        html += '</body></html>';
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Devuelve la vista con el formulario para subir un artículo nuevo.

exports.showNewProduct = (req, res) => {
    try {
        const navBarHTML = getNavBar();
        
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <title>Productos</title>
                    </head>
                    <body>
                        ${navBarHTML}
                `;
        html += `
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        <h1>Listado de Productos</h1>
                    </div>
                `;
        html += '';
        html += '<div class="product-container">'; 

        html += `
            <form action="/dashboard" method="POST">
                <input type="hidden" name="productId" value="<%= productId %>">
                <input type="text" id="productName" name="nombre" placeholder="Nombre">
                <br><br>
                <input type="text" id="productDescription" name="descripcion" placeholder="Descripción">
                <br><br>
                <input type="text" id="productCategory" name="categoria" placeholder="Categoría">
                <br><br>
                <input type="text" id="productSize" name="talla" placeholder="Talla">
                <br><br>
                <input type="text" id="productPrice" name="precio" placeholder="Precio">
                <br><br>
                <input type="text" id="productImage" name="imagen" placeholder="Imagen">
                <br><br>
                <button class="update" type="submit">Crear Producto</button>
            </form>
        `;
            
        html += '</div>'; 
        html += '</body></html>';
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Crear nuevo producto
exports.createProduct= async (req, res) => {
    const NewProduct = req.body
    try {
        const productDB = new Product(NewProduct);
        await productDB.save()
        res.redirect("/dashboard")
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Error al crear un nuevo producto" });
    }
};

//Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });

        // Redirige a alguna ruta después de la actualización, por ejemplo, el dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

//Mostrar formulario de actualización producto
exports.showEditProduct = (req, res) => {
    try {
        const navBarHTML = getNavBar();
        const productId = req.params.productId;
        if (!productId) {
            return res.status(404).send('Producto no encontrado');
        }
        
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <title>Productos</title>
                    </head>
                    <body>
                        ${navBarHTML}
                `;
        html += `
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        <h1>Editar Producto</h1>
                    </div>
                `;
        html += '<div class="product-container">'; 

        html += `
            <form action="/dashboard/${productId}" method="POST">
                <input type="hidden" name="productId" value="<%= productId %>">
                <input type="text" id="productName" name="productName" placeholder="Nombre">
                <br><br>
                <input type="text" id="productDescription" name="productDescription" placeholder="Descripción">
                <br><br>
                <input type="text" id="productSize" name="productSize" placeholder="Talla">
                <br><br>
                <input type="text" id="productPrice" name="productPrice" placeholder="Precio">
                <br><br>
                <button class="update" type="submit">Actualizar</button>
            </form>
        `;
            
        html += '</div>'; 
        html += '</body></html>';
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
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
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        let html = `
                    ${baseHtml()}
                        <title>Productos</title>
                    </head>
                    <body>
                        ${navBarHTML}
                `;
        html += `
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        <h1>Producto Eliminado</h1>
                    </div>
                `;
        html += '<div class="product-container">'; 
 
        html += `
            <div class="product-card">
                <img src="${product.imagen}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>${product.descripcion}</p>
                <p><b>Categoría: </b>${product.categoria}</p>
                <p><b>Talla: </b>${product.talla}</p>
                <p><b>Precio: </b>${product.precio}€</p>
                <a class="home" href="/">Volver</a>
            </div>
        `;

        html += '</div>'; 
        html += '</body></html>';
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
        
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
    <html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-e+ZQ1+OeoCz0DMQgDX2t3jKOQFWRaD/jm2xvjJvIM2hg7vMTZ6ayYEeDm4lM/XJXHXT1XLyDlU8cVKuVfyCtLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                ${navBarHTML}
        `;

    if (url == '/dashboard') {
        html += `
                    <div class="header">
                        <a href="/"><img src="/images/home.png" alt="home-icon"></a>
                        <h1>Panel de Administración</h1>
                    </div>
                `;
        html += '<div class="product-container">'; 
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
                        <h1>Listado de Productos</h1>
                    </div>
                `;
        html += '<div class="product-container">'; 
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
