class Player {
    constructor(id, r, color ,name) {
        this.id = id;
        this.x = Math.round(Math.random() * (3000 - 0) + 0);
        this.y = Math.round(Math.random() * (3000 - 0) + 0);
        this.r = r;
        this.color = color;
        this.mouseX = this.x;
        this.mouseY = this.y;
        this.name = name;
        this.score = 0;
    }

    followMouse = () => {

        let distanceX =  this.mouseX - this.x;
        let distanceY =  this.mouseY - this.y;
      
        this.x += distanceX / (this.r * 5)
        this.y += distanceY / (this.r * 5)

    }
}

class Food {
    constructor(color) {
        this.x = Math.round(Math.random() * (3000 - 0) + 0);
        this.y = Math.round(Math.random() * (3000 - 0) + 0);
        this.r = Math.round(Math.random() * (10 - 4) + 4);
        this.color = color
    }
}
module.exports = {Player, Food};
