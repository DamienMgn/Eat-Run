const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected' + socket.id);
    io.emit('create player', 'blablabla')
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});