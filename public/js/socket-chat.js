var socket = io();

var params = new URLSearchParams( window.location.search );

if( !params.has('nombre')|| !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function(){
   console.log('Conectado al servidor'); 

   socket.emit('entrarChat', usuario, function( resp ){
        console.log('Usuarios conectados', resp);
   });
});

//escuchar (on)
socket.on('disconnect', function(){

    console.log('Perdimos conexion con el servidor');

});

//Enviar informacion (emit)
// socket.emit('crearMensaje', {
//     usuario: 'Ivan',
//     mensaje: 'Hola mundo'
// }, function(resp) {
//     console.log('respuesta server', resp);
// });
//Escuchar informacion
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor', mensaje);
});
//Esuchar cambios de usuarios
//cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje){

    console.log('Mensaje Privado:', mensaje);

}) 