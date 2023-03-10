import { v4 as uuid } from "uuid";

import { particle } from "./constants/names.js";

class Particle {
  constructor(game, position, color) {
    this.game = game;

    this.name = particle;
    this.id = uuid();

    this.collisionX = position.x;
    this.collisionY = position.y;

    this.radius = Math.floor(Math.random() * 10) + 5;

    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 2 + 0.5;

    this.angle = 0;
    this.angleSpeed = Math.random() * 0.1 + 0.01;

    this.particleTime = 1500;

    this.color = color;
    this.opacity = this.color.split(", ").slice(-1)[0].slice(0, -1);
    this.opacityModifier = 0.05;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = this.color;
    this.game.context.strokeStyle = "black";
    this.game.context.lineWidth = 2;
    this.game.context.beginPath();
    this.game.context.arc(
      this.collisionX,
      this.collisionY,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.game.context.fill();
    this.game.context.stroke();
    this.game.context.restore();
  }

  reduceOpacity() {
    this.opacity -= this.opacityModifier;
    this.color = `${this.color.split(", ").slice(0, -1).join(", ")}, ${
      this.opacity < 0 ? 0 : this.opacity
    })`;
  }

  removeObject() {
    this.reduceOpacity();
    if (this.opacity <= 0) {
      this.game.particles = this.game.particles.filter(
        (particle) => particle.id !== this.id
      );
    }
  }

  update() {
    this.draw();
    this.objectMove();
  }
}

export default Particle;
