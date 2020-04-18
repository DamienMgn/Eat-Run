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
    }

    updatePosition = (newPos) => {
        if (newPos.right) {
            this.x += 5
        }

        if (newPos.left) {
            this.x += -5
        }

        if (newPos.up) {
            this.y -= 5
        }

        if (newPos.down) {
            this.y += 5
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
