/* Dessiner le joueur */
const drawPlayer = (player) => {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#C0392B";
    ctx.stroke();
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