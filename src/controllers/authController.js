const express = require('express');
const { getDatabase, ref, query, orderByChild, equalTo, get, push, set } = require('firebase/database');
const { app } = require('../config/firebase'); 
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener una referencia a la base de datos
//const database = getDatabase(app);

exports.createUser = async (req, res) => {
    try {
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Registro</title>
                    </head>
                    <body>
                        <div class="registro">
                            <form id="registerForm" class="form-users" action="/registro" method="post">
                                <h1>Formulario de registro</h1>
                                <input type="text" id="username" name="username" placeholder="Nombre de usuario">
                                <br><br>
                                <input type="password" id="password1" name="password1" placeholder="Contraseña">
                                <br><br>
                                <input type="password" id="password2" name="password2" placeholder="Repita la contraseña">
                                <div id="passwordError" class="passwordError" style="display: none;">Las contraseñas no coinciden</div>
                                <br><br>
                                <div class="buttons">
                                    <button class="register" type="submit">Crear</button>
                                </div>
                            </form>
                        </div>
                    <script>
                        document.addEventListener('DOMContentLoaded', function() {
                            const registerForm = document.getElementById('registerForm');
                            const password1Field = document.getElementById('password1');
                            const password2Field = document.getElementById('password2');
                            const passwordError = document.getElementById('passwordError');

                            registerForm.addEventListener('submit', function(event) {
                                if (password1Field.value !== password2Field.value) {
                                    passwordError.style.display = 'block';
                                    event.preventDefault();
                                } else {
                                    passwordError.style.display = 'none';
                                }
                            });
                        });
                    </script>
                </body>
            </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.send(html);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.saveUser = async (req, res) => {
    try {
        const { username, password1, password2 } = req.body;
        
        const database = getDatabase(app);
        const usersRef = ref(database, 'usuarios');

        // Consultar si el usuario ya existe
        const userQuery = query(usersRef, orderByChild('nombre'), equalTo(username));
        const snapshot = await get(userQuery);
        const usuarios = snapshot.val();

        if (usuarios) {
            // El usuario ya existe, redirigir al formulario de inicio de sesión
            return res.redirect('/login');
        } else {
            // Comprobar si las contraseñas son iguales
            if (password1 === password2) {

                // Crear el objeto de usuario
                const newUser = {
                    nombre: username,
                    password: password1
                };

                // Guardar el nuevo usuario en la base de datos
                const newUserRef = push(usersRef);
                await set(newUserRef, newUser);

                // Redirigir al formulario de inicio de sesión con un mensaje de éxito
                let html = `
                    <html>
                        <head>
                            ${baseHtml()}
                            <title>Registro</title>
                        </head>
                        <body>
                            <div class="registro">
                                <div class="form-users">
                                    <h2>¡Registrado correctamente!</h2>
                                    <p>Ahora puedes iniciar sesión</p>
                                    <a class="login" href="/login">Login</a>
                                </div>
                            </div>
                        </body>
                    </html>
                `;
                res.setHeader('Content-Type', 'text/html');
                return res.send(html);
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

exports.loginUser = async (req, res) => {
    try {
        // Acceder a los datos de sesión para verificar si hay un error
        const error = req.session.error;

        // Limpia el mensaje de error de la sesión para que no se muestre en futuras solicitudes
        req.session.error = null;

        // HTML del formulario de inicio de sesión con el mensaje de error
        let html = `
            <html>
                <head>
                    ${baseHtml()}
                    <title>Login</title>
                </head>
                <body>
                    <div class="registro">
                        <form class="form-users" action="/login" method="post">
                            <h1>Inicio de sesión</h1>
                            <input type="text" id="username" name="username" placeholder="Nombre de usuario">
                            <p class="error-message-username" style="display: ${error === 'El nombre de usuario no existe' ? 'block' : 'none'};">El nombre de usuario no existe</p>
                            <br><br>
                            <input type="password" id="password" name="password" placeholder="Contraseña">
                            <p class="error-message-password" style="display: ${error === 'La contraseña no es correcta' ? 'block' : 'none'};">La contraseña no es correcta</p>
                            <br><br>
                            <div class="buttons">
                                <button class="login" type="submit">Entrar</button>
                                <input class="register" type="button" onclick="location.href='/registro';" value="Regístrate"/>
                            </div>
                        </form>
                    </div>
                </body>
            </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.checkUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const database = getDatabase(app);
        const usersRef = ref(database, 'usuarios');

        // Consultar si el usuario ya existe
        const userQuery = query(usersRef, orderByChild('nombre'), equalTo(username));
        const snapshot = await get(userQuery);
        const usuarios = snapshot.val();

        if (!usuarios) {
            // El usuario no existe
            req.session.error = 'El nombre de usuario no existe';
            return res.redirect('/login');
        } else {
            // Verificar si la contraseña coincide
            const userData = Object.values(usuarios)[0]; // Suponiendo que solo hay un usuario con ese nombre
            if (userData.password !== password) {
                // La contraseña no coincide
                req.session.error = 'La contraseña no es correcta'; // Almacena el mensaje de error en la sesión
                return res.redirect('/login');
            } else {
                // La contraseña coincide, establecer la sesión y redirigir
                req.session.username = username; // Establece la sesión con el nombre de usuario
                return res.redirect('/dashboard');
            }
        }
    } catch (err) {
        res.status(500).send(err.message);
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