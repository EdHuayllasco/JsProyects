
// function *crearGenerador() {
//     yield 1;
//     yield 'Juan';
//     yield 3+3;
//     yield true;
// }
// const iterador = crearGenerador()
// console.log(iterador);
// console.log(iterador.next().value);
// console.log(iterador.next().done);
// console.log(iterador.next().value);
// console.log(iterador);
//generador para carritos de compras
function *generador(carrito){
    for(let i = 0  ; i < carrito.length ; i++){
        yield carrito[i];
    }
}
const carrito = ['producto1', 'producto2', 'producto3'];
const iterador = generador(carrito);
console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());