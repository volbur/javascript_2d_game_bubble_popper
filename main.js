import Game from "./game.js";
import Player from "./player.js";
import Bubbles from "./bubbles.js";
import Enemy from "./enemy.js";
import Interactivity from "./interactivity.js";
import Background from "./background.js";
import GameLevelAnimation from "./gameLevelAnimation.js";

const game = new Game();

// Mose Interactivity
const interactivity = new Interactivity(game);
interactivity.handleInteractivity();

const player = new Player(game, interactivity.mouse);

const gameLevelAnimation = new GameLevelAnimation(game, player);
gameLevelAnimation.init();

//Repeating backgrounds
const background = new Background(game);

const enemy1 = new Enemy(game, player);

// Bubbles
const bubbles = new Bubbles(game, player);

// Animation Loop
game.addFunction(gameLevelAnimation.handleBackground.bind(gameLevelAnimation));
game.addFunction(bubbles.handleBubbles.bind(bubbles));
game.addFunction(enemy1.handleEnemies.bind(enemy1));
game.addFunction(player.draw.bind(player));
game.addFunction(background.handleBackground.bind(background));
game.addFunction(player.update.bind(player));

game.animate();

window.addEventListener("resize", function () {
  game.canvasPosition = game.canvas.getBoundingClientRect();
});
