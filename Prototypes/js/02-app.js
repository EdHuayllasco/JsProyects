function Cliente (nombre, saldo){
    this.nombre = nombre ;
    this.saldo =saldo;
}
const juan = new Cliente('Juan',500);
console.log(juan);

function formatearEmpresa(cliente){
    const {nombre, saldo, categoria} = cliente;
    return  `el ${nombre} tiene un saldo de ${saldo} y pertenece a ${categoria}`;
}
function formatearCliente(cliente){
    const {nombre, saldo} = cliente;
    return  `el ${nombre} tiene un saldo de ${saldo}`;
}
console.log( formatearCliente(juan));

function Empresa (nombre, saldo, categoria){
    this.nombre = nombre ;
    this.saldo =saldo;
    this.categoria = categoria;
}
const repsol = new Empresa('Repsol', 4500,  'Cursos en linea');
console.log(formatearEmpresa(repsol));
