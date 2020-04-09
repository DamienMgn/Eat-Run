const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { Player } = require("./utils/player");


app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

const game = {
  players: {}
}

io.on('connection', function(socket){
    console.log('a user connected' + socket.id);

    game.players[socket.id] = new Player(socket.id, 20, 20)
    console.log(game.players)

    setInterval(() => {
      io.emit('send players', game.players)
    }, 1000/60)
    
    socket.on('mouseMove', (mousePos) => {
      if (game.players[socket.id] !== undefined) {
        let playerX = game.players[socket.id].x;
        let playerY = game.players[socket.id].y;
        let distanceX =  mousePos.x - playerX;
        let distanceY =  mousePos.y - playerY;
          game.players[socket.id].x += distanceX / 100
          game.players[socket.id].y += distanceY / 100
      }
    })

    socket.on('disconnect', () => {
        delete game.players[socket.id]
      });
  });

const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});