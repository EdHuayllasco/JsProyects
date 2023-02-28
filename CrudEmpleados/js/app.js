(function(){
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');
    // permite crear variables y funciones de manera local
    document.addEventListener('DOMContentLoaded', ()=>{
        crearDB();
        if(window.indexedDB.open('crm',1)){
            mostrarClientes();
        }
        listadoClientes.addEventListener('click',eliminarRegistro);
        
    })
    function eliminarRegistro(e){
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);
            const confirmar = confirm('Deseas eliminar este cliente?');
            if(confirmar){
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');
                objectStore.delete(idEliminar);
                transaction.oncomplete = () => {
                    console.log('Eliminado correctamente');
                    e.target.parentElement.parentElement.remove();
                }
                transaction.onerror = () => {
                    console.log('Hubo un error');
                }
            }
        }
    }
    // crearDB base de DAtos en IndexDB
    function crearDB(){
        const crearDB = window.indexedDB.open('crm',1);
        crearDB.onerror = () => {
            console.log('Hubo un error');
        }
        crearDB.onsuccess = function(){
            DB = crearDB.result;
        }
        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;
            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true
            });
            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});
            console.log('DB creada');
        }
    }
    function mostrarClientes(){
        const abrirConexion = window.indexedDB.open('crm',1);
        abrirConexion.onerror = () => { 
            console.log('No se pudo conectar');
        }
        abrirConexion.onsuccess = () => {
            console.log('Conexion establecida');
            DB = abrirConexion.result;
            const objectStore = DB.transaction('crm').objectStore('crm');
            
            objectStore.openCursor().onsuccess = e => {
                const cursor = e.target.result;
                if(cursor){
                    const {nombre, email, empresa, telefono, id} = cursor.value;
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>
                    `
                    listadoClientes.appendChild(tr);
                    cursor.continue();
                }
                else{
                    console.log('No hay mas registros');
                }
                
            }
        }
    }
})();