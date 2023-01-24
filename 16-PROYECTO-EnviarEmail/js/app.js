document.addEventListener('DOMContentLoaded', function(){
    //SELECCIONAR ELEMENTOS DE LA INTERFAZ
    const emailcompleto = {
        email : '',
        cc : 'default',
        asunto: '',
        mensaje: ''
    };
    const email = document.querySelector('#email');
    const cc = document.querySelector('#cc');
    const asunto = document.querySelector('#asunto');
    const mensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");
    //ASIGNAR EVENTOS BLUR SALIENDO DEL CAMPO, INPUT TIEMPO REAL
    email.addEventListener('blur', ValidarCampo);
    cc.addEventListener('input', ValidarCampo);
    asunto.addEventListener('blur', ValidarCampo); 
    mensaje.addEventListener('blur', ValidarCampo);    
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', e => {
        e.preventDefault();
        resetFormulario();

    });

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");
        setTimeout(()=>{
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");
            resetFormulario();
            //CREAR UNA ALERTA EXITO
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center' , 'rounded-lg' , 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = "Envio existoso";
            formulario.appendChild(alertaExito);
            
        }, 3000);
        
        setTimeout(()=>{
            const alertaexito = document.querySelector(".bg-green-500");
            console.log(alertaexito);
            alertaexito.remove();
        },4000);
        
    }
    function ValidarCampo(e){
        //nextElementSibling = recorrer el dom al hermano.
        const padre = e.target.parentElement;
        // trim = desaparece los espacios
        if ( e.target.value.trim() === "" && e.target.id !== "cc"){
            emailcompleto[e.target.id] = "";
            VerificarEmaillleno();
            const nombre = e.target.id;            
            mostraralerta(`El espacio ${nombre} esta vacio`, padre);
            return;  
        }
        if((e.target.id === "email" || e.target.id === "cc") && !ComprobarEmail(e.target.value)){
            emailcompleto[e.target.id] = "";
            VerificarEmaillleno();
            mostraralerta('El email es incorrecto', padre);
            return;
        }
        limpiarAlerta(padre);
        //ASIGNAR VALORES
        emailcompleto[e.target.id] = e.target.value.trim().toLowerCase();
        VerificarEmaillleno();
    }
    function mostraralerta(mensaje,padre){
        limpiarAlerta(padre);
        const error = document.createElement('P');
        error.textContent = mensaje;
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
    function ComprobarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
    }
    function VerificarEmaillleno(){
        //CREA UN ARREGLO CON LOS VALORES DEL OBJETO
        // INCLUDE '' VERIFICA SI ALGUN ESPACIO ESTA VACIO ENVIA TRUE
        // CUANDO APAREZCA FALSE SIGNIFICA QUE TODOS LOS ESPACIO ESTAN LLENADOS COMPLETAMENTE Y CORRECTAMENTE
        if(Object.values(emailcompleto).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
    function resetFormulario (){
        emailcompleto.email = '';
        emailcompleto.asunto = '';
        emailcompleto.mensaje = '';
        formulario.reset();
        VerificarEmaillleno();
    }
}); 