import Game from "./game.js";
import Player from "./player.js";
import Bubbles from "./bubbles.js";
import Enemy from "./enemy.js";

const game = new Game();

// Mose Interactivity
const mouse = {
    x: game.canvas.width / 2,
    y: game.canvas.height / 2,
    click: false
}
game.canvas.addEventListener("mousedown", function(event) {
    mouse.click = true;
    mouse.x = event.x - game.canvasPosition.left;
    mouse.y = event.y - game.canvasPosition.top;
});
game.canvas.addEventListener("mouseup", function() {
    mouse.click = false;
});

const player = new Player(game, mouse);

// Bubbles
// const bubblesArray = [];

// const bubblePop1 = document.createElement("audio");
// bubblePop1.src = "./scr/sound/Plop.ogg";
// const bubblePop2 = document.createElement("audio");
// bubblePop2.src = "./scr/sound/bubbles-single1.wav";

// function handleBubbles(){
//     if (game.gameFrame % 50 == 0){
//         bubblesArray.push(new Bubble(game, player));
//         console.log(bubblesArray.length);
//     }
//     for (let i = 0; i < bubblesArray.length; i++){
//         bubblesArray[i].update();
//         bubblesArray[i].draw();
//         if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
//             bubblesArray.splice(i, 1);
//             i--;
//         } else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
//                 if (bubblesArray[i].sound === "sound1") {
//                     bubblePop1.play();
//                 } else if (bubblesArray[i].sound === "sound2") {
//                     bubblePop2.play();
//                 }
//                 game.score++;
//                 bubblesArray[i].counted = true;
//                 bubblesArray.splice(i, 1);
//                 i--;
//             }
//         }
//     }

    // for (let i = 0; i < bubblesArray.length; i++) {
        
    // }

//Repeating backgrounds
const background = new Image();
background.src = "./scr/img/background1.png";

const BG = {
    x1: 0,
    x2: game.canvas.width,
    y: 0,
    width: game.canvas.width,
    height: game.canvas.height
}

function handleBackground() {
    BG.x1 -= game.gameSpeed;
    if (BG.x1 < -BG.width) BG.x1 = BG.width;
    BG.x2 -= game.gameSpeed;
    if (BG.x2 < -BG.width) BG.x2 = BG.width;
    game.ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    game.ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

const enemy1 = new Enemy(game, player);
function handleEnemies() {
    enemy1.draw();
    enemy1.update();
}

const bubbles = new Bubbles(game, player);

// Animation Loop
game.addFunction(bubbles.handleBubbles.bind(bubbles))
game.addFunction(handleEnemies)
game.addFunction(player.draw.bind(player))
game.addFunction(handleBackground)
game.addFunction(player.update.bind(player))

game.animate()

window.addEventListener("resize", function() {
    game.canvasPosition = game.canvas.getBoundingClientRect();
});
