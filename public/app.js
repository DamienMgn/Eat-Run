const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = 3000;
let h = 3000;

const drawCanvas = () => {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#283747';
    ctx.fillRect(0, 0, w, h);
}

const dist = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
}

let formStart = document.querySelector('#form-start')

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

socket.on('sendPlayers', function(data) {
    let players = data.game.players
    let foods = data.game.foods
    let activePlayer = players[data.playerId]

    if (activePlayer !== undefined) {
        drawCanvas()
        ctx.translate(-activePlayer.x + window.innerWidth / 2, -activePlayer.y + window.innerHeight / 2)
        console.log(activePlayer)
    }   

    for (let player in players) {
        let posX = players[player].x
        let posY = players[player].y

        ctx.beginPath();
        ctx.arc(posX, posY, players[player].r, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#2ECC71';
        ctx.fill();
    }

    foods.map(food => {
        ctx.beginPath();
        ctx.arc(food[0], food[1], food[2], 0, 2 * Math.PI, false);
        ctx.fillStyle = '#2ECC71';
        ctx.fill();
    })

})

canvas.onclick = (event) => {
    let mousePos = {x: event.offsetX, y: event.offsetY}

    if (mousePos.x >= (window.innerWidth / 2)) {
        dist.x += mousePos.x
    }
      
    if (mousePos.x <= (window.innerWidth / 2)) {
        dist.x -= mousePos.x
    }

    if (mousePos.y >= (window.innerHeight / 2)) {
        dist.y += mousePos.y
    }

    if (mousePos.x <= (window.innerHeight / 2)) {
        dist.y -= mousePos.y
    }

    console.log(mousePos.x + ' ' + window.innerWidth)
        
    socket.emit('mouseClick', dist)
    console.log("Coordinate x: " + dist.x,  
                "Coordinate y: " + dist.y); 
}


