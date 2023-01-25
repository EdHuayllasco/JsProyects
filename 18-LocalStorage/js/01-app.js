//LOCAL STORAGE FUNCIONA A LARGO PLAZO DESPUES DE APAGAR LA PC
// SOLO ALMACENA STRINGS
// SESION STORAGE UNA VEZ QUE CIERRES LA PESTANA SE TERMINA
localStorage.setItem('nombre', 'Edward');
// sessionStorage.setItem('nombre', 'Edward');
const producto = {
    nombre : "monitor 24 pulgadas",
    precio: 300
};
// CONVIERTE UN OBJETO A UN STRING
const productoString = JSON.stringify(producto);
localStorage.setItem('produto', productoString);

const meses = ['enero', 'febrero' ,'marzo'];
// const mesesString = JSON.stringify(meses);
localStorage.setItem('meses', JSON.stringify(meses));
