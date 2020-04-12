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
    socket.on('startGame', (data) => {
      game.players[socket.id] = new Player(socket.id, 20, 0, 0, data.name)
      console.log(game.players)
    })

    
    /* Ajout de la nourriture */
    if(game.foods.length === 0) {
      for (i = 0; i <= 600; i++) {
        newFood()
      }
    }

    /* Envoi des données au client */
      let interval = setInterval(() => {
        socket.emit('sendPlayers', {game: game, playerId: socket.id})
        let player = game.players[socket.id]
        if (player != undefined) {
          player.followMouse()

          /* Detection contact Food vs Player */
          game.foods.forEach((food, index) => {
            if(food[0] >= player.x - (player.r * 1) && food[0] <= player.x + (player.r * 1) && food[1] >= player.y - (player.r * 1) && food[1] <= player.y + (player.r * 1)) {
              game.players[socket.id].r += food[2] / 50
              food.splice(1, index)
            }
          });
        }
      }, 1000/60)


    /* Mise à jour position souris */
      socket.on('mouseClick', (mousePos) => {
        if(game.players[socket.id] != undefined) {
          game.players[socket.id].mouseX = mousePos.x
          game.players[socket.id].mouseY = mousePos.y
        }
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

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const newFood = () => {
    let food = [getRandom(0, 3000), getRandom(0, 3000), getRandom(4, 10), getRandomColor()]
    game.foods.push(food)
  }

http.listen(3000, function(){
  console.log('listening on *:3000');
});