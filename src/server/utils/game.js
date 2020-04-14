class Player {
    constructor(id, r, color ,name) {
        this.id = id;
        this.x = Math.round(Math.random() * (3000 - 0) + 0);
        this.y = Math.round(Math.random() * (3000 - 0) + 0);
        this.r = r;
        this.color = color;
        this.direction = 90;
        this.speed = 1.5;
        this.name = name;
        this.score = 0;
        this.life = 10;
        this.bullets = []
    }

    updatePosition = () => {
        let newX = this.x += this.speed * Math.sin(this.direction);
        if (newX >= 3000) {
            this.x = 3000
        } else {
            this.x += this.speed * Math.sin(this.direction);
        }

        if (newX <= 0) {
            this.x = 0
        } else {
            this.x += this.speed * Math.sin(this.direction);
        }

        let newY = this.y += this.speed * Math.cos(this.direction);
        if (newY >= 3000) {
            this.y = 3000
        } else {
            this.y += this.speed * Math.cos(this.direction);
        }
        if (newY <= 0) {
            this.y = 0
        } else {
            this.y += this.speed * Math.cos(this.direction);
        }
    }

    addBullet = (bullet) => {
        this.bullets.push(bullet)
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

class Bullet {
    constructor(x, y, direction) {
        this.x = x
        this.y = y
        this.r = 10
        this.direction = direction
        this.speed = 10
    }

    updatePosition = () => {

            this.x += this.speed * Math.sin(this.direction);
        
            this.y += this.speed * Math.cos(this.direction);
    }
}

module.exports = {Player, Food, Bullet};
