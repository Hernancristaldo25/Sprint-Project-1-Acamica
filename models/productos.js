let productos = [];


class Producto{
    constructor(codigo, nombre, descripcion, precioVenta, stock,cantidad){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioVenta = precioVenta;
        this.stock = stock;
        this.cantidad = 1;
    }

}

module.exports = {productos, Producto}
