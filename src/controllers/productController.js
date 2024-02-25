///ATENCIÓN: EN DESUSO HASTA QUE FUNCIONEN LAS ROUTES /Routes/productRoutes TESTEADAS EN POSTMAN

// const Product = require('../models/Products')

// const ProductController = {
//     async showProducts(req, res) {
//         try {
//             const products = await Product.find()
//             res.json(products)
//         } catch (error) {
//             res.status(500).json({ mensaje: 'Servidor no disponible' });
//         }
//     },
//     async showProductById (req, res) {
//         try {
//             const product = await Product.findById(req.params.productId);
//             if (!product) {
//                 return res.status(404).json({ mensaje: 'No se ha podido encontrar el producto solicitado' });
//             }
//             res.json(product)
//         } catch (error) {
//             res.status(500).json({ mensaje: 'Servidor no disponible' });
//         }
//     },
//     async showDashboard (req, res) {
//         try {
//             res.render('dashboard', { Product })
//         } catch (error) {
//             res.status(500).json({ mensaje: 'Servidor no disponible' });
//         }
//     }
// }