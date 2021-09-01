const express = require('express');
const morgan = require('morgan');
const config = require('./src/config.js');
/* Importar archivos */
const {usuarios, Usuario, productos, Producto, formasDePago, FormasDePago, pedidos, Pedidos, Pedido} = require('./models/datos.js');
const {isLoginUsuario, existeUsuario, isAdmin, nuevoUsuario} = require('./src/middlewares.js')
/* Server */
const app = express();
app.use(express.json());
app.use(morgan('dev'));

/* Swagger */
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '1.0.0'
    }
  },
  apis: ['./app.js'],
  tags: [
    {
        name: 'general',
        description: 'Operaciones generales'
    },
    {
        name: 'auth',
        description: 'Operaciones sobre autorización'
    },
    {
        name: 'usuarios',
        description: 'Operaciones sobre usuarios'
    },
    {
        name: 'pedidos',
        description: 'Operaciones sobre pedidos'
    },
    {
        name: 'productos',
        description: 'Operaciones sobre productos'
    },
    {
        name: 'formas de pago',
        description: 'Operaciones sobre formas de pago'
    },
]

};
const swaggerDocs = swaggerJsDoc(swaggerOptions);




/* USUARIOS Y SUS OPERACIONES */

/* RUTAS */
/* GET */

/* VER LA VERSIÓN */

/**
 * @swagger
 * /:
 *  get:
 *    tags: [general]
 *    summary: programa
 *    description : Resto
 *    responses:
 *     200: 
 *       description: programa
 */
app.get('/', (req, res) => {
  res.send({programa :'Restó V. 1.0.0'});
})


/* SOLO EL ADMIN PUEDE VER A TODOS LOS USUARIOS EXISTENTES */

/**
 * @swagger
 * /usuarios:
 *  get:
 *    tags: [usuarios]
 *    summary: usuarios
 *    description: Listado de usuarios
 *    tag: Usuario
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Id del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
app.get('/usuarios/:index',isLoginUsuario, isAdmin, function (req, res) {
    console.log(usuarios);
    res.send(usuarios);
});


/* EL/LOS PEDIDO/S DE LOS USUARIOS */

app.get('/usuarios/:index/pedidos',isLoginUsuario, isAdmin, function (req, res) {
    let pedidosUsuario =
    console.log(pedidosUsuario);
    res.send(pedidosUsuario);
});



/* POST */
/* LOGUEARTE CON UN USUARIO */

/**
 * @swagger
 * /login:
 *  post:
 *    tags: [auth]
 *    summary: Login de usuario.
 *    description : Login de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Email y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              description: Email de usuario a loguearse.
 *              type: email
 *              example: hernancristaldo@gmail.com
 *            password:
 *              description: Contraseña de usuario a loguearse 
 *              type: string
 *              example: 123
 *    responses:
 *      200:
 *       description: Login de usuario satisfactorio. 
 *      404:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */

app.post('/login',existeUsuario , function (req, res) {
    console.log('Login OK: ', req.usuarioIndex);
    resultado = 'El usuario se logueo correctamente';
    let usuario = req.usuario;
    usuario.logueado = true;
    res.json({index: req.usuarioIndex});
});

/* CREAR UN USUARIO */

/**
 * @swagger
 * /signup:
 *  post:
 *    tags: [auth]
 *    summary: Registrarse.
 *    description : Listado de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - nombre
 *            - apellido
 *            - email
 *            - password
 *            - telefono
 *            - direccionEnvio
 *          properties:
 *            username:
 *              description: Nombre del usuario
 *              type: string
 *              example: martinskpo
 *            nombre:
 *              description: Nombre del usuario 
 *              type: string
 *              example: Martin
 *            apellido:
 *              description: Apellido del usuario 
 *              type: string
 *              example: Castro
 *            email:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: martin@castro.com
 *            password:
 *              description: Contraseña
 *              type: password
 *              example: 123
 *            telefono:
 *              description: Telefono del usuario
 *              type: string
 *              example: 1234567
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: Calle 258
 *    responses:
 *      200:
 *       description: Usuario registrado
 *      404:
 *       description: Usuario no registrado
 *      
 */

app.post('/singup', nuevoUsuario,function (req, res) {
    let usuario = req.body;
    usuarios.push(usuario);
    res.send({resultado:'True', mensaje:'Usuario registrado correctamente.'});
        });

