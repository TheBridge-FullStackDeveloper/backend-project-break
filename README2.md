# Tienda de ropa

En esta documentación vamos a explicar el funcionamiento de la tienda de ropa, las tecnologías usadas, endpoints, etc.

## Índice

-[Url donce está ubicada nuestra tienda](#URL-Tienda-de-ropa)
-[Funcionamiento de la tienda de ropa](#Funcionamiento-de-la-tienda-de-ropa)
-[Tecnologías usadas para crear esta tienda de ropa](#Tecnologias-usadas)
-[Endpoints utilizados para HTML](#Endpoints-html)
-[Endpoints utilizados para la API](#Endpoints-Api)

## URL Tienda de ropa
Esta sería la URL donde está alojada la tienda: URL:http********

## Funcionamiento de la tienda de ropa

Una vez que se accede a la url de la web, lo primero que nos vamos ha encontrar es una web con una barra de navegación, la cual consta de las siguientes categorías:

-[Productos](#Categoría-Productos)
-[Camisetas](#Categoría-Camisetas)
-[Pantalones](#Categoría-Pantalones)
-[Zapatos](#Categoría-Zapatos)
-[Accesorios](#Categoría-Accesorios)
-[login](#Login)
-[La web Logeado](#La-web-Logeado)
-[Logeado Productos](#Logeado-Productos)
-[Botón Actualizar](#Botón-Actualizar)
-[Botón Eliminar](#Botón-Eliminar)
-[Opcion de crear nuevo producto](#Opción-de-crear-nuevo-producto)
-[Opción Logout](#Opción-Logout)

### Categoría Productos

En este apartado de la web, nos muestra todos los productos que existen en la web, cada producto tiene un botón para porde ver una vista detalle del producto en cuestión.

### Categoría Camisetas

En este apartado de la web, nos muestra solo los productos por camisetas que existan en nuestra web, también con su botón para acceder a su vista detalle.

### Categoría Pantalones

En este apartado de la web, nos muestra solo los productos por pantalones que existan en nuestra web, también su botón para acceder a su vista detalle.

### Categoría Zapatos

En este apartado de la web, nos muestra solo los productos por zapatos que existan en nuestra web, también su botón para acceder a su vista detalle.

### Categoría Accesorios

En este apartado de la web, nos muestra solo los productos por accesorios que existan en nuestra web, también su botón para acceder a su vista detalle.

#### Login

En este apartado tienes la opción de logearte en la web para poder acceder a ella con las funciones de administrador y así poder utilizar todas las opciones de Crear, buscar, modificar y borrar los artículos de la tienda.

#### La web Logeado

Cuando cliques en la opción de login, te saldrá una pantalla donde deberas introducir tu Usuário y contraseña de administrador de la web, esa pantalla comprueba que la información sea correcta, para poder entrar como administrador.
Una vez logeado te aparece una web con una barra de navegación arriba con; Productos, Camisetas, Pantalones, Zapatos, Accesorios, Nuevo  Producto y Logout.

#### Logeado Productos
A simple vista lo que se muestra es lo mismo que en la opción de inicio de productos pero una vez que presionas el botón Ver detalle, nos muestra una vista detalle del producto con dos botones más, botón Actualizar y Botón Eliminar.

#### Botón Actualizar

Una vez presionado este botón, nos muestra una web con la misma barra de navegación que cuando estás logeado y como cuerpo principal de la web un formulario de actualización del producto en cuestión con la información de ese producto y un botón de actualizar, uan vez hechos los cambios pertinentes en dicho producto al pinchar en el botón actualizar no vuelve a mostrar el producto en cuestión con su modificación ya realizada.
Esto es aplicable  a todas las categorías de la web pantalones, camisetas, zapatos, accesorios.


#### Botón Eliminar

Una vez pulsado el botón de eleminar, nos mostrará un mensaje el cual no dice que el producto se ha eliminado correctamente. Esto es aplicable  a todas las categorías de la web pantalones, camisetas, zapatos, accesorios.

#### Opción de crear nuevo producto

Una vez de clicar en la opción de la barra de menus, Nuevo Producto, nos aparece una web cd crear producto con todos los campos para crear dicho producto y un botón de enviar, una vez que se han rellenado todos los campos del nuevo producto, al presionar el botón de enviar, nos redirecciona a la web principal donde nos muestra todos los productos incluido el nuevo producto.

#### Opción Logout

Una clicado esta opción, simplemente cerrará la sesón del usuario que estemos usando y nos llevará a la pagina principal de la web que es solo de consulta.

## Tecnologias usadas

Estas son las tecnologías o recursos utilizados para nuestra web.

-[Express](#Epress)


- [Express](https://expressjs.com/)(#Express)
- [Mongoose](https://mongoosejs.com/)
- [Atlas](https://www.mongodb.com/cloud/atlas)
- [Fl0](https://fl0.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-session](https://www.npmjs.com/package/express-session)
- [express.urlencoded](https://expressjs.com/en/api.html#express.urlencoded)
- [express.static](https://expressjs.com/en/api.html#express.static)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Firebase](https://firebase.google.com/)
  - [Firebase Auth](https://firebase.google.com/docs/auth)
  - [Get Started with Firebase Authentication on Websites](https://firebase.google.com/docs/auth/web/start)


## Endpoints html

