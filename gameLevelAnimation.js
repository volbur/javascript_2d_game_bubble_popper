export default class GameLevelAnimation {

    particleArray = [];
    // handle mouse
    mouse = {
        x: null,
        y: null,
        radius: 200
    }
    adjustText = {
        x: 3,
        y: 0
    }

    textConfig = {
        fillStyle: "white",
        font: "12px Verdana",
        value: "Level 1"
    }



    positionText = {
        x: 0,
        y: 15
    }
    
    constructor(game) {
        this.game = game;

        this.squareVisiblePart = {
            width: game.canvas.width,
            height: game.canvas.height
        }
    }

    init() {
        const ctxGameLevelAnimation = this;
        window.addEventListener("mousemove", function(event) {
            ctxGameLevelAnimation.mouse.x = event.x;
            ctxGameLevelAnimation.mouse.y = event.y;
            console.log(ctxGameLevelAnimation.mouse.x, ctxGameLevelAnimation.mouse.y);
        })
    
        this.game.ctx.fillStyle = this.textConfig.fillStyle;
        this.game.ctx.font = this.textConfig.font;
        this.game.ctx.fillText(this.textConfig.value, this.positionText.x, this.positionText.y);
        const textCoordinates = this.game.ctx.getImageData(0, 0, this.squareVisiblePart.width, this.squareVisiblePart.height);

        this.particleArray = [];
        for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                    let positionX = x + this.adjustText.x;
                    let positionY = y + this.adjustText.y;
                    this.particleArray.push(new Particle(positionX * 20, positionY * 20, this.mouse, this.game));
                }
            }
        }
    }

    handleBackground() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        for (let i = 0; i < this.particleArray.length; i++) {
            this.particleArray[i].draw();
            this.particleArray[i].update();
        }
    }
}

class Particle {
    constructor(x, y, mouse, game) {
        this.game = game;
        this.mouse = mouse;
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 8) + 1;
        this.distance;
    }
    draw() {
        this.game.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        this.game.ctx.strokeStyle = "rgba(34, 147, 214,1)";
        this.game.ctx.beginPath();
        
        if (this.distance < this.mouse.radius - 5) {
            this.size = 13;
            this.game.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.game.ctx.stroke();
            this.game.ctx.closePath();
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.x - 3, this.y - 3, this.size / 2, 0, Math.PI * 2);
            this.game.ctx.arc(this.x + 7, this.y + 1, this.size / 3.5, 0, Math.PI * 2);
        }
        else if (this.distance <= this.mouse.radius) {
            this.size = 10;
            this.game.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.game.ctx.stroke();
            this.game.ctx.closePath();
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.x - 2, this.y - 2, this.size / 3, 0, Math.PI * 2);
        } else {
            this.size = 8;
            this.game.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.game.ctx.stroke();
            this.game.ctx.closePath();
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.x - 1, this.y - 1, this.size / 3, 0, Math.PI * 2);
        }
        this.game.ctx.closePath();
        this.game.ctx.fill();
    }
    update() {
        let dx = this.mouse.x - this.x;
        let dy = this.mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = this.mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < 300) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }

            this.size = 3;
        }
    }
}