
export default class Interactivity {
    mouse = {
        click: false
    }

    constructor(game) {
        this.game = game;
        this.mouse.x = this.game.canvas.width / 2;
        this.mouse.y = this.game.canvas.height / 2;
    }

    handleInteractivity() {
        const mouse = this.mouse;
        const game = this.game
        
        this.game.canvas.addEventListener("mousedown", function(event) {
            mouse.click = true;
            mouse.x = event.x - game.canvasPosition.left;
            mouse.y = event.y - game.canvasPosition.top;
        });
        this.game.canvas.addEventListener("mouseup", function() {
            mouse.click = false;
        });
    }
}