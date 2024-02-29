
const { ProductController, getProductOneCard, getProductCards } = require('../src/controllers/productController');
const Product = require('../src/models/Product')

jest.setTimeout(30000)
/*
describe('ProductController', () => {
    const req ={};
    const res ={
        status: jest.fn(()=> res),
        send: jest.fn(), 
        redirect: jest.fn() // jest.fn() para simular el comportamiento de una funcion
    }
    const product = {
        name:'zapato',
        description: 'zapato negro',
        image:'http://imagen.com',
        category: 'zapatos',
        size: 'm',
        price: '25'
    }*/
/*
    describe('showProducts', () =>{
        it('should return all products', async()=>{
            await ProductController.showProducts(req, res);
            expect(res.send).toHaveBeenCalled();
        });
       it('should handle errors', async()=>{
            const errorMessage = 'error de busqueda de productos';
            jest.spyOn(Product, 'find').mockRejectedValue(new Error(errorMessage));
            await ProductController.showProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(errorMessage);
        })
    })

    describe('showProductById', () =>{
        it('should return a product by id', async()=>{
            req.params = {productId: '65645121566'}
            await ProductController.showProductById(req, res);
            expect(res.send).toHaveBeenCalled();
        });
        it('should handle errors', async ()=>{
            req.params = {productId: ''};

            const errorMessage = 'error de busqueda de producto por ID';
            jest.spyOn(Product, 'findById').mockRejectedValue(new Error(errorMessage));

            await ProductController.showProductById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(errorMessage);
        })
    })




 
    describe('createProduct', () =>{    
        it('should create a new product', async () =>{            
            req.body = product;
            await ProductController.createProduct(req, res);
            expect(Product.create).toEqual(product);
            expect(res.redirect).toEqual('/dashboard')
        })
    })

/*
describe('createProduct', () =>{    
    it('should create a new product', async () =>{            
        req.body = product;
        await ProductController.createProduct(req, res);
        expect(Product.create).toEqual(product);
        expect(res.redirect).toEqual('/dashboard')
    })
})*/
/*
    describe('updateProduct', () =>{
        it('should update a product', async() =>{
            req.params = {productId: '64643212154'};
            req.body = product;

            await ProductController.updateProduct(req, res);
            jest.spyOn(product, 'findByIdAndUpdate').mockResolvedValue(req.params.productId, product,{ new: true })
            //expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(req.params.productId, product,{ new: true } )
            expect(res.redirect).toHaveBeenCalledWith('64643212154')

        })
    })
   

}); */


describe('printing products', () => {
    it('lanza error si el producto es nulo o vacio', () => {
        expect(() => getProductCards('')).toThrow('El producto esta vacio o nulo')
    });
    it('lanza error si el producto es nulo o vacio', () => {
        expect(() => getProductOneCard('')).toThrow('El producto esta vacio o nulo')
    });
    const product = {
        name: 'zapato',
        description: 'zapato negro',
        image: 'http://imagen.com',
        category: 'zapatos',
        size: 'm',
        price: '25'
    }
    it('should print a product', () => {
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