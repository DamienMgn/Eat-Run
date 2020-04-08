const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const drawCanvas = () => {
    ctx.fillStyle = '#283747';
    ctx.fillRect(0, 0, 600, 600);
} 

socket.on('send players', function(players) {
    console.log(players)
    ctx.clearRect(0, 0, 600, 600);
    drawCanvas()
    players.forEach(el => {

        ctx.fillStyle = 'red';
        ctx.fillRect(el.x, el.y, el.width, el.width);

    })
})



