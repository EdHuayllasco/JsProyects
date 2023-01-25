//OBTENER INFORMACION DE LOCAL STORAGE
const nombre = localStorage.getItem('nombre');
console.log(nombre);

// PARSE CONVIERTE DE STRING A OBJETO, SIEMPRE Y CUANDO ESTE BIEN DEFINIDO

const productoJSON = localStorage.getItem('produto');
const productoObjeto = JSON.parse(productoJSON);
console.log(productoObjeto);

const meses = localStorage.getItem('meses');
console.log(JSON.parse(meses));