// weakmaps no es iterable, no tiene size, no obtienes la informacion de la llave con get
const producto = {
    idProducto :  10
};
const weakmap = new WeakMap();
weakmap.set(producto,'Monitor');
console.log(weakmap.get(producto));
console.log(weakmap.delete(producto));
console.log(weakmap)