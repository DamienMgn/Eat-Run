class Player {
    constructor(id, width, height) {
        this.id = id;
        this.x = Math.round(Math.random() * (600 - 0) + 0);
        this.y = Math.round(Math.random() * (600 - 0) + 0);
        this.width = width;
        this.height = height;
    }
}

module.exports = {Player};
