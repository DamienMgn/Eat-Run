const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

const { Player, Food, Bullet } = require("./utils/game");


app.use(express.static('src/client'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

let game = {
  players: {},
  foods: []
}

io.on('connection', function(socket){
    console.log('a user connected' + socket.id);

    /* Nouveau joueur */
    socket.on('startGame', (data) => {
      game.players[socket.id] = new Player(socket.id, 30, data.color, data.name)
    })

    /* Ajout de la nourriture */
    if(game.foods.length === 0) {
      for (i = 0; i <= 200; i++) {
        let food = new Food(getRandomColor())
        game.foods.push(food)
      }
    }

    /* Envoi des données au client */
      let interval = setInterval(() => {
        socket.emit('sendGame', {game: game, playerId: socket.id})
        let player = game.players[socket.id]
        if (player != undefined) {
          player.bullets.forEach((bullet, index) => {
            bullet.updatePosition()
            if (bullet.updatePosition()) {
              game.players[socket.id].bullets.splice(index, 1)
            }
          })

          /* Collision Food vs Player */
          game.foods.forEach((food, index) => {
            if(food.x >= player.x - (player.r * 1) && food.x <= player.x + (player.r * 1) && food.y >= player.y - (player.r * 1) && food.y <= player.y + (player.r * 1)) {
              game.players[socket.id].score ++
              game.foods.splice(index, 1)
              let newFood = new Food(getRandomColor())
              game.foods.push(newFood)
            }
          });

          /* Collision Bullet vs Player */
          game.players[socket.id].bullets.map((bullet, index) => {
              for(uPlayer in game.players) {
                if(uPlayer !== socket.id) {
                  let player = game.players[uPlayer]
                  if(bullet.x >= player.x - (player.r * 1) && bullet.x <= player.x + (player.r * 1) && bullet.y >= player.y - (player.r * 1) && bullet.y <= player.y + (player.r * 1)) {
                    game.players[socket.id].bullets.splice(index, 1)
                    player.life --
                    console.log(player)
                    if (player.life <= 0) {
                      console.log('is dead')
                      delete game.players[uPlayer]
                    }
                  }
                }
              }
          })
        }
      }, 1000/60)

    /* Mise à jour position souris */
      socket.on('movePlayer', (newPos) => {
        if(game.players[socket.id] != undefined) {
          game.players[socket.id].updatePosition(newPos)
        }
      })

      /* Le joueur shoot */
      socket.on('shoot', (angle) => {
        if(game.players[socket.id] != undefined) {
          let bullet = new Bullet(game.players[socket.id].x, game.players[socket.id].y, angle)
          game.players[socket.id].addBullet(bullet)
        }
      })
    
    /* Déconnexion du joueur */
      socket.on('disconnect', () => {
        delete game.players[socket.id]
        clearInterval(interval)
      });

  });

const getRandomColor = () => {
  const colors = ['#F5B7B1', '#AED6F1', '#F9E79F', '#ABEBC6', '#D2B4DE']
  let random = Math.round(Math.random() * (colors.length - 0) + 0);
  return colors[random];
}

http.listen(PORT, () => console.log(`Listening on ${ PORT }`))