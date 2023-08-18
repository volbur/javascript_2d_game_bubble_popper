import Game from "./game.js";
import Player from "./player.js";
import Bubbles from "./bubbles.js";
import Enemy from "./enemy.js";
import Interactivity from "./interactivity.js";

const game = new Game();

// Mose Interactivity
const interactivity = new Interactivity(game);
interactivity.handleInteractivity();

const player = new Player(game, interactivity.mouse);

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

// Bubbles
const bubbles = new Bubbles(game, player);

// Animation Loop
game.addFunction(bubbles.handleBubbles.bind(bubbles))
game.addFunction(enemy1.handleEnemies.bind(enemy1))
game.addFunction(player.draw.bind(player))
game.addFunction(handleBackground)
game.addFunction(player.update.bind(player))

game.animate()

window.addEventListener("resize", function() {
    game.canvasPosition = game.canvas.getBoundingClientRect();
});
