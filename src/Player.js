import { v4 as uuid } from "uuid";
import { player } from "./constants/names";

class Player {
  constructor(game) {
    if (typeof Player.instance === "object") {
      return Player.instance;
    }
    Player.instance = this;

    this.game = game;

    this.name = player;
    this.id = uuid();

    // image properties
    this.image = document.getElementById("bull");
    this.spriteWidth = 255;
    this.spriteHeight = 256;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;

    // motion properties
    this.speedX = 0;
    this.speedY = 0;
    this.dx = 0;
    this.dy = 0;
    this.speedModifier = 5;

    //position properties
    this.collisionX;
    this.collisionY;
    this.initPosition();
    this.collisionRadius = 50;
    this.collisionOpacity = 0.5;
    this.spriteOffsetX = 0.5;
    this.spriteOffsetY = 0.65;
    this.spriteX = this.collisionX - this.width * this.spriteOffsetX;
    this.spriteY = this.collisionY - this.height * this.spriteOffsetY;

    // animation properties
    this.animationFrames = 58;
    this.ainmationDirection = 8;
    this.spriteDirection = 0;
    this.animationFrame = 0;
  }

  initPosition() {
    this.collisionX = this.game.width * 0.5;
    this.collisionY = this.game.height * 0.5;
  }

  areYou(name) {
    return this.name === name;
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      this.animationFrame * this.spriteWidth,
      this.spriteDirection * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height
    );
    this.drawHitbox();
  }

  drawHitbox() {
    if (this.game.debug) {
      this.game.context.beginPath();
      this.game.context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2,
        false
      );
      this.game.context.save();
      this.game.context.globalAlpha = this.collisionOpacity;
      this.game.context.fill();
      this.game.context.restore();
      this.game.context.stroke();
      this.game.context.beginPath();
      this.game.context.moveTo(this.collisionX, this.collisionY);
      this.game.context.lineTo(this.game.mouse.x, this.game.mouse.y);
      this.game.context.stroke();
    }
  }

  collision() {
    [...this.game.obstacles].forEach((object) => {
      const collisionInfo = this.game.checkCollision(this, object) || {};
      const { collision } = collisionInfo;

      if (collision) {
        this.pushObject(collisionInfo);
      }
    });
  }

  pushObject({ distance, sumOfRadii, dx, dy }) {
    this.collisionX -= (dx / distance) * (sumOfRadii - distance);
    this.collisionY -= (dy / distance) * (sumOfRadii - distance);
  }

  objectDirection() {
    const angleStep = 360 / this.ainmationDirection;

    const angle = Math.floor(
      ((Math.atan2(
        this.game.mouse.y - this.collisionY,
        this.game.mouse.x - this.collisionX
      ) *
        360) /
        (2 * Math.PI) +
        90 +
        360) %
        360
    );

    this.spriteDirection = Math.floor(angle / angleStep);
  }

  objectMove() {
    this.dx = this.game.mouse.x - this.collisionX;
    this.dy = this.game.mouse.y - this.collisionY;
    const distance = Math.hypot(this.dy, this.dx);

    if (distance <= this.speedModifier) {
      this.speedX = 0;
      this.speedY = 0;
    } else {
      this.speedX = this.dx / distance || 0;
      this.speedY = this.dy / distance || 0;
    }

    this.collisionX += this.speedX * this.speedModifier;
    this.collisionY += this.speedY * this.speedModifier;

    if (this.collisionX < this.collisionRadius)
      this.collisionX = this.collisionRadius;
    if (this.collisionX > this.game.width - this.collisionRadius)
      this.collisionX = this.game.width - this.collisionRadius;
    if (this.collisionY < this.game.topMargin + this.collisionRadius)
      this.collisionY = this.game.topMargin + this.collisionRadius;
    if (this.collisionY > this.game.height - this.collisionRadius)
      this.collisionY = this.game.height - this.collisionRadius;

    this.animationFrame =
      this.animationFrame < this.animationFrames ? this.animationFrame + 1 : 0;

    this.spriteX = this.collisionX - this.width * this.spriteOffsetX;
    this.spriteY = this.collisionY - this.height * this.spriteOffsetY;
  }

  update() {
    this.draw();
    this.objectMove();
    this.collision();
    this.objectDirection();
  }
}

export default Player;
