const app = {

    socket: io(),
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    init: function() {

        this.ctx.fillStyle = '#283747';
        this.ctx.fillRect(0, 0, 600, 600);

        this.drawPlayers()
        this.updatePlayers()
    },
    updatePlayers: function() {
        this.socket.on('update players', function(players) {
            console.log(players)
        })
    },
    drawPlayers: function() {
        this.socket.on('draw players', function(players) {
            players.forEach(el => {
                let canvas =  document.getElementById('canvas')
                let ctx = canvas.getContext('2d')

                ctx.fillStyle = 'red';
                ctx.fillRect(el.x, el.y, el.width, el.width);

            })
        })
    },
}

app.init()


