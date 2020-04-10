class Player {
    constructor(id, r, mouseX, mouseY, name) {
        this.id = id;
        this.x = Math.round(Math.random() * (600 - 0) + 0);
        this.y = Math.round(Math.random() * (600 - 0) + 0);
        this.r = r;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.e = 0;
        this.name = name
    }

    followMouse = () => {

        let distanceX =  this.mouseX - this.x;
        let distanceY =  this.mouseY - this.y;
      
        this.x += distanceX / this.r
        this.y += distanceY / this.r

      }
}

module.exports = {Player};
