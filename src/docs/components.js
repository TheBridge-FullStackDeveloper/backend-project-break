module.exports = {
    components:{
        schemas:{
            Product:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"Product identification number",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    nombre:{
                        type:'string',
                        description:"name of the product",
                        example:"Pantalones amarillos"
                    },
                    descripcion:{
                        type:'string',
                        description:"Product description",
                        example:"Pantalones vaqueros amarillos"
                    },
                    imagen:{
                        type:'string',
                        description:"path to image in image folder",
                        example:"/images/Pantalones_amarillos.jpg"
                    },
                    categoria:{
                        type:'string',
                        description:"Product category",
                        example:"Camisetas, Pantalones, Zapatos, Accesorios"
                    },
                    talla:{
                        type:'string',
                        description:"Product size",
                        example:"S, M, L, XL"
                    },
                    precio:{
                        type:'Number',
                        description:"Product price",
                        example:"10.25"
                    },
                }
            },
            ProductPut: {
                type: "object",
                properties: {
                    nombre:{
                        type:'string',
                        description:"name of the product",
                        example:"Pantalones amarillos"
                    },
                    descripcion:{
                        type:'string',
                        description:"Product description",
                        example:"Pantalones campana amarillos"
                    },
                    imagen:{
                        type:'string',
                        description:"path to image in image folder",
                        example:"/images/Pantalones_amarillos.jpg"
                    },
                    categoria:{
                        type:'string',
                        description:"Product category",
                        example:"Pantalones"
                    },
                    talla:{
                        type:'string',
                        description:"Product size",
                        example:"M"
                    },
                    precio:{
                        type:'Number',
                        description:"Product price",
                        example:"20"   

                    },
                },
            },
            ProductPost: {
                type: "object",
                properties: {
                    nombre:{
                        type:'string',
                        description:"name of the product",
                        example:"Pantalones amarillos"
                    },
                    descripcion:{
                        type:'string',
                        description:"Product description",
                        example:"Pantalones vaqueros amarillos"
                    },
                    imagen:{
                        type:'string',
                        description:"path to image in image folder",
                        example:"/images/Pantalones_amarillos.jpg"
                    },
                    categoria:{
                        type:'string',
                        description:"Product category",
                        example:"Pantalones"
                    },
                    talla:{
                        type:'string',
                        description:"Product size",
                        example:"M"
                    },
                    precio:{
                        type:'Number',
                        description:"Product price",
                        example:"10.25"   

                    },
                },
            },
            _id: {
                type: "objectId",
                description: "An id of a product",
                example: "Introduce id",
            },
        },
    },
};