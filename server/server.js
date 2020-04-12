const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { Player, Food } = require("./utils/player");


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
      game.players[socket.id] = new Player(socket.id, 20, data.name)
    })

    
    /* Ajout de la nourriture */
    if(game.foods.length === 0) {
      for (i = 0; i <= 600; i++) {
        let food = new Food(getRandomColor())
        game.foods.push(food)
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
            if(food.x >= player.x - (player.r * 1) && food.x <= player.x + (player.r * 1) && food.y >= player.y - (player.r * 1) && food.y <= player.y + (player.r * 1)) {
              game.players[socket.id].r += food.r / 50
              game.players[socket.id].score ++
              game.foods.splice(index, 1)
              let newFood = new Food(getRandomColor())
              game.foods.push(newFood)
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

const getRandomColor = () => {
    const colors = ['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#27AE60', '#2ECC71', '#F1C40F', '#F39C12', '#D35400']
    let random = Math.round(Math.random() * (colors.length - 0) + 0);
    return colors[random];
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});