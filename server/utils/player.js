class Player {
    constructor(id, r, mouseX, mouseY, name) {
        this.id = id;
        this.x = Math.round(Math.random() * (3000 - 0) + 0);
        this.y = Math.round(Math.random() * (3000 - 0) + 0);
        this.r = r;
        this.mouseX = this.x;
        this.mouseY = this.y;
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
