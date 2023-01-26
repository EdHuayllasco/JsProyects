//HERENCIA
// arrow function es global y function por objeto
function Cliente (nombre, saldo){
    this.nombre = nombre ;
    this.saldo =saldo;
}
Cliente.prototype.tipocliente = function (){
    let tipo;
    if(this.saldo > 10000){
        tipo = 'Gold';
    } else if(this.saldo >5000){
        tipo = 'Platino';
    } else {
        tipo = 'Normal';
    }
    return tipo;
}
Cliente.prototype.nombreClienteSaldo = function(){
    return `Nombre : ${this.nombre} y su saldo es: ${this.saldo}, tipo Cliente: ${this.tipocliente()}`;
}
Cliente.prototype.retiraSaldo = function(retiro){
    // this.saldo = this.saldo - retiro;
    this.saldo -= retiro;
}
function Persona(nombre,saldo, telefono){
    Cliente.call(this, nombre, saldo);
    this.telefono =telefono;
}
//PASARLE LAS FUNCIONES DE CLIENTE A PERSONA
//CUANDO HACEMOS ESTO PERDEMOS EL OCNSTRUCTOR DE CLIENTE EN PERSONA
Persona.prototype = Object.create(Cliente.prototype);
// ASIGNAMOS NUEVAMENTE
Persona.prototype.constructor = Cliente;
//INSTALNCIARLO
const juan = new Persona('juan', 500, 123123123);
console.log(juan);

Persona.prototype.mostrarTelefono = function (){
    return `el telefono es ${this.telefono}`;
}
console.log(juan.nombreClienteSaldo());
console.log(juan.mostrarTelefono());