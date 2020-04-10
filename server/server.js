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
  players: {},
  foods: []
}

io.on('connection', function(socket){
    console.log('a user connected' + socket.id);

    /* Nouveau joueur */
      game.players[socket.id] = new Player(socket.id, 20, 0, 0)
      console.log(game.players)
    
    
    /* Ajout de la nourriture */
    if(game.foods.length === 0) {
      for (i = 0; i <= 100; i++) {
        let food = [getRandom(0, 600), getRandom(0, 600), 10]
        game.foods.push(food)
      }
    }


    /* Envoi des données au client */
      let interval = setInterval(() => {
        io.emit('sendPlayers', game)
        if (game.players[socket.id] != undefined) {
          game.players[socket.id].followMouse()
        }
      }, 1000/60)


    /* Mise à jour position souris */
      socket.on('mouseClick', (mousePos) => {
        game.players[socket.id].mouseX = mousePos.x
        game.players[socket.id].mouseY = mousePos.y
      })

    
    /* Déconnexion du joueur */
      socket.on('disconnect', () => {
        delete game.players[socket.id]
        clearInterval(interval)
      });

  });


  const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }

http.listen(3000, function(){
  console.log('listening on *:3000');
});