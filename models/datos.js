/* CARGO LOS DATOS POR DEFECTO */
let {usuarios, Usuario} = require('./usuarios');
let {productos, Producto} = require('./productos');
let {pedidos, Pedidos, Pedido} = require('./pedidos');
let {formasDePago, FormasDePago} = require('./formaDePago');


/* USUARIOS */
let admin = new Usuario ('admin', 'admin', null, 'admin@admin', 'admin', null, null, true, true);
let usuario1 = new Usuario ('hernanxc','Hernan', 'Cristaldo', 'hernancristaldo@gmail.com', '123', '1234567', 'Calle 105');
let usuario2 = new Usuario ('mateolh', 'Mateo', 'Holzer', 'mateoholzer@gmail.com', '456', '678910', 'Calle 106');

usuarios = [admin, usuario1, usuario2];

/* PRODUCTOS */

let hamburguesa1 = new Producto ('HB1', 'Hamburguesa Clasica', 'Hamburguesa clasica con jamon y queso', '$350', '50');
let sandwich1 = new Producto ('SV1', 'Sandwich Veggie', 'Sandwich de vegetales', '$310', '25');
let ensalada1 = new Producto('EV', 'Ensalada Veggie', 'Ensala de vegetales', '$340', '25');


productos = [hamburguesa1, sandwich1, ensalada1];


/* FROMAS D PAGO */
formasDePago=[
    new FormasDePago('EF', "Efectivo"), 
    new FormasDePago('TC','Tarjeta de Crédito'), 
    new FormasDePago('TD','Tarjeta de Débito')
]


/* PEDIDOS */
let pedido1 = new Pedido('hernanxc', 'EF');
pedido1.addProducto(hamburguesa1);
pedido1.addProducto(ensalada1);
let pedido2 =new Pedido('mateolh', 'TC');
pedido2.addProducto(sandwich1);

/* CARGAR PEDIDOS EN LA API */
addPedido(pedido1);
addPedido(pedido2);

module.exports = {usuarios, Usuario, productos, Producto, formasDePago, FormasDePago, pedidos, Pedidos, Pedido}