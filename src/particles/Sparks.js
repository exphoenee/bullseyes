import Particle from "./Particle";

class Sparks extends Particle {
  constructor(game, position, color) {
    super(game, position, color);
  }

  objectMove() {
    this.angle += this.angleSpeed * this.game.frameFactor;
    this.collisionX +=
      this.speedX * Math.cos(this.angle) * this.game.frameFactor;
    this.collisionY -=
      this.speedY * Math.sin(this.angle) * this.game.frameFactor;

    if (this.collisionY < 0) this.removeObject();
    if (this.particleTime <= 0) this.removeObject();
    this.particleTime -= this.game.deltaTime;
  }
}

export default Sparks;
