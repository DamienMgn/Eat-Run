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

      game.players[socket.id] = new Player(socket.id, 20, 100, 0, 0)
      console.log(game.players)

      let interval = setInterval(() => {
        io.emit('send players', game.players)
        followMouse(socket)

      }, 1000/60)

      socket.on('mouseMove', (mousePos) => {
        game.players[socket.id].mouseX = mousePos.x
        game.players[socket.id].mouseY = mousePos.y
      })

      socket.on('disconnect', () => {
        delete game.players[socket.id]
        clearInterval(interval)
      });

  });

const followMouse = (socket) => {

  let playerX = game.players[socket.id].x;
  let playerY = game.players[socket.id].y;
  let mouseX = game.players[socket.id].mouseX;
  let mouseY = game.players[socket.id].mouseY;
  let distanceX =  mouseX - playerX;
  let distanceY =  mouseY - playerY;

  game.players[socket.id].x += distanceX / game.players[socket.id].r
  game.players[socket.id].y += distanceY / game.players[socket.id].r

}

http.listen(3000, function(){
  console.log('listening on *:3000');
});