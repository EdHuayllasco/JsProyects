const cliente = new Map();
cliente.set('nombre','Edward');
cliente.set('tipo','premium');
cliente.set('saldo',300);
cliente.set(true, true);
console.log(cliente);
console.log(cliente.has('nombre'));
console.log(cliente.get('nombre'));
cliente.delete('saldo');
cliente.clear();


const paciente = new Map([['nombre','paciente'], ['cuarto','no definido']]);
paciente.set('Doctor', 'DR. asignado');
// podemos reasignar
paciente.set('nombre', 'DR. asignado');
console.log(paciente)
//son iterables
paciente.forEach((pacientes, index) =>{
    // imprimer los valores
    console.log(pacientes);
    // imprime las llaves
    console.log(index);
});
