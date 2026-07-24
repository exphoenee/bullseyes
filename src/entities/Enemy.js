import GameObject from "../core/GameObject";

import { enemy, player, obstacle, egg } from "../constants/names";

class Enemy extends GameObject {
  constructor(game) {
    super(game, {
      gameObjectName: enemy,
      imageSettings: {
        imageId: "toad",
        spriteWidth: 140,
        spriteHeight: 260,
        spriteOffsetX: 0.4,
        spriteOffsetY: 0.5,
        variant: Math.floor(Math.random() * 4),
      },
      collisionProperties: {
        gameObjectNames: [obstacle, player, enemy],
        collisionRadius: 50,
      },
      motionSettings: {
        speedModifier: 1,
        speedX: Math.random() * 3 + 0.5,
        // vertical drift with a random up/down direction, so toads weave
        // up and down while advancing, like the player can move freely
        speedY: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1),
      },
    });

    // life time properties
    this.lifeTime = 0;
    this.lifeTimeLimit = 20000;

    this.numberOfSparks = 15;
    this.colorOfSparks = "rgba(0, 255, 0, 0.5)";
    this.opacity = 1;
    this.opacityModifier = 0.1;
  }

  initPosition() {
    this.collisionX = this.game.width + this.width;
    this.collisionY =
      this.game.topMargin + Math.random() * (this.game.height - this.height);
  }

  init() {
    this.initPosition();
    this.opacity = 1;
    this.lifeTime = 0;
  }

  objectMove() {
    this.collisionX -= this.speedX * this.speedModifier * this.game.frameFactor;
    this.collisionY -= this.speedY * this.speedModifier * this.game.frameFactor;
    if (this.spriteX + this.width < 0) this.init();

    if (this.collisionX > this.game.width - this.collisionRadius)
      this.collisionX = this.game.width - this.collisionRadius;
    // bounce off the top/bottom edges so the vertical drift keeps weaving
    if (this.collisionY < this.game.topMargin + this.collisionRadius) {
      this.collisionY = this.game.topMargin + this.collisionRadius;
      this.speedY *= -1;
    }
    if (this.collisionY > this.game.height - this.collisionRadius) {
      this.collisionY = this.game.height - this.collisionRadius;
      this.speedY *= -1;
    }

    this.animationFrame =
      this.animationFrame < this.animationFrames ? this.animationFrame + 1 : 0;

    this.spriteX = this.collisionX - this.width * this.spriteOffsetX;
    this.spriteY = this.collisionY - this.height * this.spriteOffsetY;

    this.lifeTime += this.game.deltaTime;
    if (this.lifeTime > this.lifeTimeLimit) this.kill();
  }

  update() {
    this.draw();
    this.objectMove();
    this.collision();
  }
}

export default Enemy;
