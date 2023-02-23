//CITAS
class Citas {
    constructor(){
        this.citas = []
    }
    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }
    eliminarcotaClase(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
    editarcita(citaobjeto){
        //BUSCAMOS QUE AMBOS ID SEAN IGUAL EN CASO SI REEMPLAZAMOS ESA CITA CON CITA OBJT, CASO CONTRARIO SIGUE SIENDO CITA
        this.citas = this.citas.map( cita => cita.id === citaobjeto.id ? citaobjeto : cita);

    }
}
export default Citas;