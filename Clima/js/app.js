const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
// igual al domloadcontent
window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
});
function buscarClima(e){
    e.preventDefault();
    const ciudadInput = document.querySelector('#ciudad');
    const paisInput = document.querySelector('#pais');
    if(ciudadInput.value === "" || paisInput.value === ""){
        mostrarError('Ambos campos son obligatorios','error');
        return;
    }
    consultarAPI(ciudadInput,paisInput);
}
function mostrarError(mensaje, tipo){
    const bandera = document.querySelector('.activo');
    if(!bandera){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded','max-w-md', 'mx-auto','mt-6', 'text-center', 'activo');
        alerta.innerHTML = `
            <strong class="font-bold"> Error!</strong>
            <span class="block">${mensaje}</span> 
        `;
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);    
    }
}
function consultarAPI(ciudadInput, paisInput){
    const appId = 'cbaa44a6fe7892ecb8cfce533d87e52a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadInput.value},${paisInput.value}&appid=${appId}`;
    spinner();
    setTimeout(() => {
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            limpiarHTML();
            if(resultado.cod ==="404"){
                mostrarError('Ciudad no encontrada','error');
            }
            // Imprimir respuesta en HTML
            mostrarClima(resultado);
        })
    }, 2000);
    
}
function mostrarClima(datos){
    
    const {name, main:{temp, temp_max, temp_min}} = datos;
    
    const centigrados = KelvinaCent(temp);
    const maxcent = KelvinaCent(temp_max);
    const mincent = KelvinaCent(temp_min);

    const nombreCiudad =  document.createElement('p');
    nombreCiudad.textContent = `Clima de ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-6xl');

    const actual = document.createElement('p');
    actual.innerHTML = `
        ${centigrados} &#8451
    `;
    const tempMax = document.createElement('p');
    tempMax.innerHTML = `
        Max: ${maxcent} &#8451
    `
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `
        Min: ${mincent} &#8451
    `
    tempMax.classList.add('text-xl');
    actual.classList.add('font-bold', 'text-6xl');
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    resultado.appendChild(resultadoDiv);
}
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
const KelvinaCent = (grados) => parseInt(grados - 273.15);
limpiarHTML();
function spinner (){
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner);
}