(function(){
    let DB;
    let idCliente;
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();
        //Verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(() => {
                ObtenerCliente(idCliente);
            }, 100);
        }
        formulario.addEventListener('submit', validarCliente);
    });
    function ObtenerCliente(idCliente){
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        transaction.onerror = () => {
            console.log('Hubo un error');
        }
        const cliente = objectStore.openCursor();

        cliente.onsuccess = e => {
            cursor = e.target.result;
            if(cursor){
                if(cursor.value.id === Number(idCliente)){
                    llenarFormulario(cursor.value);
                    
                    console.log();
                }
                cursor.continue();
            }
        }
        
    }
    function llenarFormulario(cursor){
        const {nombre, email, telefono, empresa} = cursor;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm',1);
        abrirConexion.onerror = () => {
            console.log('Hubo un error al conectar con la BD');
        }
        abrirConexion.onsuccess = function () {
            console.log('Conexion Realizada');
            DB = abrirConexion.result;
        }
    }
    function validarCliente(e){
        e.preventDefault();
        if(nombreInput.value === "" || emailInput.value ==="" || telefonoInput.value === "" || empresaInput.value ===""){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }
        //Crear un objeto con la informacion. 
        const clienteactualizado =  {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono : telefonoInput.value,
            empresa : empresaInput.value,
            id : Number(idCliente)
        }
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clienteactualizado);
        transaction.oncomplete = () => {
            imprimirAlerta('Actualizacion exitosa');
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
        transaction.onerror = () => {
            imprimirAlerta('hubo un error', 'error');
        }
    }
})();