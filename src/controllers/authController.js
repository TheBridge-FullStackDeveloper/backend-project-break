const { getDatabase, ref, query, orderByChild, equalTo, get, push, set } = require('firebase/database');
const { app } = require('../config/firebase'); 

//Función que muestra un formulario para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Comprobar si en la sesión se ha registrado algún error
        const error = req.session.error;
        req.session.error = null;

        let html = `
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
                        <p class="error-message-username" style="display: ${error === 'El nombre de usuario está vacío' ? 'block' : 'none'};">El nombre de usuario está vacío</p> <!-- Nuevo mensaje de error -->
                        <br><br>
                        <input type="password" id="password1" name="password1" placeholder="Contraseña">
                        <br><br>
                        <input type="password" id="password2" name="password2" placeholder="Repita la contraseña">
                        <div id="passwordError" class="passwordError" style="display: none;">Las contraseñas no coinciden</div>
                        <br><br>
                        <div class="buttons">
                            <button class="register" type="submit">Crear</button>
                            <button class="login" type="button" onclick="location.href='/login';">Login</button>
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
};

//Función para procesar los datos del formulario de creación de usuario
exports.saveUser = async (req, res) => {
    try {
        const { username, password1, password2 } = req.body;
        
        // Verificar si el campo de nombre de usuario está vacío
        if (!username) {
            req.session.error = 'El nombre de usuario está vacío';
            return res.redirect('/registro');
        }

        const database = getDatabase(app);
        const usersRef = ref(database, 'usuarios');

        // Consultar si el usuario existe
        const userQuery = query(usersRef, orderByChild('nombre'), equalTo(username));
        const snapshot = await get(userQuery);
        const usuarios = snapshot.val();

        // Comprobar si el usuario existe, si las contraseñas son idénticas, creación de nuevo de usuario
        if (usuarios) {
            res.redirect('/login');
        } else {
            if (password1 === password2) {
                const newUser = {
                    nombre: username.toLowerCase(),
                    password: password1
                };

                const newUserRef = push(usersRef);
                await set(newUserRef, newUser);

                // Redirigir al formulario de login con un mensaje de éxito al registrarse
                let html = `
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

//Función que muestra un formulario para iniciar sesión
exports.loginUser = async (req, res) => {
    try {
        // Comprobar si en la sesión se ha registrado algún error
        const error = req.session.error;
        req.session.error = null;

        // HTML del formulario de inicio de sesión + mensaje de error
        let html = `
            ${baseHtml()}
            <title>Login</title>
            </head>
            <body>
                <div class="registro">
                    <form class="form-users" action="/login" method="post">
                        <h1>Inicio de sesión</h1>
                        <input type="text" id="username" name="username" placeholder="Nombre de usuario">
                        <p class="error-message-username" style="display: ${error === 'El nombre de usuario está vacío' || error === 'El nombre de usuario no existe' ? 'block' : 'none'};">${error}</p>
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
        console.error(error);
        res.status(500).send(err.message);
    }
};

// Función para procesar los datos y comprobar si el usuario y contraseña introducidos en el formulario existen en la BD
exports.checkUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el nombre de usuario está vacío
        if (!username) {
            req.session.error = 'El nombre de usuario está vacío';
            return res.redirect('/login');
        }

        const database = getDatabase(app);
        const usersRef = ref(database, 'usuarios');

        // Consultar si el usuario ya existe
        const userQuery = query(usersRef, orderByChild('nombre'), equalTo(username.toLowerCase()));
        const snapshot = await get(userQuery);
        const usuarios = snapshot.val();

        if (!usuarios) {
            // Comprobar si el usuario existe
            req.session.error = 'El nombre de usuario no existe';
            return res.redirect('/login');
        } else {
            // Comprobar si la contraseña coincide
            const userData = Object.values(usuarios)[0];
            if (userData.password !== password) {
                // La contraseña no coincide
                req.session.error = 'La contraseña no es correcta';
                return res.redirect('/login');
            } else {
                // La contraseña coincide, inicia una sesión y redirige a /dashboard
                req.session.username = username;
                return res.redirect('/dashboard');
            }
        }
    } catch (err) {
        console.error(error);
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