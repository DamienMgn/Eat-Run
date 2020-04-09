const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const drawCanvas = () => {
    ctx.clearRect(0, 0, 600, 600);
    ctx.fillStyle = '#283747';
    ctx.fillRect(0, 0, 600, 600);
} 

socket.on('send players', function(players) {
    drawCanvas()
    for (let player in players) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(players[player].x, players[player].y, players[player].width, players[player].height);
    }
})

const draw = () => {

}

document.onmousemove = (event) => {
    let mousePos = {x: event.clientX, y: event.clientY}
    console.log(mousePos)
    socket.emit('mouseMove', mousePos)
}


