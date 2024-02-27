const bcrypt = require('bcrypt');
const { firebaseConfig } = require('../config/firebase');

console.log('ID del proyecto de Firebase:', firebaseConfig.projectId);

exports.showFormLogin = async (req, res) => {

    //Formulario de login
    let html = `
        <html>
            <head>
                ${baseHtml()}
                <title>Login</title>
            </head>
            <body style="background: linear-gradient(to right, rgb(211, 204, 227), rgb(233, 228, 240))">
                <form class="form-login" action="/login" method="POST">
                    <input type="text" id="nameUser" name="name" placeholder="Nombre de usuario">
                    <br><br>
                    <input type="password" id="passwordUser" name="password" placeholder="Contraseña">
                    <br><br>
                    <div class="buttons">
                        <button class="login" type="submit">Entrar</button>
                        <button class="registro" type="submit">Registro</button>
                    </div>
                </form>
            </div>
        </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
}

/*
//Obtenemos valores del formulario de login
    const { name, password } = req.body;

    if (name && password) {
        //Buscamos usuario en la BD
        const user = await User.findOne({ name });
    }

    try {
        if (user) {
            // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

            if (passwordMatch) {
                req.session.usuario = user;
                console.log('Inicio de sesión exitoso.');
            } else {
                console.log('Contraseña incorrecta.');
            }
        } else {
            console.log('Usuario no encontrado.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
*/
/*
Obtenemos valores del formulario de registro 
const { name, password1, password2 } = req.body;

    if (password1 === password2) {
        const hashPass = await bcrypt.hash(password1, 10); 
        // Guardar el usuario en la base de datos, almacenando el hashPass
    }
*/
exports.showFormRegister = async (req, res) => {
    try {
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <title>Login</title>
                    </head>
                    <body style="background: linear-gradient(to right, rgb(211, 204, 227), rgb(233, 228, 240))">
                        <form class="form-login" action="/register" method="POST">
                            <input type="text" id="nameUser" name="name" placeholder="Nombre de usuario" required>
                            <br><br>
                            <input type="password" id="passwordUser1" name="password1" placeholder="Contraseña" required>
                            <br><br>
                            <input type="password" id="passwordUser2" name="password2" placeholder="Vuelve a introducir la contraseña" required>
                            <br><br>
                            <div class="buttons">
                                <button class="save" type="submit">Guardar</button>
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
}

//Cargar estilos HTML
baseHtml = () => {
    let html = `
    <html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="/styles.css">
    `;
    return html;
}