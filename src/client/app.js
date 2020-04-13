const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const w = window.innerWidth
const h = window.innerHeight
const formStart = document.querySelector('#form-start')
const scoreBox = document.querySelector('.score-box-ul')


let dist = {x: 0, y: 0}

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
        formStart.style.display = 'none'
        document.querySelector('.form-container').style.display = 'none'
    } else {
        document.querySelector('.input').classList.add('danger')
    }
})

/* Draw Game  */
socket.on('sendPlayers', function(data) {
    let players = data.game.players
    let foods = data.game.foods
    let activePlayer = players[data.playerId]

    scoreBox.innerHTML = ""

    if (activePlayer !== undefined) {
        drawCanvas()
        ctx.translate(-activePlayer.x + window.innerWidth / 2, -activePlayer.y + window.innerHeight / 2)
    }

    /* Draw Player  */    
    for (let currentPlayer in players) {
        let player = players[currentPlayer]
        drawPlayer(player)
        addScore(player)
    }

    /* Draw foods */
    foods.map(food => {
        drawFood(food)
    })
})

/* Move player onclick */
canvas.onclick = (event) => {
    let mousePos = {x: event.offsetX, y: event.offsetY}

    dist.x += mousePos.x - (window.innerWidth / 2)
    dist.y += mousePos.y - (window.innerHeight / 2)
        
    socket.emit('mouseClick', dist)
}




