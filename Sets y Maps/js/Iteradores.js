const ciudades = ['Londres', 'New YOrk', 'Madrid', 'Paris'];
const ordenes = new Set([123,231,131,102]);
const datos = new Map();
datos.set('nombre', 'edward');
datos.set('profesion', 'Desarrollador');
// // ENTRY ITERATOR
// for(let entry of ciudades.entries()){
//     console.log(entry);
// }
// for(let entry of ordenes.entries()){
//     // imprime, llame y valor
//     console.log(entry);
// }
// for(let entry of datos.entries()){
//     // imprime, llame y valor
//     console.log(entry);
// }

// VALUE ITERATOR
for(let value of ciudades.values()){
    console.log(value);
}
for(let value of ordenes.values()){
    console.log(value);
}
for(let value of datos.values()){
    console.log(value);
}
// of manda el valor, in los indices
// for(let ciudad of ciudades){
//     console.log(ciudad);
// }

//KEYS ITERATOR 
for(let keys of ciudades.keys()){
    console.log(keys);
}
// set no tiene llave pero, las crea
for(let keys of ordenes.keys()){
    console.log(keys);
}
