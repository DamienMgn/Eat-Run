const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { Player } = require("./utils/player");


app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

let players = []

io.on('connection', function(socket){
    console.log('a user connected' + socket.id);

    let player = new Player(socket.id, getRandom(600, 0), getRandom(600, 0), 20);

    players.push(player)

    io.emit('send players', players)

    socket.on('disconnect', () => {
        players = players.filter(el => el.id !== socket.id)
        console.log('user disconnected' + socket.id);
        console.log(players)
        io.emit('send players', players)
      });
  });

const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});