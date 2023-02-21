
function creatIterador(carrito){
    let i = 0;

    return {
        siguiente : () =>{
            const fin = (i >= carrito.lenght);
            const valor = !fin ? carrito[i++] : undefined;
            return{
                fin,valor
            }
        }
    }

}
const carrito = ['producto1','producto2','producto3'];
const recorrerCarrito = creatIterador(carrito);
console.log(recorrerCarrito.siguiente());
console.log(recorrerCarrito.siguiente());
console.log(recorrerCarrito.siguiente());
console.log(recorrerCarrito.siguiente());
console.log(recorrerCarrito.siguiente());
