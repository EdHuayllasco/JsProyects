(function(){
    let DB; 
    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded',() =>{
        //conectar DB
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    })
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
    function validarCliente(e){
        e.preventDefault();
        //leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
        if(nombre === "" || email ==="" || telefono === "" || empresa ===""){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }
        //Crear un objeto con la informacion. 
        const cliente =  {
            nombre, 
            email,
            telefono,
            empresa,
            
        }
        cliente.id = Date.now();
        crearNuevoCliente(cliente);
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
    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);
        transaction.oncomplete = ()=>{
            imprimirAlerta('Cliente agregado correctamente');
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
        transaction.onerror = () => {
            imprimirAlerta('Hubo un error', 'error');
        }
        formulario.reset();
    }
})();