/* DELETE */

/**
 * @swagger
 * /usuarios/{index}/{id}:
 *  delete:
 *    tags: [usuarios]
 *    summary: Eliminar un usuario  según su ID
 *    description: Elimina el usuario .
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *        description: usuario  eliminado correctamente.
 *       404:
 *        description: usuario  no encontrado.  
 */

app.delete('/usuarios/:index/:id',isLoginUsuario, isAdmin, (req, res) => {
    let index = req.index;
    let usuario = req.usuario;

    let idABorrar = req.params.id;
    let usuarioABorrar = usuarios[idABorrar];

    if (!usuarioABorrar) {
        res.status(404).send({ resultado: 'El Usuario que de desea borrar no existe.' });
    }

    resultado = 'El usuario fue correctamente eliminado';
    usuarios.splice(idABorrar, 1);
    console.log(usuarioABorrar);
    res.json({ resultado: resultado, valor: usuarioABorrar });
  
})






/* PRODUCTOS Y SUS OPERACIONES */
/* GET */

/**
 * @swagger
 * /productos/{index}:
 *  get:
 *    tags: [productos]
 *    summary: productos
 *    description: Listado de productos 
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Id del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de productos
 */

app.get('/productos/:index',isLoginUsuario, (req, res) => {
  console.log(productos);
  res.send(productos);
})

/* POST */

/**
 * @swagger
 * /productos/{index}:
 *  post:
 *    tags: [productos]
 *    summary: Agregar producto.
 *    description : Agregado de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: body
 *        name: producto
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precioVenta
 *            - stock
 *          properties:
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: HB2
 *            nombre:
 *              description: Nombre del producto 
 *              type: string
 *              example: Hamburguesa Veggie
 *            descripcion:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Hamburguesa de vegetales
 *            precioVenta:
 *              description: Precio de venta del producto 
 *              type: string
 *              example: 400
 *            stock:
 *              description: Stock
 *              type: string
 *              example: 50
 *            cantidad:
 *              description: Cantidad
 *              type: integer
 *              example: 1
 *    responses:
 *      200:
 *       description: Producto creado
 *      404:
 *       description: Producto no creado
 *      
 */

app.post('/productos/:index',isLoginUsuario, isAdmin, (req, res) => {
  let productoNuevo = req.body;
  productos.push(productoNuevo);
  res.send({resultado:'El producto fue agregado correctamente', datos: productoNuevo});
})


/* PUT */

/**
 * @swagger
 * /productos/{index}/{codigoProducto}:
 *  put:
 *    tags: [productos]
 *    summary: Editar un producto.
 *    description : Actualización de datos de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: codigoProducto
 *        required: true
 *        description: Código de producto a actualizar.
 *        schema:
 *          type: string
 *          example: HB1
 *      - in: body
 *        name: producto
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precioVenta
 *            - stock
 *          properties:
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: HB1
 *            nombre:
 *              description: Nombre del producto 
 *              type: string
 *              example: Hamburguesa 
 *            descripcion:
 *              description: Descripcion del producto 
 *              type: string
 *              example: Hamburguesa clasica con jamon y queso
 *            precioVenta:
 *              description: Precio de venta del producto 
 *              type: string
 *              example: 380
 *            stock:
 *              description: Stock
 *              type: string
 *              example: 50
 *    responses:
 *      200:
 *       description: Producto actualizado
 *      404:
 *       description: Producto no actualizado
 *      
 */

app.put('/productos/:index/:codigoProducto',isLoginUsuario, isAdmin, (req, res) => {
  let productoActualizado = req.body;

  let codigo = req.params.codigoProducto;
  let index = req.params.index;

    if (codigo != productos[index].codigo) {
        res.status(404).send ({resultado:'Codigo incorrecto o inexistente.'});
    }else{
    productos[index] = productoActualizado;
        res.send({resultado: 'El producto se actualizó correctamente.'});
    }

})

/* DELETE */

/**
 * @swagger
 * /productos/{index}/{codigoProducto}:
 *  delete:
 *    tags: [productos]
 *    summary: Eliminar un producto.
 *    description: Elimina un producto según un codigo de producto.
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: codigoProducto
 *         required: true
 *         description: Código de producto a borrar.
 *         schema:
 *           type: string
 *           example: HB1
 *    responses:
 *       200:
 *        description: producto eliminado correctamente.
 *       404:
 *        description: producto no encontrado.  
 */


