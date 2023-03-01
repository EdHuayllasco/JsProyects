(function(){
    let DB; 
    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded',() =>{
        //conectar DB
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    })
    
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