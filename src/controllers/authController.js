exports.createUser = async (req, res) => {
    try {
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <title>Registro</title>
                    </head>
                    <body>
                    <form class="form-users" action="/register" method="POST">
                        <input type="text" id="username" name="username" placeholder="Nombre de usuario">
                        <br><br>
                        <input type="password" id="password1" name="password1" placeholder="Contraseña">
                        <br><br>
                        <input type="password" id="password2" name="password2" placeholder="Repita la contraseña">
                        <br><br>
                        <div class="buttons">
                            <button class="register" type="submit">Crear</button>
                        </div>
                    </form>
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
        console.log('user: ' + username);
        console.log('pass1: ' + password1);
        console.log('pass2: ' + password2);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.loginUser = async (req, res) => {
    try {
        let html = `
                <html>
                    <head>
                        ${baseHtml()}
                        <title>Login</title>
                    </head>
                    <body>
                    <form class="form-users" action="/login" method="POST">
                        <input type="text" id="username" name="username" placeholder="Nombre de usuario">
                        <br><br>
                        <input type="password" id="password" name="password" placeholder="Contraseña">
                        <br><br>
                        <div class="buttons">
                            <button class="login" type="submit">Entrar</button>
                            <button class="register" type="submit">Regístrate</button>
                        </div>
                    </form>
                </body>
            </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.send(html);

        console.log('creando usuario')
        console.log(req.body)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.checkUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('user: ' + username);
        console.log('pass: ' + password);
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