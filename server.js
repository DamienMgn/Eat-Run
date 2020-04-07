const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


let players = []

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

io.on('connection', function(socket){
    console.log(getRandomNumber(0, 600))
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});