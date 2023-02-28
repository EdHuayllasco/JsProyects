function conectarDB(){
    const abrirConexion = window.indexedDB.open('crm',1);
    abrirConexion.onerror = ()=>{
        console.log('hubo un error');
    }
    abrirConexion.onsuccess = () =>{
        console.log('Conexion exitosa');
        DB = abrirConexion.result;
    }
}
function imprimirAlerta (mensaje, alerta){
    const div = document.createElement('div');
    const alertaDiv = document.querySelector('.alerta');
    if(!alertaDiv){
        div.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mt-6', 'text-center','border','alerta');
        if(alerta === 'error'){
            div.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }else {
            div.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }
        div.textContent = mensaje;
        formulario.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    
}