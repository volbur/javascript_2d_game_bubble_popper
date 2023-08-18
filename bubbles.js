import Bubble from "./bubble.js";

const bubblesArray = [];

const bubblePop1 = document.createElement("audio");
bubblePop1.src = "./scr/sound/Plop.ogg";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "./scr/sound/bubbles-single1.wav";

export default class Bubbles {
    bubblesArray = [];
    bubblePop1 = bubblePop1;
    bubblePop2 = bubblePop2;

    constructor(game, player) {
        this.game = game;
        this.player = player;
    }

    handleBubbles(){
        if (this.game.gameFrame % 50 == 0){
            this.bubblesArray.push(new Bubble(this.game, this.player));
        }
        for (let i = 0; i < this.bubblesArray.length; i++){
            this.bubblesArray[i].update();
            this.bubblesArray[i].draw();
            if (this.bubblesArray[i].y < 0 - this.bubblesArray[i].radius * 2) {
                this.bubblesArray.splice(i, 1);
                i--;
            } else if (this.bubblesArray[i].distance < this.bubblesArray[i].radius + this.player.radius) {
                    if (this.bubblesArray[i].sound === "sound1") {
                        this.bubblePop1.play();
                    } else if (this.bubblesArray[i].sound === "sound2") {
                        this.bubblePop2.play();
                    }
                    this.game.score++;
                    this.bubblesArray[i].counted = true;
                    this.bubblesArray.splice(i, 1);
                    i--;
                }
            }
    }
}