$(document).ready(function () {
    console.log("iniciando...")
    var socket = io.connect({ query: "foo=bar" });

    $('#registrar').click(function (e) { 
      e.preventDefault();
      console.log('registrando...');
        socket.emit('register',$("#nombre").val());
    });

    $('#send-message').submit(function (e) { 
        e.preventDefault();
        var from = $("#nombre").val()
        var to = $("#to").val()
        var mensaje = $('#mensaje')
        socket.emit('chat message',{from,to,mensaje:mensaje.val()});
        mensaje.val('');
      return false;    
    });

    socket.on('chat message', function(msg){
        $('#container-messages')
        .append('<p><span>'+msg.from+':</span>'+msg.mensaje+'<p>');
      });

    socket.on('new-user',(object)=>{
        console.log('Nuevo usuario conectado');
    })

});