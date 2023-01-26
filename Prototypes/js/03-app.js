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
//INSTANCIARLO

const pedro = new Cliente('pedro', 6000);
// console.log(pedro.tipocliente());
pedro.retiraSaldo(1000);
console.log(pedro.nombreClienteSaldo());
console.log(pedro);