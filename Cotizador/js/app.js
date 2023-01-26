//CONSTRUCTORIES 
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// realiza la cotizacion con los datos 
// cuando accedes a datos del objeto es mejor usar function
Seguro.prototype.cotizarseguro = function () {
    /* 1 = Americano 1.15 , 2 = Asiatico = 1.05 , 3= Europeo 1.35 */
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':   
            cantidad = base*1.15;
            break;
        case '2':
            cantidad = base*1.05;
            break;
        case '3':
            cantidad = base*1.35;
            break;
        default:
            break;
    }
    // LEER YEAR, por cada anio el costo se reduce un 3%

    let yeranow = new Date().getFullYear();
    let difyear = yeranow - this.year;
    cantidad -= ((difyear * 3) * cantidad) / 100;

    //TIPO DE SEGURO 
    // BASICO + 30% COMPLETO +50%
    if(this.tipo === 'basico'){
        cantidad *=1.3;
        // cantidad = (cantidad*1.3);
    }else{
        cantidad *=1.5;
        // cantidad = (cantidad*1.5);
    }
    return cantidad;
    
}

function UI(){

}

//lLENA opciones de los years.
UI.prototype.llenaropciones = ()=> {
    const max = new Date().getFullYear();
    const mix = max - 20;
    const selecYear = document.querySelector('#year'); 
    for(let i = max ; i > mix ; i--){
        const select = document.createElement('option');
        select.value = i;
        select.textContent = i;
        selecYear.appendChild(select);
    }

}
//MUESTRA ALERTA ERROR
UI.prototype.msjerror = (mensaje, tipo) => {
    const div = document.createElement("DIV");
    if (tipo === "error"){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    const formulario = document.querySelector('#cotizar-seguro');
    //INSERTAR ANTES DE : 
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(()=>{
        div.remove();
    },3000);

}
UI.prototype.mostrarmensaje = (seguro, cantidad)=>{
    const {marca, year, tipo} = seguro;
    let marcareal;
    switch (marca) {
        case '1':
            marcareal = "Americano";
            break;
        case '2':
            marcareal = "Asiatico";
            break;
        case '3':
            marcareal = "Europe";
            break;
        default:
            break;
    }
    const div = document.createElement("DIV");
    div.classList.add('mt-10');
    // text content unicamente cuando agregamos un texto e innerHTMl cuando vamos a crear HTML
    div.innerHTML = `
        <p class="header"> Tu resumen  </p>
        <p class="font-bold"> La Marca : <span class="font-normal">${marcareal}</span> </p>
        <p class="font-bold"> El anio : <span class="font-normal">${year}</span> </p>
        <p class="font-bold"> El tipo : <span class="font-normal capitalize">${tipo}</span> </p>
        <p class="font-bold"> Total: $ <span class="font-normal">${cantidad}</span> </p>
    `;
    const resultado = document.querySelector('#resultado');
    
    //mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'; // SE BORRA EL SPINNER
        resultado.appendChild(div); // SE MUESTRA EL RESULTADO
    }, 3000);

    
}

//INSTANCIAR 
const ui = new UI();

//LISTENERS
document.addEventListener('DOMContentLoaded', ()=>{
    //LLENA EL SELECT CON LOS ANIOS
    ui.llenaropciones();    
});

//FUNCIONES
Eventlisteners ();
function Eventlisteners (){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}
let cotizando = false;
function cotizarSeguro(e){
    
    e.preventDefault();
    if (cotizando) return;
    cotizando = true;
    // LEER MARCA
    const marca = document.querySelector('#marca').value;
    //LEER YEAR
    const year = document.querySelector('#year').value;
    // LEER TIPO 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if(marca === "" || year === "" || tipo === ""){
        ui.msjerror('Todos los campos son obligatorios' , 'error');
        return;
    }
    ui.msjerror('Cotizando', 'exito');
    
    //OCULTAR COTIZACIONES PREVIAS
    const resultado = document.querySelector('#resultado div');
    if(resultado !== null){
        resultado.remove();
    }

    //INSTANCIAR SEGURO
    const seguro = new Seguro(marca, year, tipo);
    const cantidad = seguro.cotizarseguro();

    //UTILIZAR PROTYPE QUE A COTIZAR
    ui.mostrarmensaje(seguro, cantidad);
    setTimeout(() => {
        cotizando = false;
    }, 3000);
}