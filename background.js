const backgroundImg = new Image();
backgroundImg.src = "./scr/img/background1.png";

export default class Background {
    backgroundImg = backgroundImg;
    
    constructor(game) {
        this.game = game;
        this.BG = {
            x1: 0,
            x2: this.game.canvas.width,
            y: 0,
            width: this.game.canvas.width,
            height: this.game.canvas.height
        };
    }

    handleBackground() {
        this.BG.x1 -= this.game.gameSpeed;
        if (this.BG.x1 < -this.BG.width) this.BG.x1 = this.BG.width;
        this.BG.x2 -= this.game.gameSpeed;
        if (this.BG.x2 < -this.BG.width) this.BG.x2 = this.BG.width;
        this.game.ctx.drawImage(this.backgroundImg, this.BG.x1, this.BG.y, this.BG.width, this.BG.height);
        this.game.ctx.drawImage(this.backgroundImg, this.BG.x2, this.BG.y, this.BG.width, this.BG.height);
    }
}