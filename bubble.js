const bubbleImage = new Image();
bubbleImage.src = "./scr/img/bubble_pop_frame_01.png";

export default class Bubble {
    constructor(game, player) {
        this.ctx = game.ctx;
        this.radius = 50;
        this.player = player;
        this.x = Math.random() * game.canvas.width;
        this.y = game.canvas.height + this.radius * 2;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    }
    update = () => {
        this.y -= this.speed;
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw = () => {
        this.ctx.drawImage(bubbleImage, this.x - 65, this.y - 65, this.radius * 2.6, this.radius * 2.6);
    }
}