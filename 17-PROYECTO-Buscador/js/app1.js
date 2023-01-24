const resultados = document.querySelector('#resultado');
const buscador = document.querySelector('#buscador');
const max = new Date().getFullYear();
const min = max - 10 ;
const datosbusqueda = {
    marca:'',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

//EVENTO LISTENER FUNCTION
addEventListener();

function addEventListener (){
    document.addEventListener('DOMContentLoaded', ()=>{
        mostrarAutos(autos); 
        CargarYear();
    });
    buscador.addEventListener('change',AgregarValores);
};

// FUNCIONES

function AgregarValores(e){
    datosbusqueda[e.target.id] = e.target.value;
    filtrarAuto();
}

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

function CargarYear(){
    for (let index = max ; index >= min ; index--) {
        const opcion = document.createElement('option');
        opcion.value = index;
        opcion.textContent = index;
        year.appendChild(opcion);
    }
}

function filtrarAuto(){
    //FUNCIONES DE ALTO NIVEL
    const resultado = autos.filter(filtroHandler);
    if(resultado.length){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    
}
function noResultado(){
    LimpiarHTML();
    //ALERTA 
    Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Auto no encontrado realize otra busqueda'
    });
}
function filtroHandler( auto ){
    const {marca, year, minimo, maximo, puertas, transmision,color } = datosbusqueda;
    return (
            (marca === '' || auto.marca ===marca) &&
            (year === '' || auto.year  == year) &&
            (minimo === '' || auto.precio >= minimo) &&
            (maximo ==='' || auto.precio <= maximo) &&
            (puertas ==='' || auto.puertas == puertas) &&
            (transmision ==='' || auto.transmision ===transmision) &&
            (color ==='' || auto.color===color)
        )
}
