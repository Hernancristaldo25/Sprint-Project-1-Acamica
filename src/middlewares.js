const {
    usuarios
} = require('../models/datos.js');

/* MIDDLEWARES */
function isLoginUsuario(req, res, next) {
    id = parseInt(req.params.index);
    index = id;
    usuario = usuarios[index]


    if (!usuario) {
        res.status(404).send({ resultado: 'El usuario no existe.'})}
    
    if (usuario.logueado != true) {
        res.status(404).send({ resultado: 'El usuario no está logueado.'})
    } else {
        req.usuarioIndex = index;
        req.usuario = usuario;
        next();
    }
}


function nuevoUsuario(req,res,next) {
    let username = req.body.username;
    let email = req.body.email;

    for (let i = 0; i < usuarios.length; i++) {

        if (username == usuarios[i].username ) {
            return res.status(404).send({resultado:'False', mensaje:'Ya existe un usuario registrado con el username indicado.'});
}
        if (email == usuarios[i].email) {
            return res.status(404).send({resultado:'False', mensaje:'Ya existe un usuario registrado con el email indicado.'});
        }
}next()}


function existeUsuario(req, res, next) {
    email = req.body.email;
    password = req.body.password;
    index = usuarios.findIndex(elemento => elemento.email == email && elemento.password == password);

    if (index === -1) {
        res.status(404).send({
            resultado: 'False',
            mensaje: 'El usuario no está logueado o no existe'
        });
    } else {
        req.usuarioIndex = index;
        req.usuario = usuarios[index];
        next();
    }
}



function isAdmin(req, res, next) {
    admin = req.usuario.admin;
    borrado = req.usuario.borrado;
    if (!admin && !borrado) {
        res.status(404).send({
            resultado: 'false',
            mensaje: 'Acesso Denegado.'
        })
    } else {
        next();
    }
}

module.exports = {
    isLoginUsuario,
    nuevoUsuario,
    existeUsuario,
    isAdmin
};