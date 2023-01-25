//VARIABLES 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EVENT LISTENERS
eventlistener();
function eventlistener(){
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        //BUSCA TWEETS EN LOCAL STORAGE SINO HAY NADA SALDRIA NULL Y NO FUNCIONARIA EL LENGT, EL SPREAD OPERATOR 
        // PARA EVITAR ESO DECIMOS O ASIGNA UNA LISTA VACIA
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

//FUNCIONES
function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    //QUITAR ESPACIOS
    if(tweet === ''){
        mostrarerror('el mensaje no puede ir vacio');
        return; //evite que se ejecuten mas lineas de codigo
    }
    //OBJETO
    const tweetObj = {
        id: Date.now(),
        // tweet: tweet
        // cuando ambos se llaman igual simplemente deja uno
        tweet
    };
    //ANADIR AL ARREGLO
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    crearHTML();
    
    //REINICIAR FORMULARIO
    formulario.reset();
}

function mostrarerror(error){
    // Swal.fire({
    //     icon: 'error',
    //     title: 'Oops',
    //     text: 'String vacio'
    // });
    const contenido = document.querySelector('#contenido');
    const mensajerror = document.createElement('P');
    mensajerror.textContent = error;
    mensajerror.classList.add('error');
    contenido.appendChild(mensajerror);
    setTimeout(()=>{
        //ELIMINA LA ALERTA DESPUES DE TRES SEGUNDOS
        mensajerror.remove();
    },3000);

}
function crearHTML(){
    LimpiarHTML();
    //PONER EL PRIMER TWEET AL ULTIMO Y EL TWEET MAS RECIEN AL COMIENZO
    const tweetordenados = tweets.sort((a,b) => b.id - a.id);
    
    if(tweetordenados.length > 0){
        tweetordenados.forEach(tweet => {
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = "X";
            //ANADIR FUNCION ELIMINAR 
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            //asigna el boton
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }
    //SINCRONIZAR STORAGE
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}
// eliminar tweet
function borrarTweet(id){
    // traemos todos los demas excepto el indicado en id
    // sino usamos corchetes tenemos que usar si o si return
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}
function LimpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}