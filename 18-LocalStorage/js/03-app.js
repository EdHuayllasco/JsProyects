// ELIMINAR ELEMENTO DE LOCAL STORAGE
localStorage.removeItem('nombre');

//ACTUALIZAR UN REGISTRO
const meses = JSON.parse(localStorage.getItem('meses'));
console.log(meses);
meses.push('nuevo mes');
console.log(meses);
localStorage.setItem('meses', JSON.stringify(meses));

//ELIMINAR TODO DE LOCAL STORAGE
localStorage.clear();