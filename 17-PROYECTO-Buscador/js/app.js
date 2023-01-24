//VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultados = document.querySelector('#resultado');

// NOS DEVUELVE EL ANIO ACTUAL
const max = new Date().getFullYear();
const min = max - 10 ;
//OBJETO CON LA BUSQUEDA
const datosbusqueda = {
    marca:'',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};
// EVENTOS
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); //MUESTRA AUTOMOVILES
    // LLENAR OPCIONES DE ANIOS
    CargarYear();
});
// EVENT LISTENER PARA LOS SELECT DE BUSQUEDA
marca.addEventListener('change', AgregarValores);
year.addEventListener('change', AgregarValores);
minimo.addEventListener('change', AgregarValores);
maximo.addEventListener('change', AgregarValores);
puertas.addEventListener('change', AgregarValores);
transmision.addEventListener('change', AgregarValores);
color.addEventListener('change', AgregarValores);

//FUNCIONES
function mostrarAutos(autos){
    //LIMPIA HTML PREVIO
    LimpiarHTML();
    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color } = auto; 
        const autohtml = document.createElement('P');
        autohtml.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        //INSERTAR EN EL HTML
        resultados.appendChild(autohtml);
    })
}
// LIMPIAR HTML
function LimpiarHTML(){
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild);
    }
}
// GENERA LOS ANIOS DEL SELECT
function CargarYear(){
    for (let index = max ; index >= min ; index--) {
        //OPTION ES PARA LAS OPCIONES EN EL SELECT HTML AGREGAMOS UN VALUE Y UN TEXTCONTENT
        const opcion = document.createElement('option');
        opcion.value = index;
        opcion.textContent = index;
        year.appendChild(opcion);
    }
}

function AgregarValores(e){
    datosbusqueda[e.target.id] = e.target.value;
    filtrarAuto();
}

function filtrarAuto(){
    //FUNCIONES DE ALTO NIVEL
    // filter de autos es como un foreach y revisa cada uno por eso podemos enviarle auto a la otra funcion
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if(resultado.length){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    
}
function noResultado(){
    LimpiarHTML();
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros terminos';
    resultados.appendChild(noResultado);
    //ALERTA 
    Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Auto no encontrado realize otra busqueda'
    });
}
function filtrarMarca(auto){
    const {marca} = datosbusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto){
    const {year} = datosbusqueda;
    if(year){
        // console.log(typeof year);
        // el que se almacena en datos de busque se almacena como string
        // el que esta en la BD es int, lo solcuionamos haciendo al ocmparacion con valor
        return auto.year == year;
        // o transformamos a int
        //return auto.year === parseInt(year);
    }
    return auto;
}
function filtrarMinimo(auto){
    const {minimo} = datosbusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    const {maximo} = datosbusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto){
    const {puertas} = datosbusqueda;
    if(puertas){
        return auto.puertas == puertas;
        //return auto.puertas === parseInt(puertas);
    }
    return auto;
}
function filtrarTransmision(auto){
    const {transmision} = datosbusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const {color} = datosbusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}