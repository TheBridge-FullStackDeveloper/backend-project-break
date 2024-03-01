module.exports = {
    paths: {
      "/api/products": {
        get: {
          tags: {
            task: " Mostrar todos los productos en API",
          },
          description: "Mostrar todos los productos en API",
          operationId: "showProductsAPI",
          parameters: [],
          responses: {
            200: {
              description: "Productos obtenidos en API",
              content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Product",
                    },
                },
              }
            },
          },
          responses: {
            500: {
              description: "Servidor no encontrado",
            },
          },
        }
      },"/api/dashboard": {
        post: {
          tags: {
            task: " Crear un nuevo producto API",
          },
          description: "Crear un nuevo producto API",
          operationId: "createProductAPI",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductPost",
                },
              },
            },
          },
          responses: {
            201: { 
              description: "Nuevo producto añadido" 
            },
            500: {
              description: "Servidor no encontrado",
            },
          },
        },
      }, "/api/dashboard/{_id}": {
        put: {
          tags: {
            task: " Actualizar un producto en API",
          },
          description: "Actualizar un producto en API",
          operationId: "updateProductAPI",
          parameters: [{
            name: "_id",
            in: "path",
            schema: {
                $ref: "#/components/schemas/_id",
            },
            description: "Id del producto a actualizar",
          }, ],
          requestBody: {
            content: {
                "application/json": {
                    schema: { 
                      $ref: "#/components/schemas/ProductPut" 
                    },
                },
            },
          },
          responses: {
            200: { 
              description: "Producto actualizado correctamente" 
            },
            500: { 
              description: "Servidor no encontrado" 
            },
          },
        }, 
        delete: {
          tags: {
            Tasks: " Eliminar Producto",
          },
          description: "Eliminar Producto",
          operationId: "deleteTaskAPI",
          parameters: [{
              name: "_id",
              in: "path",
              schema: {
                  $ref: "#/components/schemas/_id",
              },
              description: "Id del producto a eliminar",
          }, ],
          responses: {
            200: { 
              description: "Producto elimando correctamente" 
            },
            500: { 
              description: "Producto no elimando " 
            },
          },
        }
      },
    },
  }
