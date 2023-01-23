document.addEventListener('DOMContentLoaded', function(){
    //SELECCIONAR ELEMENTOS DE LA INTERFAZ
    const email = document.querySelector('#email');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    //ASIGNAR EVENTOS BLUR SALIENDO DEL CAMPO, INPUT TIEMPO REAL
    email.addEventListener('blur', ValidarCampo);
    asunto.addEventListener('blur', ValidarCampo); 
    mensaje.addEventListener('blur', ValidarCampo);
    function ValidarCampo(e){
        //nextElementSibling = recorrer el dom al hermano.
        const padre = e.target.parentElement;
        // trim = desaparece los espacios
        if ( e.target.value.trim() === ""){
            const nombre = e.target.id;            
            mostraralerta(nombre, padre);
            return;  
        }
        limpiarAlerta(padre);
    }
    function mostraralerta(nombre,padre){
        limpiarAlerta(padre);
        const error = document.createElement('P');
        error.textContent = `El espacio ${nombre} esta vacio`;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        padre.appendChild(error);
    }
    function limpiarAlerta(padre){
        //COMPROBAR SI HAY UNA ALERTA
        const alerta = padre.querySelector('.bg-red-600');
        if(alerta){
            // eliminamos el elemento que contiene bg-red-600
            alerta.remove();
        }
    }
}); 