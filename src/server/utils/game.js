class Player {
    constructor(id, r, color ,name) {
        this.id = id;
        this.x = Math.round(Math.random() * (3000 - 0) + 0);
        this.y = Math.round(Math.random() * (3000 - 0) + 0);
        this.r = r;
        this.color = color;
        this.name = name;
        this.score = 0;
        this.life = 10;
        this.bullets = []
        this.speed = 3
    }

    updatePosition = (newPos) => {
        if (newPos.right) {
            let newX = this.x += this.speed
            if (newX >= 3000) {
                this.x = 3000
            } else {
                this.x += this.speed
            }
        }

        if (newPos.left) {
            let newX = this.x -= this.speed
            if (newX <= 0) {
                this.x = 0
            } else {
                this.x -= this.speed
            }
        }

        if (newPos.down) {
            let newY = this.y += this.speed
            if (newY >= 3000) {
                this.y = 3000
            } else {
                this.y += this.speed
            }
        }

        if (newPos.up) {
            let newY = this.y -= this.speed
            if (newY <= 0) {
                this.y = 0
            } else {
                this.y -= this.speed
            }
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
        this.r = 8;
        this.color = color
    }
}

class Bullet {
    constructor(x, y, direction) {
        this.x = x
        this.y = y
        this.r = 10
        this.direction = direction
        this.speed = 7
    }

    updatePosition = () => {
        if (this.x >= 3000 || this.x <= 0) {
            return true
        } else {
            this.x += this.speed * Math.sin(this.direction);
        }

        if (this.y >= 3000 || this.y <= 0) {
            return true
        } else {
            this.y += this.speed * Math.cos(this.direction);
        }
    }
}

module.exports = {Player, Food, Bullet};