app.delete('/productos/:index/:codigoProducto', isLoginUsuario, isAdmin, (req, res) => {
    let codigoABorrar = req.params.codigoProducto;

    productoABorrar = productos.find(elemento => elemento.codigo == codigoABorrar);

    if (!productoABorrar) {
        res.status(404).send({ resultado: 'El Producto que desea borrar no existe.' });
    }else{
        let idArray = productos.indexOf(productoABorrar);
        resultado = 'El producto fue correctamente eliminado';
        productos.splice(idArray,1);
        console.log(productoABorrar);
        res.json({ resultado: resultado, valor: productoABorrar });
    }

    
})






/* PEDIDOS Y SUS OPERACIONES */


/* GET */

/**
 * @swagger
 * /pedidos/{index}:
 *  get:
 *    tags: [pedidos]
 *    summary: pedidos
 *    description: Listado de pedidos 
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Id del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de pedidos
 */

app.get('/pedidos/:index', isLoginUsuario, isAdmin, (req, res) => {
  res.send(pedidos)
})


/**
 * @swagger
 * /pedidos/{index}/historial:
 *  get:
 *    tags: [pedidos]
 *    summary: pedidos
 *    description: Listado de pedidos por usuario  
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Id del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *         description: Listado de pedidos
 */

app.get('/pedidos/:index/historial', isLoginUsuario, (req, res) => {
    /* info usuario del param index */
    let index = req.usuarioIndex;
    let idArray = usuarios[index];
    /* info del pedido que deberia ser del usuario del param */
    let pedido = pedidos[index - 1]; 
     if (idArray.username != pedidos[index - 1].usuario) {
        res.status(404).send('El usuario que está solicitando no tiene pedidos activos.')
    } else {
        res.send({Usuario:idArray.username, Pedido:pedidos[index - 1]})
    } 
    
    
    console.log(pedidos[index - 1].usuario);



    console.log(idArray.username);

  })


  /* POST */

/**
 * @swagger
 * /pedidos/{index}:
 *  post:
 *    tags: [pedidos]
 *    summary: Agregado de pedido.
 *    description : Agregado de pedido.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1 
 *      - in: body
 *        name: pedido
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - formaDePago
 *          properties:
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: 
 *            formaDePago:
 *              description: Forma de Pago (EF, TC, TD) 
 *              type: string
 *              example: TC
 *    responses:
 *      200:
 *       description: Pedido creado
 *      404:
 *       description: Pedido no creado
 *      
 */


app.post('/pedidos/:index', isLoginUsuario, (req, res) => {




/*     let index = req.usuarioIndex;
    let idArray = usuarios[index]; */

    let direccionEnvio = req.body.direccionEnvio;
    let formaDePago = req.body.formaDePago;
    let cantidad = req.body.cantidad;
    let index = req.index;
    let usuario = req.usuario;

    if (formaDePago == undefined) {
        res.status(404).send({resultado:false,mensaje:'La forma de pago seleccionada es invalida'});
    } else {

    direccionEnvio = direccionEnvio || usuario.direccionEnvio;
    pedido = new Pedido(usuario.username, formaDePago, cantidad);
    pedido.setDireccionEnvio(direccionEnvio);

    addPedido(pedido);

    res.send({resultado:'True',mensaje:'El Pedido fue recibido correctamente'});
}

})

/* agregar producto a pedido */

/**
 * @swagger
 * /pedidos/{index}/{id}/{codigoProducto}:
 *  post:
 *    tags: [pedidos]
 *    summary: Agregar producto al pedido
 *    description: Agregar producto al id pedido con el codigo del producto 
 *    consumes:
 *      - application/json
 *    parameters:   
 *      - in: path
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del pedido a mostrar
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: codigoProducto
 *        description: Código del producto a agregar al pedido
 *        schema:
 *          type: integer
 *          example: HB1
 *    responses:
 *      200:
 *        description: Ok de producto agregado
 */

