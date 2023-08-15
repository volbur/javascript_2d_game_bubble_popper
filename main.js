import Game from "./game.js";
import Player from "./player.js";
import Bubble from "./bubble.js";
import Enemy from "./enemy.js";

const game = new Game();

// Mose Interactivity
// let canvasPosition = game.canvas.getBoundingClientRect();
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

// Player
// const playerLeft = new Image();
// playerLeft.src = "./scr/img/fish_swim_left.png";
// const playerRight = new Image();
// playerRight.src = "./scr/img/fish_swim_right.png";
// class Player {
//     constructor() {
//         this.x = canvas.width;
//         this.y = canvas.height / 2;
//         this.radius = 50;
//         this.angle = 0;
//         this.frameX = 0;
//         this.frameY = 0;
//         this.frame = 0;
//         this.spriteWidth = 498;
//         this.spriteHeight = 327;
//     }
//     update() {
//         const dx = this.x - mouse.x;
//         const dy = this.y - mouse.y;
//         let theta = Math.atan2(dy, dx);
//         this.angle = theta;
//         if (mouse.x != this.x) {
//             this.x -= dx/30;
//         }
//         if (mouse.y != this.y) {
//             this.y -= dy/30;
//         }
//     }
//     draw(){
//         if (mouse.click) {
//             ctx.lineWidth = 0.2;
//             ctx.beginPath();
//             ctx.moveTo(this.x, this.y);
//             ctx.lineTo(mouse.x, mouse.y);
//             ctx.stroke();
//         }

//         ctx.save();
//         ctx.translate(this.x, this.y);
//         ctx.rotate(this.angle);
        
//         if (this.x >= mouse.x) {
//             ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth / 4, this.spriteHeight / 4);
//         } else {
//             ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth / 4, this.spriteHeight / 4);
//         }

//         ctx.restore();
//     }
// }
const player = new Player(game, mouse);

// Bubbles
const bubblesArray = [];
// const bubbleImage = new Image();
// bubbleImage.src = "./scr/img/bubble_pop_frame_01.png";
// class Bubbles {
//     constructor() {
//         this.radius = 50;
//         this.x = Math.random() * canvas.width;
//         this.y = canvas.height + this.radius * 2;
//         this.speed = Math.random() * 5 + 1;
//         this.distance;
//         this.counted = false;
//         this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
//     }
//     update(){
//         this.y -= this.speed;
//         const dx = this.x - player.x;
//         const dy = this.y - player.y;
//         this.distance = Math.sqrt(dx * dx + dy * dy);
//     }
//     draw(){
//         ctx.drawImage(bubbleImage, this.x - 65, this.y - 65, this.radius * 2.6, this.radius * 2.6);
//     }
// }

const bubblePop1 = document.createElement("audio");
bubblePop1.src = "./scr/sound/Plop.ogg";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "./scr/sound/bubbles-single1.wav";

function handleBubbles(){
    if (game.gameFrame % 50 == 0){
        bubblesArray.push(new Bubble(game, player));
        console.log(bubblesArray.length);
    }
    for (let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1);
            i--;
        } else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
                if (bubblesArray[i].sound === "sound1") {
                    bubblePop1.play();
                } else if (bubblesArray[i].sound === "sound2") {
                    bubblePop2.play();
                }
                game.score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);
                i--;
            }
        }
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        
    }

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

// Enemies
// const enemyImage = new Image();
// enemyImage.src = "./scr/img/enemy1.png";

// class Enemy {
//     constructor() {
//         this.x = canvas.width + 200;
//         this.y = Math.random() * (canvas.height - 150) + 90;
//         this.radius = 60;
//         this.speed = Math.random() * 2 + 2;
//         this.frame = 0;
//         this.frameX = 0;
//         this.frameY = 0;
//         this.spriteWidth = 418;
//         this.spriteHeight = 397;
//     }
//     draw() {
//         ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 60, this.y - 70, this.spriteWidth / 3, this.spriteHeight / 3)
//     }
//     update() {
//         this.x -= this.speed;
//         if ( this.x < 0 - this.radius * 2) {
//             this.x = canvas.width + 200;
//             this.y = Math.random() * (canvas.height - 150) + 90;
//             this.speed = Math.random() * 2 + 2;
//         }
//         if (gameFrame % 5 == 0) {
//             this.frame++;
//             if (this.frame >= 12) this.frame = 0;
//             if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
//                 this.frameX = 0;
//             } else {
//                 this.frameX++;
//             }
//             if (this.frame < 3) this.frameY = 0;
//             else if (this.frame < 7) this.frameY = 1;
//             else if (this.frame < 11) this.frameY = 2;
//             else this.frameY = 0;
//         }
//         // collision with player
//         const dx = this.x - player.x;
//         const dy = this.y - player.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         if (distance < this.radius + player.radius) {
//             handleGameOver();
//         }
//     }
// }
const enemy1 = new Enemy(game, player);
function handleEnemies() {
    enemy1.draw();
    enemy1.update();
}

function handleGameOver() {
    game.ctx.fillStyle = "white";
    game.ctx.fillText("GAME OVER, you reached score " + game.score, 110, 250);
    game.gameOver = true;
}

// Animation Loop
// function animate() {
//     game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

//     handleBubbles();
//     handleEnemies();
//     player.draw();
//     handleBackground();
//     player.update();

//     game.ctx.fillStyle = "black";
//     game.ctx.fillText("score: " + game.score, 10, 50)
//     game.gameFrame++;
//     if (!game.gameOver) requestAnimationFrame(animate);
// }
// animate();

game.addFunction(handleBubbles)
game.addFunction(handleEnemies)
game.addFunction(player.draw)
game.addFunction(handleBackground)
game.addFunction(player.update)

game.animate()

window.addEventListener("resize", function() {
    game.canvasPosition = game.canvas.getBoundingClientRect();
});
