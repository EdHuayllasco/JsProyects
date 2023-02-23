import UI from './clases/UI.js';
import Citas from './clases/Citas.js';
import  {
    fechaInput, 
    formularioInput, 
    horaInput, 
    mascotaInput, 
    propietarioInput, 
    sintomasInput, 
    telefonoInput
        } from  './selectores.js'
//INSTANCIARLAAS
const ui = new UI();
const cita = new Citas();

let edicion= false;
//OBJETO
const citaObj = {
    mascota : '',
    propietario: '',
    telefono: '',
    fecha:'',
    hora:'',
    sintomas:''
};
//FUNCIONES
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}
//VALIDA Y AGREGA UNA NUEVA CITA A LA CLASE CITA
export function Nuevacita(e){
    e.preventDefault();
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    //VALIDAR CITA
    if(mascota.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha ==='' || hora ==='' || sintomas ==='' ){
        ui.mensajeAlerta('Todos los datos son necesarios', 'error');
        return;
    }
    if(isNaN(parseInt(telefonoInput.value))){
        ui.mensajeAlerta('Ingrese un numero correcto, por favor', 'error');
        return;
    }
    if(edicion){
        ui.mensajeAlerta('Editado correctamente');
        //PASAR EL OBJETO DE LA CITA A EDICION
        cita.editarcita({...citaObj});
        formularioInput.querySelector('button[type="submit"]').textContent = 'CREAR CITA';
        //QUITAR MODO EDICION
        edicion = false;
    }else{
        // generar un id unico
        citaObj.id = Date.now();
        //ENVIAMOS UNA COPIA DE OBJETO PARA QUE NO SE REPITAN LAS CITAS
        cita.agregarCita({...citaObj});
        //MENSAJE DE AGREGADO CORRECTAMENTE
        ui.mensajeAlerta('Se agrego correctamente');
    }
    
    //REINICIAR OBJETO PARA VALIDACION
    reiniciarObj();
    //REINICIAR FORMULARIO
    formularioInput.reset();
    //IMPRIMIR CITAS
    ui.mostrarCitas(cita);
}
function reiniciarObj (){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}
export function eliminarCita(id){
    cita.eliminarcotaClase(id);
    ui.mensajeAlerta('La cita se elimino correctamente');
    ui.mostrarCitas(cita);
}
export function editarCita(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    //RELLENAR EL OBJETO
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    //CAMBIAR EL TEXTO DEL BOTON
    formularioInput.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    edicion = true;
}