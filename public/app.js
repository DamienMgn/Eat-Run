const socket = io();

socket.on('create player', function(msg) {
    console.log(msg)
})