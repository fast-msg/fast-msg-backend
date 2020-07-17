$(document).ready(function () {
    console.log("iniciando...")
    var socket = io.connect();

    $('#send-message').submit(function (e) { 
        e.preventDefault();
        var nombre = $("#nombre").val()
        var mensaje = $('#mensaje')
        socket.emit('chat message', {nombre,mensaje:mensaje.val()});
        mensaje.val('');
      return false;    
    });

    socket.on('chat message', function(msg){
        $('#container-messages')
        .append('<p><span>'+msg.nombre+':</span>'+msg.mensaje+'<p>');
      });

    socket.on('new-user',(object)=>{
        console.log('Nuevo usuario conectado');
    })

});