app.post('/pedidos/:index/:id/:codigoProducto',isLoginUsuario, (req, res) => {
  
  let idPedidoPar = req.params.id;
  let codigoProducto = req.params.codigoProducto;

  let index = req.usuarioIndex;
  let idArray = req.usuario;

  pedidoAPedir = pedidos.find(elemento => elemento.id == idPedidoPar);
  
  let idPedido = pedidos.indexOf(pedidoAPedir)

  console.log(codigoProducto);
  console.log(pedidoAPedir);
  console.log(idPedido);

  productoAAgregar = productos.find(elemento => elemento.codigo == codigoProducto);

  if (pedidos[idPedido].estado != "PEN") {
    res.status(404).send('Usted no puede cambiar el producto una vez cerró la compra.')
  } else {
       pedidos[idPedido].productos.push(productoAAgregar);
  }

 



  res.send({resultado:'True',mensaje:'El producto fue agregado correctamente a su pedido.'});




})

/* PUT */

/**
 * @swagger
 * /pedidos/{index}/estado/{codigoPedido}:
 *  put:
 *    tags: [pedidos]
 *    summary: Modificación de estado en pedido.
 *    description : Modificación de pedido.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: codigoPedido
 *        required: true
 *        description: ID del pedido a modificar
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: body
 *        name: Pedido
 *        description: Estado del pedido a modificar
 *        schema:
 *          type: object
 *          required:
 *            - estado
 *          properties:
 *            estado:
 *              description: Estado (PEN, CON, ENP, ENT) 
 *              type: string
 *              example: CON
 *    responses:
 *      200:
 *       description: Pedido modificado
 *      404:
 *       description: Pedido no modificado debido a error
 *      
 */

app.put('/pedidos/:index/estado/:codigoPedido',isLoginUsuario, isAdmin, (req, res) => {
    let idPedido = req.params.codigoPedido;

    nuevoEstado = req.body.estado;

    let index = req.usuarioIndex;
    let idArray = req.usuario;

    pedidoACambiar = pedidos.find(elemento => elemento.id == idPedido);


    if (nuevoEstado == undefined) {
        res.status(400).send({resultado:false, mensaje:'El estado del pedido es invalido'})
    } else {
    pedidoACambiar.estado = nuevoEstado;

    mensaje = 'El estado del pedido fue actualizado'

    res.status(200).send({resultado: true, mensaje:mensaje})
    }
})


/**
 * @swagger
 * /pedidos/{index}/cantidad/{codigoPedido}/{codigoProducto}:
 *  put:
 *    tags: [pedidos]
 *    summary: Modificación de cantidad en pedido.
 *    description : Modificación de pedido.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: codigoPedido
 *        required: true
 *        description: ID del pedido a modificar del usuario
 *        schema:
 *          type: integer
 *          example: 1
 *      - in: path
 *        name: codigoProducto
 *        required: true
 *        description: Codigo del producto al que se va a modificar su cantidad
 *        schema:
 *          type: integer
 *          example: HB1
 *      - in: body
 *        name: Pedido
 *        description: Cantidad del pedido a modificar
 *        schema:
 *          type: object
 *          required:
 *            - cantidad
 *          properties:
 *            cantidad:
 *              description: cantidad a aumentar
 *              type: string
 *              example: 2
 *    responses:
 *      200:
 *       description: Pedido modificado
 *      404:
 *       description: Pedido no modificado debido a error
 *      
 */

app.put('/pedidos/:index/cantidad/:codigoPedido/:codigoProducto',isLoginUsuario, (req, res) => {
    let idPedido = req.params.codigoPedido;
    let idProducto = req.params.codigoProducto;

    nuevaCantidad = req.body.cantidad;

    let index = req.usuarioIndex;
    let idArray = req.usuario;

    pedidoACambiar = pedidos.find(elemento => elemento.id == idPedido);
    cantidadACambiar = productos.find(elemento => elemento.codigo == idProducto);


    if (nuevaCantidad == undefined) {
        res.status(400).send({resultado:false, mensaje:'La cantidad que intenta introducir es invalida'})
    } else {
    cantidadACambiar.cantidad = nuevaCantidad;

    mensaje = 'La cantidad del pedido fue actualizado'

    res.status(200).send({resultado: true, mensaje:mensaje})
    }
})


/* DELETE */


/**
 * @swagger
 * /pedidos/{index}/admin/{codigoPedido}:
 *  delete:
 *    tags: [pedidos]
 *    summary: Eliminar un pedido admin.
 *    description: Elimina un pedido según un codigo de pedido.
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: codigoPedido
 *         required: true
 *         description: Código de pedido a borrar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: pedido eliminado correctamente.
 *       404:
 *        description: pedido no encontrado.  
 */

