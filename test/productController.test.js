const {ProductController, getProductOneCard, getProductCards} = require('../src/controllers/productController');



describe('printing products', () =>{
    it('lanza error si el producto es nulo o vacio', () =>{
        expect(() => getProductCards('')).toThrow('El producto esta vacio o nulo')
    });
    it('lanza error si el producto es nulo o vacio', () =>{
        expect(() => getProductOneCard('')).toThrow('El producto esta vacio o nulo')
    });
    const product = {
        name:'zapato',
        description: 'zapato negro',
        image:'http://imagen.com',
        category: 'zapatos',
        size: 'm',
        price: '25'
    }
    it('controlar que pinta', () =>{
        expect(getProductOneCard(product)).toEqual(`<div class=\"cardContainer\">
        <div class=\"productCard\">
            <h2>zapato</h2>
            <img src=\"http://imagen.com\" alt=\"zapato\">
            <p>zapato negro</p>
            <p>Precio: 25€</p>
            <p>Talla: M</p>
            <p>Categoria: zapatos</p>
            </div>`)
    })
})