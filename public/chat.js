// Make connection
var socket = io.connect('https://t4d.onrender.com');

// Query DOM
var mensaje = document.getElementById('mensaje'),
      usuario = document.getElementById('usuario'),
      btn = document.getElementById('enviar'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        mensaje: mensaje.value,
        usuario: usuario.value
    });
    mensaje.value = "";
});

mensaje.addEventListener('keypress', function(){
    socket.emit('typing', usuario.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.usuario + ': </strong>' + data.mensaje + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a mensaje...</em></p>';
});