app.delete('/pedidos/:index/admin/:codigoPedido', isLoginUsuario, isAdmin, (req, res) => {
    let codigoABorrar = req.params.codigoPedido;

    pedidoABorrar = pedidos.find(elemento => elemento.id == codigoABorrar);

    if (!pedidoABorrar) {
        res.status(404).send({ resultado: 'El Pedido que desea borrar no existe.' });
    }else{
        let idArray = pedidos.indexOf(pedidoABorrar);
        resultado = 'El pedido fue correctamente eliminado';
        pedidos.splice(idArray,1);
        console.log(pedidoABorrar);
        res.json({ resultado: resultado, valor: pedidoABorrar });
    }

    
})

/**
 * @swagger
 * /pedidos/{index}/usuario/{codigoPedido}:
 *  delete:
 *    tags: [pedidos]
 *    summary: Eliminar un pedido usuario.
 *    description: Elimina un pedido según un codigo de pedido.
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: codigoPedido
 *         required: true
 *         description: Código de pedido a borrar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: pedido eliminado correctamente.
 *       404:
 *        description: pedido no encontrado.  
 */

app.delete('/pedidos/:index/usuario/:codigoPedido', isLoginUsuario, (req, res) => {
    let codigoABorrar = req.params.codigoPedido;
    let indexUsuario = req.usuarioIndex;
    let usuario = req.usuario;


    pedidoABorrar = pedidos.find(elemento => elemento.id == codigoABorrar);
    
    
    idUsuario = usuarios.indexOf(usuario);
    console.log(indexUsuario);
    
    if (codigoABorrar == idUsuario) {
        let idArray = pedidos.indexOf(pedidoABorrar);
        resultado = 'El pedido fue correctamente eliminado';
        pedidos.splice(idArray,1);
        console.log(pedidoABorrar);
        res.json({ resultado: resultado, valor: pedidoABorrar });
    }else{
        res.send({resultado:false,mensaje:'Usted no puede eliminar un pedido que no es suyo'})
    }

    
})


/**
 * @swagger
 * /pedidos/{index}/usuario/{codigoPedido}/{codigoProducto}:
 *  delete:
 *    tags: [pedidos]
 *    summary: Eliminar producto de un pedido de un usario.
 *    description: Elimina un producto de un pedido según un codigo de prodcuto.
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: codigoPedido
 *         required: true
 *         description: Código de pedido a borrar.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: codigoProducto
 *         required: true
 *         description: Código de producto a borrar.
 *         schema:
 *           type: integer
 *           example: HB1
 *    responses:
 *       200:
 *        description: producto eliminardo del pedido.
 *       404:
 *        description: producto no encontrado.  
 */

app.delete('/pedidos/:index/usuario/:codigoPedido/:codigoProducto', isLoginUsuario, (req, res) => {
    let codigoABorrar = req.params.codigoPedido;
    let codigoProductoABorrar = req.params.codigoProducto
    let indexUsuario = req.usuarioIndex;
    let usuario = req.usuario;


    pedidoABorrar = pedidos.find(elemento => elemento.id == codigoABorrar);
    productoABorrar = productos.find(elemento => elemento.codigo == codigoProductoABorrar);
    console.log(productoABorrar);
    
    idUsuario = usuarios.indexOf(usuario);
    console.log(indexUsuario);
    
    if (codigoABorrar == idUsuario) {
        let idArray = pedidos.indexOf(pedidoABorrar);
        resultado = 'El producto fue correctamente eliminado del pedido';
        pedidoABorrar.productos.splice(idArray,1);
        console.log(pedidoABorrar.productos);
        res.json({ resultado: resultado, valor: productoABorrar });
    }else{
        res.send({resultado:false,mensaje:'Usted no puede eliminar un producto que no es suyo'})
    }

    
})




/* FORMAS DE PAGO Y SUS OPERACIONES */

/* GET */

/**
 * @swagger
 * /formasDePago/{index}:
 *  get:
 *    tags: [formas de pago]
 *    summary: Formas de Pago
 *    description: Listado de formas de pago 
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Id del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de formas de pago
 */

app.get('/formasDePago/:index',isLoginUsuario, isAdmin, (req, res) => {
  res.send(formasDePago)
})

