// arreglo que no acepta duplicado
// toma en cuenta mayusculas y minusculas
const carrito = new Set();
carrito.add('Camisa');
carrito.add('Disco');
carrito.add('camisa');
carrito.delete('camisa');
console.log(carrito.has('camisa'));
console.log(carrito.size);
console.log(carrito);
//limpiar todo
// carrito.clear();
carrito.forEach((producto, index, pertenece)=>{
    // producto e index imprimen lo mismo aunque sean distintos
    // console.log(producto);
    console.log(index);
    // console.log(pertenece);
});
const numeros = [10,30,20,50,40,10,30];
const no_duplicados = new Set(numeros);
console.log(no_duplicados);