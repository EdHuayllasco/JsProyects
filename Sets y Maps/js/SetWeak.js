// weakset no es iterable, no tiene .size, solo funcina con objetos
const weakset = new WeakSet();
const cliente = {
    nombre: 'Edward',
    saldo: 100
};
const cliente1 = {
    nombre: 'Edward',
    saldo: 100
};
weakset.add(cliente);
weakset.add(cliente1);
console.log(weakset);