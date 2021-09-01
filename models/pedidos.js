/* Importancio de archivos necesarios */

let usuarios = require ('./usuarios.js');
let produtos = require ('./productos.js');






let pedidos = [];

addPedido = (pedido) => {
    
    let index = pedidos.length;
    this.id = index + 1;
    pedido.setNumero(this.id);
    pedidos.push(pedido);}




class Pedidos{
    constructor (id, estado){
        this.id = id;
        /* PEN = Pendiente, CON = Confirmado, ENP= En preparación, ENV= Enviado ENT = Entregado */
        this.estado = estado;
    }

}



class Pedido {
    constructor(usuario, formaDePago) {
        // asignación de numero de pedido
        this.usuario = usuario;
        this.direccionEnvio = 'Calles de prueba.';
        //Forma de pago. TC = TarjetaCredito, TD = TarjetaDebito, EF = Efectivo.
        this.formaDePago = formaDePago;
        this.fechaHora = new Date();

        /* PEN = Pendiente, CON = Confirmado, ENP= En preparación, ENV= Enviado ENT = Entregado */
        this.estado = 'PEN';

        this.productos = [];
    }
    setNumero(id){
        this.id = id;
    };

    addProducto(producto){
        this.productos.push(producto); 
    };

    setEstado(estado){
        this.estado = estado;
    }
    
    getEstado(){
        return this.estado;
    }

    setDireccionEnvio(direccionEnvio){
        this.direccionEnvio = direccionEnvio;
    }

    setFormaDePago(formaDePago){
        this.formaDePago = formaDePago
    }
    
    getFormaDePago(){
        return this.formaDePago
    }
    
}

module.exports = {pedidos, Pedidos, Pedido};