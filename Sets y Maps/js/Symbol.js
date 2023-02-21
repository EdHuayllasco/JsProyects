const sym = Symbol('1');
const sym2 = Symbol('1');
if(sym === sym2){
    console.log('son iguales');
}else{
    console.log('no son iguales');
}
//nunca un symbol es igual a otro


const nombre = Symbol();
const apellido = Symbol();
const persona = {};
// para asignar a un objeto se utiliza corchetes
persona[nombre] = 'Edward';
persona[apellido] = 'Huayllasco';
persona.tipoCliente = 'Premium';
persona.saldo = 600;
console.log(persona);
console.log(persona.tipoCliente);
// para acceder al valor de un symbol en un objeto
console.log(persona[nombre]);

// las propiedades que utiliza un symbol no son iterables
for(let i in persona.tipoCliente ){
}

// Puede agregar una descripcion un symbol
const nombreCliente = Symbol('Nombre del cliente');
const cliente = {

}
cliente[nombreCliente] = 'Edawrd';
console.log(cliente[nombreCliente]);