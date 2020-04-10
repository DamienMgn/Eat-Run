const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;

const drawCanvas = () => {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#283747';
    ctx.fillRect(0, 0, w, h);
} 

socket.on('sendPlayers', function(game) {
    let players = game.players
    let foods = game.foods
    drawCanvas()
    for (let player in players) {
        ctx.beginPath();
        ctx.arc(players[player].x, players[player].y, players[player].r, 0, 2 * Math.PI, false);
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
    let mousePos = {x: event.clientX, y: event.clientY}
    socket.emit('mouseClick', mousePos)
}


