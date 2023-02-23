//USER INTERFACE
import { editarCita, eliminarCita } from "../funciones.js";
import { contenedorCitasInput } from "../selectores.js";
class UI{
    mensajeAlerta(mensaje, tipo){
        const div = document.createElement('DIV');
        div.classList.add('text-center', 'alert', 'd-block', 'col-12');
        if(tipo ==='error'){
            div.classList.add('alert-danger');
        }else{
            div.classList.add('alert-success');
        }
        div.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(div, document.querySelector('.agregar-cita'));
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    //DESTRUCTURING DESDE LA LLAMAda
    mostrarCitas({citas}){
        this.limpiarHTML();
        citas.forEach( cita =>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const citaHtml = document.createElement('DIV');
            citaHtml.classList.add('cita', 'p-3');
            citaHtml.dataset.id = id;
            //SCRIPINTING  DE LOS ELEMENTOS DE LA CITA
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;
            
            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder"> Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder"> Propietario: </span> ${sintomas}
            `; 
            // BOTON ELIMINAR
            const BtnEliminar = document.createElement('button');
            BtnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            BtnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>';
            BtnEliminar.onclick = () =>{
                eliminarCita(id);
            }
            //BOTON DE EDITAR
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info' );
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>';
            btnEditar.onclick = ()=>{
                editarCita(cita);
            }
            //AGREGAR AL DIV
            citaHtml.appendChild(mascotaParrafo);
            citaHtml.appendChild(propietarioParrafo);
            citaHtml.appendChild(telefonoParrafo);
            citaHtml.appendChild(fechaParrafo);
            citaHtml.appendChild(horaParrafo);
            citaHtml.appendChild(sintomasParrafo);
            citaHtml.appendChild(BtnEliminar);
            citaHtml.appendChild(btnEditar);
            //AGREGAR CITAS AL HTML
            contenedorCitasInput.appendChild(citaHtml);
        })
    }
    limpiarHTML(){
        while(contenedorCitasInput.firstChild){
            contenedorCitasInput.removeChild(contenedorCitasInput.firstChild);
        }
    }
}
export default UI;