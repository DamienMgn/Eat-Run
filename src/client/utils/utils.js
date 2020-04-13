/* Dessiner le joueur */
const drawPlayer = (player) => {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.font = "15px Arial";
    ctx.fillText(player.name, player.x, player.y);
}

/* Dessiner la map */
const drawCanvas = () => {
    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#171C23';
    ctx.fillRect(0, 0, w, h);
}

/* Dessiner la nourriture */
const drawFood = (food) => {
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = food.color;
    ctx.fill();
}

/* Ajouter les scores */
const addScore = (player) => {
    const x = document.createElement("LI")
    let t = document.createTextNode(player.name + ' : ' + player.score)
    x.style.color = player.color
    x.appendChild(t)
    scoreBox.appendChild(x)
}