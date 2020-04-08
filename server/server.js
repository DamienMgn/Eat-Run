const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { Player } = require("./utils/player");


app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

const players = []

io.on('connection', function(socket){
    console.log('a user connected' + socket.id);

    let player = new Player(socket.id, 50, 50, 20);

    console.log(player)

    socket.on('disconnect', function(){
        console.log('user disconnected' + socket.id);
      });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});