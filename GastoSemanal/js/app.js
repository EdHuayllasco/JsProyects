//VARIABLES Y SELECTORES 
const formulario = document.querySelector('#agregar-gasto');
const gastolistado = document.querySelector('#gastos ul');
// EVENTOS
Eventlisteners();
function Eventlisteners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', validarGasto);
}
//CLASES
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevogasto (gasto){
        this.gastos = [...this.gastos, gasto];
        this.resto();
    }
    resto(){
        // reduce toma dos parametros, el almacenador que es total y lo que se va a utilizar del arreglo
        // total empieza en cero y se le va a agregando la cantidad de cada gasto
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto-gastado;
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
        this.resto();
    }
}
class UI{
    insertarpresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    imprimirAlerta(mensaje, tipo){
        const alerta = document.createElement("DIV");
        alerta.classList.add('text-center', 'alert');
        if(tipo === "error"){
            alerta.classList.add('alert-danger');
        }else {
            alerta.classList.add('alert-success');
        }
        alerta.textContent = mensaje;
        document.querySelector('.primario').insertBefore(alerta, formulario);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    limpiarHTML(){
        while(gastolistado.firstChild){
            gastolistado.removeChild(gastolistado.firstChild);
        }
    }
    AgregarGastoListado(gastos){
        this.limpiarHTML();
        gastos.forEach(gasto => {
            const {nombre, cantidad, id} = gasto;
            //CREAR UN LI
            const nuevogasto = document.createElement('li');
            nuevogasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            // AGREGA ATRIBUTO ambos codigos hacen lo mismo
            // nuevogasto.setAttribute('data-id', id);
            nuevogasto.dataset.id = id;
            console.log(nuevogasto);
            // AGREGAR EL HTML AL GASTO
            nuevogasto.innerHTML = `
                ${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `;
            // BOTON PARA BORRAR EL GASTO
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            //PONEMOS EN ARROW PARA UNICAMENTE HACER LA FUNCION CUANDO SE LLAME EL EVENTO ONCLICK
            btnBorrar.onclick = () =>{
                eliminarGasto(id);
            }
            nuevogasto.appendChild(btnBorrar);
            //AGREGAR AL HTML
            gastolistado.appendChild(nuevogasto);
        });
        
        
    }
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }
    comprobarPresupuesto(nodo){
        const {presupuesto, restante} = nodo;
        const restanteDiv = document.querySelector('.restante');
        // comprobar 25%
        if( restante <= presupuesto*0.25){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if(restante <= presupuesto*0.5){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }
        //SI EL TOTAL ES CERO O MENOR
        if(restante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
    
}
//INSTANCIAS 
const ui = new UI();
let presupuesto;
//FUNCIONES

function preguntarPresupuesto(){
    const presupuestoUsuario= prompt('Cual es tu presupuesto?');
    console.log(presupuestoUsuario);
    // IS NAN DETERMINA SINO ES UN NUMERO
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || preguntarPresupuesto< 0){
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarpresupuesto(presupuesto);
}
function validarGasto(e){
    e.preventDefault();
    const nombre = e.target.querySelector('#gasto').value;
    const cantidad = Number(e.target.querySelector('#cantidad').value);
    if(nombre === '' || cantidad ===''){
        ui.imprimirAlerta('Debe llenar ambos campos', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }
    const gasto = {nombre , cantidad, id: Date.now()};
    presupuesto.nuevogasto(gasto);
    ui.imprimirAlerta('Ingreso Correcto', 'success');
    //IMPRIMIR GASTOS
    const {gastos, restante} = presupuesto;
    ui.AgregarGastoListado(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
    //REINICIA FORMULARIO
    formulario.reset();
    
}
function eliminarGasto(id){
    presupuesto.eliminarGasto(id);
    const{gastos,restante} = presupuesto;
    ui.AgregarGastoListado(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}