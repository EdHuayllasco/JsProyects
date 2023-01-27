//VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const Listagastos = document.querySelector('#gastos ul');
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }
    nuevogasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.resto();
        
    }
    resto(){
        const total = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - total; 
    }
    eliminargasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.resto();
    }
}
class UI{
    mostrarpresu(presu){
        const total = document.querySelector('#total');
        const resto = document.querySelector('#restante');
        const {presupuesto, restante} = presu
        total.textContent = presupuesto;
        resto.textContent = restante;
    }
    mostrarAlerta(mensaje, tipo){
        const div = document.createElement('DIV');
        div.className = 'text-center alert';
        if(tipo === "error"){
            div.classList.add('alert-danger');
        }else{
            div.classList.add('alert-success');
        }
        div.textContent = mensaje;
        document.querySelector(".primario").insertBefore(div, formulario);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    limpiarHTML(){
        while(Listagastos.firstChild){
            Listagastos.removeChild(Listagastos.firstChild);
        }
    }
    motrarlistagastos(gastos){
        this.limpiarHTML();
        gastos.forEach(gasto => {
            const nuevogasto = document.createElement('li');
            const {nombre, cantidad, id} = gasto;
            nuevogasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevogasto.dataset.id = id;
            
            nuevogasto.innerHTML = `
                ${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `
            // BOTON PARA BORRAR EL GASTO
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnEliminar.innerHTML = 'Borrar &times';
            btnEliminar.onclick = () =>{
                eliminarGasto(id);
            }
            nuevogasto.appendChild(btnEliminar);
            Listagastos.appendChild(nuevogasto);
        })
    }
    actualizarRestante(restante){
        const resto = document.querySelector('#restante');
        resto.textContent = restante;
    }
    comprobarPresupuesto(presu){
        const {presupuesto, restante } = presu; 
        const div = document.querySelector('.restante');
        if( restante <= presupuesto*0.25){
            div.classList.remove('alert-success', 'alert-warning');
            div.classList.add('alert-danger');
        } else if(restante <= presupuesto*0.5){
            div.classList.remove('alert-success', 'alert-danger');
            div.classList.add('alert-warning');
        }else{
            div.classList.remove('alert-danger', 'alert-warning');
            div.classList.add('alert-success');
            formulario.querySelector('button[type="submit"]').disabled = false;
        }
        if(restante <= 0){
            ui.mostrarAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }

}
//LISTENERS 
eventlisteners();
function eventlisteners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);

}
//INSTANCIAS
let presupuesto;
const ui = new UI();
// funciones

function preguntarPresupuesto(){
    (async () => {
        const { value: text } = await Swal.fire({
          input: 'text',
          inputLabel: 'Escriba el monto de su presupuesto',
          inputPlaceholder: 'presupuesto...',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        })
        
        if (text <= 0 || isNaN(text) || text ==='' || text === null) {
            window.location.reload();
        }
        else{
            Swal.fire(`Tu pruesupuesto es de ${text}`);
            presupuesto = new Presupuesto(Number(text));
            ui.mostrarpresu(presupuesto);
        }        
    })();
}
function agregarGasto(e){
    e.preventDefault();
    const nombre = e.target.querySelector('#gasto').value;
    const cantidad = Number(e.target.querySelector('#cantidad').value);
    if(cantidad === "" || nombre === ""){
        ui.mostrarAlerta('Debe llenar Gasto y Cantidad', 'error');
        return;
    } else if(cantidad <= 0 || isNaN(cantidad)){
        ui.mostrarAlerta('Cantidad no valida', 'error');
        return;
    }
    
    const gasto = {
        nombre: nombre,
        cantidad: cantidad,
        id : Date.now()
    }
    presupuesto.nuevogasto(gasto);    
    ui.mostrarAlerta('Ingreso los datos correctamente');
    const {gastos, restante} = presupuesto;
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
    ui.motrarlistagastos(gastos);
    formulario.reset();
}
function eliminarGasto(id){
    presupuesto.eliminargasto(id);
    const {restante, gastos} = presupuesto;
    ui.actualizarRestante(restante);
    ui.motrarlistagastos(gastos);
    ui.comprobarPresupuesto(presupuesto);
}