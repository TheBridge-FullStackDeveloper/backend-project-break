# Tienda de ropa
Este proyecto consiste en crear una tienda de ropa con un catálogo de productos y un dashboard para el administrador, desde donde se podrá actualizar o eliminar un producto. Los nuevos productos se almacenarán en una base de datos de Mongo en Atlas. 

## Arrancar el proyecto
Para iniciar nuestra aplicación se han de seguir los siguientes pasos: 
1. Descargar el repositorio y entrar en la carpeta descargada en nuestro equipo
~~~
https://github.com/soniamartinezz/backend-project-break.git
cd backend-project-break
~~~

2. Instalar depedencias 
~~~
npm install
~~~

3. Crear archivo .env con las variables de entorno necesarias para el correcto funcionamiento de la aplicación. En este caso, es imprescindible una variable de entorno que contenga la conexión a la base de datos Mongo.

4. Lanzamos el servidor
~~~
npm run serve
~~~

### Tecnologías usadas
Durante la realización de este proyecto se han utilizado una serie de dependencias que han aportado distintas funcionalidades:

* **npm**: administrador de paquetes que permite a los desarrolladores de JavaScript trabajar con dependencias.
* **express**: framework de backend Node.js que permite desarrollar aplicaciones de backend escalables. Ofrece el sistema de enrutamiento y una serie de características para ampliar el propio framework.
* **mongoose**: librería para Node.js que permite escribir consultas para una base de datos de MongooDB.
* **body-parser**: middleware usado por Express que permite tener acceso al objeto req.body cuando haces una peticion post, como por ejemplo en un formulario.
* **dotenv**: paquete para Node.js que permite configurar o usar las variables de entorno en nuestro código.
* **nodemon**: utilidad que monitorea los cambios en el código fuente que se está desarrollando y automáticamente reinicia el servidor.
* **jest**: biblioteca de JavaScript para crear, ejecutar y estructurar pruebas.

Además de lo mencionado, se ha usado la herramienta **Mongo de Atlas** como base de datos para almacenar todos los elementos creados en la aplicación.

#### Endpoints
- **GET /**: devuelve todos los productos.
- **GET /products**: devuelve todos los productos.
- **GET /products/:productId**: devuelve el detalle de un producto.
- **GET /dashboard**: devuelve el dashboard del administrador donde se mostraran todos los productos, además se podrá ver el detalle de cada producto, modificarse y actualizarse o eliminarse.
- **GET /dashboard/new**: muestra un formulario para subir un nuevo artículo.
- **POST /dashboard**: crea un nuevo producto con los datos introducidos en el formulario que muestra el endpoint */dashboard/new*.
- **GET /dashboard/:productId**: devuelve el detalle de un producto desde el dashboard.
- **GET /dashboard/:productId/edit**: muestra un formulario para editar un producto.
- **PUT /dashboard/:productId:** actualiza un producto a través de los valores introducidos en el formulario mostrado desde el endpoint */dashboard/:productId/edit*.
- **DELETE /dashboard/:productId/delete**: elimina un producto.

##### Notas:

Para crear un nuevo producto o modificar un producto existente, las imágenes deben almacenarse en la carpeta '*/public/images*' y de esta forma, poder ser visualizadas correctamente desde la aplicación web. 
