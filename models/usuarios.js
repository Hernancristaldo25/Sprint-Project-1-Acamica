let usuarios = [];

class Usuario{
   constructor(username, nombre, apellido, email, password, telefono,direccionEnvio, admin,logueado) {
       this.username = username;
       this.nombre = nombre;
       this.apellido = apellido;
       this.email = email;
       this.password = password;
       this.telefono = telefono;
       this.direccionEnvio = direccionEnvio;
       this.admin = admin === undefined ? false : admin; 
       this.logueado = logueado === undefined ? false : true;
   }
}

module.exports = {usuarios, Usuario};