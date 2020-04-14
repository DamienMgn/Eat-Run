const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = window.innerWidth
const h = window.innerHeight
const formStart = document.querySelector('#form-start')
const scoreBox = document.querySelector('.score-box-ul')
const formContainer = document.querySelector('.form-container')

let direction = 90

/* Start Game */
formStart.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = {
        name: e.target.name.value,
        color: e.target.color.value,
        w: w,
        h: h,
    }

    if (e.target.name.value.length > 0) {
        socket.emit('startGame', data)
    } else {
        document.querySelector('.input').classList.add('danger')
    }
})

/* Draw Game  */
socket.on('sendGame', function(data) {
    let players = data.game.players
    let foods = data.game.foods
    let activePlayer = players[data.playerId]

    scoreBox.innerHTML = ""

    if (activePlayer !== undefined && activePlayer.life > 0) {
        drawCanvas()
        ctx.translate(-activePlayer.x + window.innerWidth / 2, -activePlayer.y + window.innerHeight / 2)
        formContainer.style.display = 'none'
    } else {
        formContainer.style.display = 'flex'
    }

    /* Draw Player  */    
    for (let currentPlayer in players) {
        let player = players[currentPlayer]
        addScore(player)
        player.bullets.map(bullet => {
            drawBullet(bullet)
        })
        drawPlayer(player)
    }

    /* Draw foods */
    foods.map(food => {
        drawFood(food)
    })
})

/* Update direction */
canvas.onmousemove = (event) => {
    direction = Math.atan2(event.offsetX - (window.innerWidth / 2), event.offsetY - (window.innerHeight / 2))
}

setInterval(() => {
    socket.emit('updateDirection', direction)
}, 1000/60)

/* Shoot */
document.addEventListener('keypress', (e) => {
    if (e.code === "Space") {
        socket.emit('shoot', direction)
    }
})




