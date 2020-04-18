const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = window.innerWidth
const h = window.innerHeight
const formStart = document.querySelector('#form-start')
const scoreBox = document.querySelector('.score-box-ul')
const formContainer = document.querySelector('.form-container')

let direction = 90
let movePlayer = {right: false, left: false, up: false, down: false}

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
            console.log(bullet)
            drawBullet(bullet)
        })
        drawPlayer(player)
    }

    /* Draw foods */
    foods.map(food => {
        drawFood(food)
    })
})

/* Update mouse direction */
canvas.onmousemove = (event) => {
    direction = Math.atan2(event.offsetX - (window.innerWidth / 2), event.offsetY - (window.innerHeight / 2))
}

/* Update player direction */
document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
        movePlayer.right = true
    }
    if (e.code === "ArrowLeft") {
        movePlayer.left = true
    }
    if (e.code === "ArrowUp") {
        movePlayer.up = true
    }
    if (e.code === "ArrowDown") {
        movePlayer.down = true
    }
})

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowRight") {
        movePlayer.right = false
    }
    if (e.code === "ArrowLeft") {
        movePlayer.left = false
    }
    if (e.code === "ArrowUp") {
        movePlayer.up = false
    }
    if (e.code === "ArrowDown") {
        movePlayer.down = false
    }
})

setInterval(() => {
    socket.emit('movePlayer', movePlayer)
}, 1000/60)

/* Player shoot */
canvas.onclick = () => {
    socket.emit('shoot', direction)
}