/* POST */

/**
 * @swagger
 * /formasDePago/{index}:
 *  post:
 *    tags: [formas de pago]
 *    summary: agregar Formas de Pago.
 *    description : Agregado de formas de Pago.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: body
 *        name: formaDePago
 *        description: Forma a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *          properties:
 *            codigo:
 *              description: Código de la forma de pago
 *              type: string
 *              example: MP
 *            nombre:
 *              description: Nombre de la forma de pago 
 *              type: string
 *              example: Mercado Pago
 *    responses:
 *      200:
 *       description: Forma de pago creada
 *      404:
 *       description: Forma de pago no creada
 *      
 */

app.post('/formasDePago/:index',isLoginUsuario,isAdmin, (req, res) => {
    let FormaDePago = req.body;

    console.log(FormaDePago);
    if (FormaDePago.codigo == "" || FormaDePago.nombre == "") {
    res.status(404).send({resultado:false, mensaje:'Forma de pago invalida, revise los campos.'});
    } else {
    let nuevaFormaDePago = new FormasDePago(FormaDePago.codigo , FormaDePago.nombre);
    formasDePago.push(nuevaFormaDePago);
    res.send({resultado:'True', mensaje: 'La forma de pago fue correctamente añadida'})
}
})

/* PUT */

/**
 * @swagger
 * /formasDePago/{index}/{codigoFormaDePago}:
 *  put:
 *    tags: [formas de pago]
 *    summary: Modificación de Forma de pago.
 *    description : Modificación de forma de pago.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: index
 *        required: true
 *        description: Id del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0 
 *      - in: path
 *        name: codigoFormaDePago
 *        required: true
 *        description: codigo de la forma de pago
 *        schema:
 *          type: integer
 *          example: EF
 *      - in: body
 *        name: Forma de Pago
 *        description: Caracteristicas a cambiar
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *          properties:
 *            codigo:
 *              description: ejemplo (EF, TC, TD) 
 *              type: string
 *              example: EF
 *            nombre:
 *              description: nombre a cambiar 
 *              type: string
 *              example: Efectivo
 *    responses:
 *      200:
 *       description: Forma ded pago modificado
 *      404:
 *       description: forma de pago no modificada debido a error
 *      
 */

app.put('/formasDePago/:index/:codigoFormaDePago',isLoginUsuario, isAdmin, (req, res) => {
    let FormaActualizada = req.body;
  
    let codigo = req.params.codigoFormaDePago;
    let index = req.params.index;
  
      if (codigo != formasDePago[index].codigo) {
          res.status(404).send ({resultado:'Codigo incorrecto o inexistente.'});
      }else{
      formasDePago[index] = FormaActualizada;
          res.send({resultado: 'La forma de pago se actualizó correctamente.'});
      }
  
  })


/* DELETE */

/**
 * @swagger
 * /formasDePago/{index}/{codigoFormaDePago}:
 *  delete:
 *    tags: [formas de pago]
 *    summary: Eliminar una forma de pago admin.
 *    description: Elimina una forma de pago segun su codigo.
 *    parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: path
 *         name: codigoFormaDePago
 *         required: true
 *         description: Código de pedido a borrar. EJEMPLO (EF, TC, TD).
 *         schema:
 *           type: integer
 *           example: EF
 *    responses:
 *       200:
 *        description: forma de pago eliminado correctamente.
 *       404:
 *        description: forma de pago no encontrado.  
 */

app.delete('/formasDePago/:index/:codigoFormaDePago', isLoginUsuario, isAdmin, (req, res) => {
    let codigoABorrar = req.params.codigoFormaDePago;

    formaABorrar = formasDePago.find(elemento => elemento.codigo == codigoABorrar);

    if (!formaABorrar) {
        res.status(404).send({ resultado: 'La forma de pago que desea borrar no existe.' });
    }else{
        let idArray = formasDePago.indexOf(formaABorrar);
        resultado = 'La forma de pago fue correctamente eliminada';
        formasDePago.splice(idArray,1);
        console.log(formasDePago);
        res.json({ resultado: resultado, valor: formaABorrar });
    }

    
})

/* Inicializar server */

app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));
   /* View in  localhost:3000/api-docs.*/

app.listen(config.port, () =>{
    console.log(`El server está escuchando en el puerto , ${config.port}`);
})