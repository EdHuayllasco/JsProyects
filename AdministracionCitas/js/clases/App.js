import { datosCita, Nuevacita } from "../funciones.js";
import  {
    fechaInput, 
    formularioInput, 
    horaInput, 
    mascotaInput, 
    propietarioInput, 
    sintomasInput, 
    telefonoInput
        } from  '../selectores.js'
class App{
    constructor(){
        this.iniApp();
    }
    iniApp(){
        //LISTENERS
        eventListeners();
        function eventListeners(){
            mascotaInput.addEventListener('change', datosCita);
            propietarioInput.addEventListener('change', datosCita);
            telefonoInput.addEventListener('change', datosCita);
            fechaInput.addEventListener('change', datosCita);
            horaInput.addEventListener('change', datosCita);
            sintomasInput.addEventListener('change', datosCita);
            formularioInput.addEventListener('submit', Nuevacita);    
        }
    }
}
export default App;