import nipplejs from "nipplejs";

// Virtual joystick for touch devices, backed by nipplejs.
// The player moves toward game.mouse.x/y, so a held joystick direction is
// translated into a point far ahead of the bull along that direction -
// releasing it snaps the target back onto the bull so it stops in place.
class TouchControls {
  constructor(game) {
    this.game = game;
    this.reach = Math.max(game.width, game.height);

    this.zone = document.getElementById("joystick-zone");
    this.zone.classList.remove("hidden");

    this.manager = nipplejs.create({
      zone: this.zone,
      mode: "dynamic",
      color: "white",
      size: 100,
    });

    this.manager.on("move", (evt, data) => this.handleMove(data));
    this.manager.on("end", () => this.handleEnd());
  }

  handleMove(data) {
    if (!data.vector) return;
    this.game.mouse.x = this.game.player.collisionX + data.vector.x * this.reach;
    // nipplejs uses maths convention (up is positive y), the canvas grows downward
    this.game.mouse.y = this.game.player.collisionY - data.vector.y * this.reach;
    this.game.mouse.pressed = true;
  }

  handleEnd() {
    this.game.mouse.x = this.game.player.collisionX;
    this.game.mouse.y = this.game.player.collisionY;
    this.game.mouse.pressed = false;
  }

  destroy() {
    this.manager.destroy();
    this.zone.classList.add("hidden");
  }
}

export default TouchControls;
