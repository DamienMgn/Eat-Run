const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = 3000;
const h = 3000;
const formStart = document.querySelector('#form-start')

/* Draw Map */
const drawCanvas = () => {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#17202A';
    ctx.fillRect(0, 0, w, h);
}

const dist = {x: 0, y: 0}

/* Start Game */
formStart.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = {
        name: e.target.name.value,
        w: w,
        h: h,
    }
    socket.emit('startGame', data)
    formStart.style.display = 'none'
})

/* Draw Game  */
socket.on('sendPlayers', function(data) {
    let players = data.game.players
    let foods = data.game.foods
    let activePlayer = players[data.playerId]

    if (activePlayer !== undefined) {
        drawCanvas()
        ctx.translate(-activePlayer.x + window.innerWidth / 2, -activePlayer.y + window.innerHeight / 2)
    } else {
        drawCanvas()
    }

    /* Draw Player  */    
    for (let player in players) {
        let posX = players[player].x
        let posY = players[player].y

        ctx.beginPath();
        ctx.arc(posX, posY, players[player].r, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#3498DB';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#F1C40F";
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "15px Arial";
        ctx.fillText(players[player].name, posX, posY);
    }

    /* Draw quadrillage  */
    let size = 150;

    for (i = 0; i < 20; i++) {
        for (j = 0; j < 20; j++) {
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 0.3;
            ctx.strokeRect(size * i, size * j, size, size)
        }
    }

    /* Draw foods */
    foods.map(food => {
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = food.color;
        ctx.fill();
    })

})

/* Move player onclick */
canvas.onclick = (event) => {
    let mousePos = {x: event.offsetX, y: event.offsetY}

    dist.x += mousePos.x - (window.innerWidth / 2)
    dist.y += mousePos.y - (window.innerHeight / 2)
        
    socket.emit('mouseClick', dist)
}




